import { app, BrowserWindow,nativeTheme } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);


function criarJanela() { // Função para criar a janela principal
  nativeTheme.themeSource = 'dark'; // Define o tema escuro
  const janela = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false, //tamanho fixo
    fullscreen: true,  //tela cheia ativada
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