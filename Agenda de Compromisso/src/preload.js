import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('api', {
    Novo: (texto) => ipcRenderer.invoke('novo', texto),
    Consultar: (texto) => ipcRenderer.invoke('consultar',texto),
    
    
})
