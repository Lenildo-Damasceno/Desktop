import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('api', {
    Novo: (texto) => ipcRenderer.invoke('novo', texto),
    Consultar: () => ipcRenderer.invoke('consultar'),
    novoCompromisso: (obj) => ipcRenderer.invoke('novo', obj),
    consultarCompromissos: () => ipcRenderer.invoke('consultar'),
})
