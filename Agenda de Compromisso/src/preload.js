import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('api', {
    salvarCompromisso: (obj) => ipcRenderer.invoke('salvarCompromisso', obj),
    consultarCompromissos: () => ipcRenderer.invoke('consultarCompromissos'),
})
