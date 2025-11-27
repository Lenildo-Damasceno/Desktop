import { contextBridge, ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld("api", {
    salvar: (texto, destino) => ipcRenderer.invoke('escrever-arquivo', texto, destino),
    abrir: () => ipcRenderer.invoke('ler-arquivo'),
    salvarComoNota: (texto) => ipcRenderer.invoke('salvar-como-nota', texto)
});
