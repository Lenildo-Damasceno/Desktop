import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
// ...existing code...
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Arquivo onde os votos serão armazenados localmente
const votesFile = path.join(__dirname, 'votes.json');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Anexa o script de preload à janela
  preload: path.join(__dirname, 'preload.cjs'),
      // Garantir isolamento de contexto para permitir contextBridge
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true,
    },
  });

  // Encaminha mensagens do console do renderer para o processo principal (para diagnóstico)
  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[RENDERER CONSOLE] ${message} (level=${level} source=${sourceId} line=${line})`);
  });

  // Carrega o index.html do aplicativo.
  win.loadFile('index.html');

  // Opcional: Abre o DevTools (ferramentas de desenvolvedor)
  // Abre DevTools por padrão para facilitar depuração
  win.webContents.openDevTools({ mode: 'detach' });
}

// Este método será chamado quando o Electron tiver terminado
// a inicialização e estiver pronto para criar janelas do navegador.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // No macOS é comum recriar uma janela no aplicativo quando o
    // ícone do dock é clicado e não há outras janelas abertas.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Encerra quando todas as janelas forem fechadas, exceto no macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// --- Comunicação com o Renderer ---
// Ouve o evento 'confirm-vote' vindo do renderer
ipcMain.handle('confirm-vote', async (event, voteData) => {
  try {
    // Lê votos existentes (se houver)
    let votes = [];
    try {
      const raw = await fs.readFile(votesFile, 'utf8');
      votes = JSON.parse(raw || '[]');
    } catch (err) {
      // Se o arquivo não existe, começamos com lista vazia
      if (err.code !== 'ENOENT') throw err;
    }

    // Adiciona carimbo de data/hora e detalhes
    votes.push({
      candidate: voteData.candidate,
      details: voteData.details || null,
      time: new Date().toISOString(),
    });

    // Grava de volta (substitui o arquivo)
    await fs.writeFile(votesFile, JSON.stringify(votes, null, 2), 'utf8');

    console.log(`[VOTO RECEBIDO NO MAIN]: ${voteData.candidate}`);
    return { success: true, message: `Voto para ${voteData.candidate} registrado.` };
  } catch (err) {
    console.error('Erro ao gravar voto:', err);
    return { success: false, message: 'Falha ao gravar voto.' };
  }
});

// Retorna resultados agregados dos votos
ipcMain.handle('get-results', async () => {
  try {
    const raw = await fs.readFile(votesFile, 'utf8');
    const votes = JSON.parse(raw || '[]');

    // Agrupa por candidate
    const counts = votes.reduce((acc, v) => {
      const key = v.candidate || 'UNKNOWN';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return { success: true, totals: counts, totalVotes: votes.length };
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { success: true, totals: {}, totalVotes: 0 };
    }
    console.error('Erro ao ler resultados:', err);
    return { success: false, message: 'Falha ao ler resultados.' };
  }
});