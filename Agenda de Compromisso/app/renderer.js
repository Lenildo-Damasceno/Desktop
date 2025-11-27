
const Novo = document.getElementById('novo');
const Consultar = document.getElementById('consultar');

Novo.addEventListener('click', () => {
  
    messageElement.textContent = "Abrindo tela para adicionar novo compromisso...";
    
});

Consultar.addEventListener('click', () => {
    messageElement.textContent = "Carregando a lista de compromissos...";
    
});