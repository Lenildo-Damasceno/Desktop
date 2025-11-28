let novoBtn, consultarBtn, msg, out;

console.log('renderer ativo', { api: !!window.api });

async function consultarCompromissos() {
    console.log('consultarCompromissos() chamado');
    if (!window.api || !window.api.consultarCompromissos) { if(msg) msg.textContent='API indisponível'; console.warn('API indisponível'); return; }
    try {
        const arr = await window.api.consultarCompromissos();
        out.innerHTML = Array.isArray(arr) && arr.length ? arr.map(i=>`<div>${i.titulo||'--'} ${i.data||''} ${i.hora||''}</div>`).join('') : 'Nenhum compromisso';
        if (msg) msg.textContent = `Total: ${arr.length||0}`;
    } catch (e) {
        console.error('erro consultar', e);
        if (msg) msg.textContent = 'Erro ao consultar';
    }
}

async function novoCompromisso(targetButton) {
        console.log('novoCompromisso() chamado');
        if (msg) msg.textContent = 'Iniciando criação...';
        if (!window.api || !window.api.novoCompromisso) { if(msg) msg.textContent='API indisponível'; alert('API não disponível'); return; }
        // feedback visual imediato
        if (targetButton) { const prev = targetButton.value || targetButton.innerText; if (targetButton.tagName==='INPUT') targetButton.value = '...'; else targetButton.innerText = '...'; setTimeout(()=>{ if (targetButton.tagName==='INPUT') targetButton.value = prev; else targetButton.innerText = prev }, 800); }
        const titulo = prompt('Título do compromisso:');
        if (!titulo) return;
        const data = prompt('Data do compromisso (YYYY-MM-DD):');
        const observacoes = prompt('Observações:');
        try {
                await window.api.novoCompromisso({ titulo, data: data || '', hora: '', descricao: observacoes || '' });
                if (msg) msg.textContent = 'Compromisso salvo';
                alert('Compromisso salvo');
                consultarCompromissos();
        } catch (e) {
                console.error('erro novo', e);
                alert('Erro ao salvar compromisso');
                if (msg) msg.textContent = 'Erro ao salvar';
        }
}

function bindButtons(){
    novoBtn = document.getElementById('novo');
    consultarBtn = document.getElementById('consultar');
    msg = document.getElementById('mensagem');
    out = document.getElementById('caminho');
    console.log('bindButtons', { novoBtn: !!novoBtn, consultarBtn: !!consultarBtn });
    if (novoBtn) {
        novoBtn.addEventListener('click', (e)=>{ console.log('evento click - novoBtn disparado'); novoCompromisso(e.currentTarget); });
    } else console.warn('novoBtn não encontrado');
    if (consultarBtn) {
        consultarBtn.addEventListener('click', (e)=>{ console.log('evento click - consultarBtn disparado'); consultarCompromissos(); });
    } else console.warn('consultarBtn não encontrado');
}

document.addEventListener('DOMContentLoaded', ()=>{ bindButtons(); consultarCompromissos(); });