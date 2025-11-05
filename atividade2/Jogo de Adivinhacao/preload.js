import {contextBridge, ipcRenderer} from 'electron'

contextBridge.exposeInMainWorld('api', {
    nome: 'Aplicação Desktop',
    versaoNode: () => { return `NODE - ${process.versions.node}`},
    versaoElectron: () => { return `ELECTRON - ${process.versions.electron}`},


    tema: () => { ipcRenderer.send('mudar-tema') },
    zoom: () => {ipcRenderer.send('mudar-zoom') },
    zoomM: () => {ipcRenderer.send('mudar-zoom-') },
    criarJanela: () => { ipcRenderer.send('criar-janela') },

    enviarMsg: (msg) => ipcRenderer.send('envia-msg',msg),
    receberMsg: (msg) => ipcRenderer.on('devolver-msg', msg),
    
    verificar: verificarAdivinhacao
})

 function verificarAdivinhacao(num, resultadoEl) {   
    let adivinhar = Math.trunc(Math.random() * 15) + 1; 
    let tentativas = 0;
    tentativas++;

    if ( num < 1 || num > 15) {
        resultadoEl.innerHTML = 'Digite um número entre 1 e 15.';
        return;
    }
    
    if (num === adivinhar) {
        resultadoEl.innerHTML = 'Acertou! Tentativas: ' + tentativas;
         adivinhar = Math.trunc(Math.random() * 15) + 1;
         tentativas = 0;
        
    } else{
        resultadoEl.innerHTML = 'ERROU'
        document.getElementById('dica').style.visibility= 'visible'
    
    }
   
  
}