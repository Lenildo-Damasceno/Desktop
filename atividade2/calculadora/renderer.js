// Debug: confirmar que renderer foi carregado e se a API está disponível
try {
    // eslint-disable-next-line no-console
    console.log('renderer: carregado. window.api presente?', !!window.api);
} catch (e) {
    console.error('renderer: erro ao checar window.api', e);
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const visor = document.getElementById('visor');
        const btnLimpar = document.getElementById('limpar');
        const btnBack = document.getElementById('back');
        const btnIgual = document.getElementById('igual');
        const buttons = document.querySelectorAll('.pad button');
        const btnHistory = document.getElementById('history-btn');
        const panel = document.getElementById('historyPanel');
        const historyList = document.getElementById('historyList');
        const historyClear = document.getElementById('historyClear');

        if (!visor) {
            console.error('Visor não encontrado (id="visor").');
            return;
        }

        // histórico em localStorage (nome que não conflita com window.history)
        const STORAGE_KEY = 'calc_historico_v1';
        const historico = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

        let operador = null;

        function saveHistory() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(historico));
        }

        function setVisor(v) { visor.value = String(v); }

        function appendDigit(d) {
            if (visor.value === '0' || visor.value === 'Erro') visor.value = String(d);
            else visor.value += String(d);
        }

        function addOperator(op) {
            if (/[+\-*/]$/.test(visor.value)) {
                visor.value = visor.value.slice(0, -1) + op;
            } else {
                visor.value += op;
            }
            operador = op;
        }

        function calcular() {
            if (!operador) return;
            const partes = visor.value.split(operador);
            if (partes.length < 2) return;
            const a = Number(partes[0]);
            const b = Number(partes.slice(1).join(operador));
            if (Number.isNaN(a) || Number.isNaN(b)) { setVisor('Erro'); return; }
            let res;
            switch (operador) {
                case '+': res = a + b; break;
                case '-': res = a - b; break;
                case '*': res = a * b; break;
                case '/':
                    if (b === 0) { setVisor('Erro'); return; }
                    res = a / b; break;
                default: return;
            }
            if (typeof res === 'number' && !Number.isInteger(res)) res = Number(res.toFixed(10));
            const texto = `${a} ${operador} ${b} = ${res}`;
            setVisor(res);
            historico.push({ expr: `${a} ${operador} ${b}`, result: String(res), text: texto, time: new Date().toLocaleString() });
            saveHistory();
            renderHistory();
            operador = null;
        }

        function renderHistory() {
            if (!historyList) return;
            historyList.innerHTML = '';
            for (let i = historico.length - 1; i >= 0; i--) {
                const item = historico[i];
                const li = document.createElement('li');
                li.className = 'history-item';
                li.textContent = item.text;
                li.dataset.result = item.result;
                li.title = item.time;
                li.addEventListener('click', () => {
                    setVisor(li.dataset.result);
                    // fechar painel
                    if (panel) { panel.classList.add('hidden'); btnHistory?.setAttribute('aria-expanded', 'false'); }
                });
                historyList.appendChild(li);
            }
        }

        // eventos do painel de histórico
        btnHistory?.addEventListener('click', () => {
            if (!panel) return;
            panel.classList.toggle('hidden');
            const expanded = panel.classList.contains('hidden') ? 'false' : 'true';
            btnHistory.setAttribute('aria-expanded', expanded);
        });

        historyClear?.addEventListener('click', () => {
            historico.length = 0;
            saveHistory();
            renderHistory();
        });

        // eventos dos botões da calculadora
        buttons.forEach(btn => {
            const id = btn.id;
            // ignorar controles do painel (caso dentro .pad)
            if (id === 'history-btn' || id === 'historyClear') return;

            if (btn.classList.contains('num')) {
                btn.addEventListener('click', () => {
                    appendDigit(btn.textContent.trim());
                });
                return;
            }

            if (btn.classList.contains('op')) {
                btn.addEventListener('click', () => {
                    addOperator(btn.textContent.trim());
                });
                return;
            }

            if (id === 'limpar') {
                btn.addEventListener('click', () => setVisor('0'));
                return;
            }

            if (id === 'back') {
                btn.addEventListener('click', () => {
                    const next = visor.value.slice(0, -1) || '0';
                    setVisor(next);
                });
                return;
            }

            if (id === 'igual') {
                btn.addEventListener('click', calcular);
                return;
            }
        });

        // render inicial
        renderHistory();
        console.log('Renderer da calculadora carregado — histórico:', historico.length);
    } catch (err) {
        console.error('Erro no renderer.js:', err);
    }
});
