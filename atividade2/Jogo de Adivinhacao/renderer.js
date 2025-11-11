
// Funções de interação com a main process      
function mudarTema() {
        window.api.tema()
}

function mudarZoom() {
        window.api.zoom()
}
function mudarZoomMenos() {
        window.api.zoomM()
}
function criarJanela() {
        window.api.criarJanela()
}


// Lógica do Jogo de Adivinhação

document.getElementById('adivinhar').addEventListener('click', function() {
    let num = Number(document.getElementById('numero').value);
    const resultadoEl = document.getElementById('resultado');
    window.api.verificar(num, resultadoEl);
})

function dica (){
   
    let num = Number(document.getElementById('numero').value);
    const resultadoEl = document.getElementById('resultado');
    window.api.dica1(num, resultadoEl);
}

function limparCampos(limpar) {
  document.getElementById("numero").value = "VAMOS DE NOVO";
 document.getElementById('resultado').innerHTML = ""
}



