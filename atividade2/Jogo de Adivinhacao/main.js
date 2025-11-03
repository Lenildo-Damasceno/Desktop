const { app, BrowserWindow } = require('electron');
const path = require('path');

function criarJanela() {
  const win = new BrowserWindow({
    width: 480,
    height: 640,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.removeMenu();
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(criarJanela);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});