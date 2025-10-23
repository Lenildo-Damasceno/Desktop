import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// ...existing code...
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function criarJanela() { // Função para criar a janela principal
  const janela = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false, //tamanho fixo
    fullscreen: false,  //tela cheia desativada
    icon: __dirname + '/icon.png' // Caminho para o ícone da aplicação
  });

  janela.loadFile('resposta1.html'); // Carrega o arquivo HTML na janela ou uma pagina 
}

app.whenReady() // Quando o aplicativo estiver pronto
  .then(() => {
    criarJanela();
    console.log('Executando Electron ');
  })
  .catch((erro) => {  // Tratamento de erros
    console.error(erro);
  });
