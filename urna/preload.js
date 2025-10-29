import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  confirmVote: (vote) => ipcRenderer.invoke('confirm-vote', vote),
  getResults: () => ipcRenderer.invoke('get-results')
  
});
// Pequeno log para ajudar a depurar se o preload foi carregado
try {
  // eslint-disable-next-line no-console
  console.log('preload.js carregado — electronAPI exposta');
} catch (e) {
  // ignore
}