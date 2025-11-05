import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import path from'path';

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let janela = null; // Variável para armazenar a janela

function criarJanela() {
  nativeTheme.themeSource = 'light';
  janela = new BrowserWindow({
    width: 800,
    height: 800,
    title: 'Jogo de Adivinhação',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true,
      preload: path.join(__dirname,'preload.js'),
            sandbox: false,
            setZoomFactor: 1.0 //deixando o zoom em 100%
    }
  });
  janela.removeMenu();
  janela.loadFile(path.join(__dirname, 'index.html'));
  janela.webContents.on('did-finish-load', () => { //evento disparado quando a janela termina de carregar
      janela.webContents.setZoomFactor(1.0);
  });
}

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('mudar-tema', () => { //recebe o evento do renderer para mudar o tema
    if(nativeTheme.themeSource === 'dark'){
        nativeTheme.themeSource = 'light'
    }else{
        nativeTheme.themeSource = 'dark'
    }
})

ipcMain.on('mudar-zoom', () => { //recebe o evento do renderer para aumentar o zoom
    let janelaatual = janela.webContents.getZoomFactor()
    janela.webContents.setZoomFactor(0.1 + janelaatual)
})
ipcMain.on('mudar-zoom-', () => { //recebe o evento do renderer para diminuir o zoom
    let janelaatual = janela.webContents.getZoomFactor()
    janela.webContents.setZoomFactor(janelaatual - 0.1)
})
ipcMain.on('criar-janela', () => { //recebe o evento do renderer para criar uma nova janela
    criarJanela()
})



