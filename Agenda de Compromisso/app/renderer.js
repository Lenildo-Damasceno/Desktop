document.addEventListener('DOMContentLoaded', () => {
 
  const form = document.getElementById('form-novocompromisso');
  if (form) {
    form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const titulo = (document.getElementById('titulo')?.value || '').trim();
      const data = (document.getElementById('data')?.value || '').trim();
      const hora = (document.getElementById('hora')?.value || '').trim();
      const descricao = (document.getElementById('descricao')?.value || '').trim();

      if (!titulo) return alert('Preencha o título.');

      if (!window.api || !window.api.salvarCompromisso) return alert('API de salvar não disponível.');

      try {
        const res = await window.api.salvarCompromisso({ titulo, data, hora, descricao });
        if (res && res.success) {
          alert('Compromisso salvo com sucesso!');
          location.href = 'index.html';
        } else {
          alert(res && res.message ? res.message : 'Erro ao salvar compromisso.');
        }
      } catch (err) {
        console.error('Erro:', err);
        alert('Erro ao comunicar com o main. Veja console.');
      }
    });
  }

  // Listener para consultar compromissos na tela principal
  const btnConsultar = document.getElementById('consultarCompromissos');
  if (btnConsultar) {
    btnConsultar.addEventListener('click', async () => {
      if (!window.api || !window.api.consultarCompromissos) return alert('API de consulta não disponível.');
      try {
        const lista = await window.api.consultarCompromissos();
        if (!Array.isArray(lista) || lista.length === 0) {
          alert('Nenhum compromisso encontrado.');
          return;
        }
        // exibe em alerta formatado
        alert(JSON.stringify(lista, null, 2));
    
        
      } catch (err) {
        console.error('Erro ao consultar compromissos:', err);
        alert('Erro ao consultar compromissos. Veja console.');
      }
    });
  }

});