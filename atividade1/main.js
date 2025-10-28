import { app, BrowserWindow } from 'electron';

function criarJanela() { // Função para criar a janela principal
  const janela = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false, //tamanho fixo
    fullscreen: false,  //tela cheia desativada
    icon: 'iconemoeda.png', // Caminho para o ícone da aplicação
    webPreferences: {
      nodeIntegration: true,
      devTools: true, // Habilita as ferramentas de desenvolvedor
    },
    preload: `${__dirname}/preload.js` // Carrega o script de preload
  });

  janela.loadFile('resposta1_24_10.html'); // Carrega o arquivo HTML na janela ou uma pagina 
}
janela.removeMenu(); // Remove o menu padrão do Electron
janela.on('minimize', () => {
  console.log('Janela minimizada');
});
//janela.loadURL('https://www.example.com'); // Carrega uma URL externa na janela
janela.webContents.openDevTools(); // Abre as ferramentas de desenvolvedor

app.whenReady() // Quando o aplicativo estiver pronto
  .then(() => {
    criarJanela();
    console.log('Executando Electron ');
  })
  .catch((erro) => {  // Tratamento de erros
    console.error(erro);
  });

