document.addEventListener('DOMContentLoaded', () => {
 
  const form = document.getElementById('btn-salvar-compromisso');
  if (form) {
    form.addEventListener('submit', async (texto) => {
      texto.preventDefault();
      const titulo = (document.getElementById('titulo')?.value || '').trim();
      const data = (document.getElementById('data')?.value || '').trim();
      const hora = (document.getElementById('hora')?.value || '').trim();
      const descricao = (document.getElementById('descricao')?.value || '').trim();

      if (!titulo) return alert('Preencha o título.');
      try {
        const res = await window.api.salvarCompromisso({ titulo, data, hora, descricao });
        alert("enviou")
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
});