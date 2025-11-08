// Debug: confirmar que renderer foi carregado e se a API está disponível
try {
    // eslint-disable-next-line no-console
    console.log('renderer: carregado. window.api presente?', !!window.api);
} catch (e) {
    console.error('renderer: erro ao checar window.api', e);
}

const btnLimpar = document.getElementById('limpar');
const btnVoltar = document.getElementById('back');
const visor = document.getElementById('visor');
const btnHistAnterior = document.getElementById('hist-anterior');
const btnHistProximo = document.getElementById('hist-proximo');
const btnToggleHistorico = document.getElementById('toggle-history');
const paragrafoHistorico = document.getElementById('history-paragraph');

let operador;
let navegacaoIndice = -1; // índice para navegar histórico

if (btnLimpar) btnLimpar.addEventListener('click', () => { visor.value = ''; operador = undefined; });
if (btnVoltar) btnVoltar.addEventListener('click', () => { visor.value = visor.value.slice(0, -1); });

const botoes = document.querySelectorAll('.pad button');

// Interação dos botões
botoes.forEach((botao) => {
    botao.addEventListener('click', async () => {
        if (botao.classList.contains('num')) {
            if (visor.value === '0') visor.value = '';
            visor.value += botao.textContent.trim();
            return;
        }

        if (botao.classList.contains('op')) {
            if (!visor.value) return;
            if (operador) return; // já existe operador
            visor.value += botao.textContent;
            operador = botao.textContent.trim();
            return;
        }

        if (botao.id === 'igual') {
            // calcula e adiciona ao histórico no main
            console.log('renderer: = clicado, visor=', visor.value, 'operador=', operador);
            // detectar operador digitado via teclado
            if (!operador) {
                const s = visor.value || '';
                let start = 0;
                if (s.startsWith('-')) start = 1;
                for (let i = start; i < s.length; i++) {
                    const ch = s[i];
                    if ('+-*/'.includes(ch)) { operador = ch; break; }
                }
            }
            if (!operador) return;
            const idx = visor.value.indexOf(operador);
            if (idx === -1) return;
            const esquerda = visor.value.substring(0, idx).trim();
            const direita = visor.value.substring(idx + operador.length).trim();
            if (esquerda === '' || direita === '') return;
            const a = Number(esquerda);
            const b = Number(direita);
            let resultado;
            switch (operador) {
                case '+': resultado = a + b; break;
                case '-': resultado = a - b; break;
                case '*': resultado = a * b; break;
                case '/': resultado = (b === 0) ? 'Erro' : (a / b); break;
                default: return;
            }

            const calculoCompleto = `${esquerda} ${operador} ${direita} = ${resultado}`;
            try {
                if (window.api && typeof window.api.adicionarHistorico === 'function') {
                    await window.api.adicionarHistorico(calculoCompleto);
                } else if (window.api && typeof window.api.addToHistory === 'function') {
                    await window.api.addToHistory(calculoCompleto);
                }
            } catch (e) {
                console.error('Erro ao adicionar histórico:', e);
            }

            // atualizar parágrafo de histórico
            try {
                if (window.api && typeof window.api.obterHistorico === 'function') {
                    const historico = await window.api.obterHistorico();
                    if (paragrafoHistorico) paragrafoHistorico.innerHTML = (historico || []).map(x => String(x).replace(/</g, '&lt;')).join('<br>');
                }
            } catch (e) {
                console.error('Erro ao obter histórico:', e);
            }

            visor.value = String(resultado);
            operador = undefined;
        }
    });
});

// Toggle do parágrafo de histórico (se existir)
if (btnToggleHistorico) {
    btnToggleHistorico.addEventListener('click', async () => {
        if (!paragrafoHistorico) return;
        if (paragrafoHistorico.style.display === 'none' || paragrafoHistorico.style.display === '') {
            try {
                if (window.api && typeof window.api.obterHistorico === 'function') {
                    const historico = await window.api.obterHistorico();
                    paragrafoHistorico.innerHTML = (historico || []).map(x => String(x).replace(/</g, '&lt;')).join('<br>');
                }
            } catch (e) {
                console.error('Erro ao obter histórico:', e);
                paragrafoHistorico.innerText = 'Erro ao carregar histórico.';
            }
            paragrafoHistorico.style.display = 'block';
        } else {
            paragrafoHistorico.style.display = 'none';
        }
    });
}

// Função auxiliar para carregar histórico do main (com tratamento de erro)
async function carregarHistorico() {
    if (!window.api) return [];
    try {
        if (typeof window.api.obterHistorico === 'function') {
            return await window.api.obterHistorico();
        } else if (typeof window.api.getHistory === 'function') {
            return await window.api.getHistory();
        }
    } catch (e) {
        console.error('Erro ao carregar histórico (carregarHistorico):', e);
    }
    return [];
}

// Navegação pelo histórico: ▲ anterior, ▼ próximo
if (btnHistAnterior) {
    btnHistAnterior.addEventListener('click', async () => {
        const historico = await carregarHistorico();
        if (!historico || historico.length === 0) return;
        // se ainda não começamos a navegar, posicionamos após o último
        if (navegacaoIndice === -1) navegacaoIndice = historico.length;
        if (navegacaoIndice > 0) navegacaoIndice--;
        const item = historico[navegacaoIndice];
        if (!item) return;
        // mostrar apenas a expressão antes do '=' para permitir recalcular
        const expressao = String(item).split('=')[0].trim();
        visor.value = expressao;
    });
}

if (btnHistProximo) {
    btnHistProximo.addEventListener('click', async () => {
        const historico = await carregarHistorico();
        if (!historico || historico.length === 0) return;
        if (navegacaoIndice === -1) navegacaoIndice = historico.length;
        if (navegacaoIndice < historico.length - 1) {
            navegacaoIndice++;
            const item = historico[navegacaoIndice];
            const expressao = String(item).split('=')[0].trim();
            visor.value = expressao;
        } else {
            // se já estava no final, limpa o visor
            navegacaoIndice = historico.length;
            visor.value = '';
        }
    });
}