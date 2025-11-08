const { contextBridge, ipcRenderer } = require('electron');

// Debug: indicar que preload foi carregado
try {
  // eslint-disable-next-line no-console
  console.log('preload.cjs: carregado e expondo API');
} catch (e) {}

contextBridge.exposeInMainWorld('api', {
  nome: 'Aplicação Desktop com Electron',
  versaoNode: () => `NODE - ${process.versions.node}`,
  versaoElectron: () => `ELECTRON - ${process.versions.electron}`,

  // API em português
  adicionarHistorico: (calculo) => ipcRenderer.invoke('adicionar-historico', calculo),
  obterHistorico: () => ipcRenderer.invoke('obter-historico'),

  // Compatibilidade (opcional)
  addToHistory: (calculo) => ipcRenderer.invoke('adicionar-historico', calculo),
  getHistory: () => ipcRenderer.invoke('obter-historico')
});
