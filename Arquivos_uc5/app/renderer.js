let texto = document.getElementById("texto")    

function salvarArq(){
    window.api.salvar(texto.value).then((caminho) =>{
        document.getElementById("caminho").innerHTML = `Caminho: ${caminho}`
    })    
}

function abrirArq(){
    window.api.abrir().then((conteudo) => {
        texto.value = conteudo
    })
}

function salvarComoArq(){
    window.api.salvarComo(texto.value).then((caminho) =>{
        document.getElementById("caminho").innerHTML = `Caminho: ${caminho}`
    })
}

// registrar handlers para os eventos do menu (preload expõe api.onMenu)
window.api.onMenu('menu-abrir', () => { console.log('menu-abrir recebido'); abrirArq(); });
window.api.onMenu('menu-salvar', () => { console.log('menu-salvar recebido'); salvarArq(); });
window.api.onMenu('menu-salvar-como', () => { console.log('menu-salvar-como recebido'); salvarComoArq(); });
window.api.onMenu('novo-bloco-notas', () => {
  const textoEl = document.getElementById('texto');
  const caminhoEl = document.getElementById('caminho');
  if (textoEl) textoEl.value = '';
  if (caminhoEl) caminhoEl.innerText = '';
});