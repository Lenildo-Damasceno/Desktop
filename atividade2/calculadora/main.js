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
      contextIsolation: false, // Desativa a isolamento de contexto
      nodeIntegration: true,  // Habilita a integração do Node.js
      devTools: true, // Habilita as ferramentas de desenvolvedor
      preload: path.join(__dirname, 'preload.js') // Carrega o script de preload
    },
  });
  janela.removeMenu(); // Remove o menu padrão do Electron
  janela.loadFile('index.html'); // Carrega o arquivo HTML na janela ou uma pagina 
  janela.webContents.openDevTools(); // Abre as ferramentas de desenvolvedor
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

app.on('window-all-closed', () => { // Fecha o aplicativo quando todas as janelas forem fechadas
  if (process.platform !== 'darwin') {
    app.quit();
  } });

app.on('activate', () => { // Recria a janela se o aplicativo for ativado e não houver janelas abertas
  if (BrowserWindow.getAllWindows().length === 0) {
    criarJanela();
  }
});

historicodacalculadora = [];

export { historicodacalculadora };
import { historicodacalculadora } from './main.js';

import { ipcMain } from 'electron';

ipcMain.on('history-btn', (event) => {
  event.reply('history-response', historicodacalculadora);
});
