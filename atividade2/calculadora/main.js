import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

// histórico guardado em memória no processo principal
const historicoCalculos = [];

// Handlers IPC em português
ipcMain.handle('adicionar-historico', (evento, calculo) => {
  console.log('Adicionando ao histórico:', calculo);
  historicoCalculos.push(calculo);
  return historicoCalculos; // retorna histórico atualizado opcionalmente
});

ipcMain.handle('obter-historico', () => {
  return historicoCalculos;
});

function criarJanela() { // Função para criar a janela principal
  nativeTheme.themeSource = 'dark'; // Define o tema escuro
  const janela = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false, //tamanho fixo
    fullscreen: false,  //tela cheia ativada
    icon: 'iconemoeda.png', // Caminho para o ícone da aplicação
      webPreferences: {
      contextIsolation: true, // Isolamento de contexto para usar contextBridge
      nodeIntegration: false,  // Desativa integração direta do Node.js
      devTools: true, // Habilita as ferramentas de desenvolvedor
      preload: path.join(__dirname, 'preload.cjs') // Carrega o script de preload (CommonJS)
    },
  });
  janela.removeMenu(); // Remove o menu padrão do Electron
  janela.loadFile('index.html'); // Carrega o arquivo HTML na janela ou uma pagina 
  janela.webContents.openDevTools(); // Abre as ferramentas de desenvolvedor
  // Encaminhar mensagens de console do renderer para o terminal do main (ajuda no debug)
  janela.webContents.on('console-message', (evento, nivel, mensagem, linha, fonte) => {
    try {
      console.log(`[RENDERER] ${mensagem}`);
    } catch (e) {}
  });
}

//janela.loadURL('https://www.example.com'); // Carrega uma URL externa na janela

app.whenReady() // Quando o aplicativo estiver pronto
  .then(() => {
    criarJanela();
    console.log('Executando Electron ');
  })
  .catch((erro) => {  // Tratamento de erros
    console.error(erro);
  });