import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
// ...existing code...
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Anexa o script de preload à janela
      preload: path.join(__dirname, 'preload.js'),
      // É recomendado manter contextIsolation e nodeIntegration nos padrões
      // contextIsolation: true,
      // nodeIntegration: false,
    },
  });

  // Carrega o index.html do aplicativo.
  win.loadFile('index.html');

  // Opcional: Abre o DevTools (ferramentas de desenvolvedor)
  // win.webContents.openDevTools();
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
ipcMain.handle('confirm-vote', (event, voteData) => {
  // Em um app real, você salvaria isso em um banco de dados
  // ou arquivo de forma segura.
  // Por agora, apenas logamos no console do 'main.js'.
  console.log(`[VOTO RECEBIDO NO MAIN]: ${voteData.candidate}`);

  // Simula um "recibo" de volta
  return { success: true, message: `Voto para ${voteData.candidate} registrado.` };
});