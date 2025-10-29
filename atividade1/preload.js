import { contextBridge, ipcRenderer } from 'electron';
// Expondo uma API segura para o processo de renderização

contextBridge.exposeInMainWorld('api', {
  nome: 'Aplicação Desktop com Electron',
  versaoNode: () => { return `NODE - ${process.versions.node}`; },
  versaoElectron: () => { return `ELECTRON - ${process.versions.electron}`; }
  
});



