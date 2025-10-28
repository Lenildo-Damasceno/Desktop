import { contextBridge, ipcRenderer } from 'electron';
// Expondo uma API segura para o processo de renderização

contextBridge.exposeInMainWorld('api', {
  nome: 'Electron App',
  versoes:() => {
    console.log(`$process.versions.node: ${process.versions.node}`);
    console.log(`$process.versions.chrome: ${process.versions.chrome}`);
    console.log(`$process.versions.electron: ${process.versions.electron}`);
    return {
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron
    };
  }
});