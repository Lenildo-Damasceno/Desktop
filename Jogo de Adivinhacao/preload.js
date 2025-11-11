import {contextBridge, ipcRenderer} from 'electron'
// Expondo APIs seguras para o renderer process
contextBridge.exposeInMainWorld('api', {
    nome: 'Aplicação Desktop',
    versaoNode: () => { return `NODE - ${process.versions.node}`},
    versaoElectron: () => { return `ELECTRON - ${process.versions.electron}`},
    adivinhar2: gerarNumeroAdivinhacao,

    tema: () => { ipcRenderer.send('mudar-tema') },
    zoom: () => {ipcRenderer.send('mudar-zoom') },
    zoomM: () => {ipcRenderer.send('mudar-zoom-') },
    criarJanela: () => { ipcRenderer.send('criar-janela') },

    enviarMsg: (msg) => ipcRenderer.send('envia-msg',msg),
    receberMsg: (msg) => ipcRenderer.on('devolver-msg', msg),
    dica1: dica,
    verificar: verificarAdivinhacao,
})
// Lógica do Jogo de Adivinhação
function gerarNumeroAdivinhacao() {
    let adivinhar1 = Math.trunc(Math.random() * 15) + 1;
    return adivinhar1;
}
let tentativas = 0;
let adivinhar = gerarNumeroAdivinhacao();
function verificarAdivinhacao(num, resultadoEl) {
   
    tentativas++;

    if ( num < 1 || num > 15) {
        resultadoEl.innerHTML = 'Digite um número entre 1 e 15.';
        return;
    }

    if (num === adivinhar) {
        resultadoEl.innerHTML = 'Acertou! Tentativas: ' + tentativas;
        adivinhar = gerarNumeroAdivinhacao();
        tentativas = 0;

    } else {
        resultadoEl.innerHTML = `ERROU . Tente novamente. Tentativas: ${tentativas}`;
        document.getElementById('dica').style.visibility = 'visible';

    }

}
function dica (num, resultadoEl){
   
    if (num <  adivinhar) {
        resultadoEl.innerHTML = `Errou! O número é maior.`;
    } else {
        resultadoEl.innerHTML = `Errou! O número é menor.`;
    }
}
