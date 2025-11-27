import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  salvar: (texto) => ipcRenderer.invoke('escrever-arquivo', texto),
  abrir: () => ipcRenderer.invoke('ler-arquivo'),
  salvarComoNota: (texto) => ipcRenderer.invoke('salvar-como-nota', texto)
});

let texto = document.getElementById('texto');

// tornar funções globais usadas pelos botões em index.html
window.abrirNota = function () {
   window.api.abrir().then((conteudo) => {
       texto.value = conteudo || '';
   }).catch(console.error);
}

window.salvarNota = function () {
   window.api.salvar(texto.value).then((resultado) => {
      if (resultado) document.getElementById('caminho').innerText = resultado;
      console.log('Arquivo salvo com sucesso!');
   }).catch(console.error);
}

window.salvarComoNota = function () {
   window.api.salvarComoNota(texto.value).then((caminho) => {
      if (caminho) document.getElementById('caminho').innerText = caminho;
      console.log('Arquivo salvo com sucesso!');
   }).catch(console.error);
}

novoBlocoDeNotas = function () {
   texto.value = '';
   document.getElementById('novo-bloco').innerText = 'Novo Bloco de Notas';
}

window.api.novoBlocoDeNotas(() => {
   novoBlocoDeNotas();
});
