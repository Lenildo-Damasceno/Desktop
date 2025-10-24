import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  confirmVote: (vote) => ipcRenderer.invoke('confirm-vote', vote)
});