import { app, BrowserWindow } from 'electron';

function criarJanela() { // Função para criar a janela principal
  const janela = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false, //tamanho fixo
    fullscreen: false,  //tela cheia desativada
    icon: 'iconemoeda.png', // Caminho para o ícone da aplicação
    title: 'Conversor de Moedas'
  });

  janela.loadFile('resposta1_24_10.html'); // Carrega o arquivo HTML na janela ou uma pagina 
}

app.whenReady() // Quando o aplicativo estiver pronto
  .then(() => {
    criarJanela();
    console.log('Executando Electron ');
  })
  .catch((erro) => {  // Tratamento de erros
    console.error(erro);
  });
