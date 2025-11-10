import { contextBridge, ipcRenderer } from 'electron';


contextBridge.exposeInMainWorld('api', {
  nome: 'Aplicação Desktop com Electron',
  versaoNode: () => { return `NODE - ${process.versions.node}`; },
  versaoElectron: () => { return `ELECTRON - ${process.versions.electron}`; },
  versaoChrome: () => { return `CHROME - ${process.versions.chrome}`; },
  abrirHistorico: () => { ipcRenderer.send('history-btn'); }
  

});
