
function mudarTema() {
        window.api.tema()
}

function mudarZoom() {
        window.api.zoom()
}

function criarJanela() {
        window.api.criarJanela()
}

document.getElementById('adivinhar').addEventListener('click', function() {
    let num = Number(document.getElementById('numero').value);
    const resultadoEl = document.getElementById('resultado');
    window.api.verificar(num, resultadoEl);
})
 
function dica (){
    let num = Number(document.getElementById('numero').value);
    const resultadoEl = document.getElementById('resultado');
    if (num < adivinhar) {
        resultadoEl.innerHTML = 'Errou! O número é maior.';
    } else {
        resultadoEl.innerHTML = 'Errou! O número é menor.';
    }
}

function limparCampos(limpar) {
  document.getElementById("numero").value = "VAMOS DE NOVO";
 document.getElementById('resultado').innerHTML = ""
}
