import { contextBridge, ipcRenderer } from "electron"

contextBridge.exposeInMainWorld('api', {
    salvar: (texto) => ipcRenderer.invoke('salvar-arq', texto),
    abrir: () => ipcRenderer.invoke('abrir-arq'),
    salvarComo: (texto) => ipcRenderer.invoke('salvarComo-arq', texto),
    onMenu: (channel, callback) => {
        // permite que o renderer registre callbacks para eventos do menu enviados pelo main
        ipcRenderer.on(channel, (event, ...args) => callback(...args));
    }
})
