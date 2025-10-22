import { app, BrowserWindow } from 'electron';

function criarJanela() {
  const janela = new BrowserWindow({
    width: 800,
    height: 600,
  });

  janela.loadFile('index.html');
}

app.whenReady()
  .then(() => {
    criarJanela();
    console.log('Executando Electron - Projeto 2');
  })
  .catch((erro) => {
    console.error(erro);
  });
