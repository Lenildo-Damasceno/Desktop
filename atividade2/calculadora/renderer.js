// Seleciona o visor
const display = document.getElementById('display');

// Variáveis para guardar o "estado" da calculadora
let primeiroNumero = null;
let operadorAtual = null;
let limparDisplayNaProximaEntrada = false;

/**
 * Limpa tudo e reseta o estado da calculadora.
 */
function limparTudo() {
    display.value = '0';
    primeiroNumero = null;
    operadorAtual = null;
    limparDisplayNaProximaEntrada = false;
}

/**
 * Adiciona um número (0-9) ao visor.
 * @param {string} numero - O número a ser adicionado.
 */
function adicionarNumero(numero) {
    // Se o display deve ser limpo (após um operador ou '='), limpa primeiro
    if (limparDisplayNaProximaEntrada) {
        display.value = numero;
        limparDisplayNaProximaEntrada = false;
    } else {
        // Se o valor atual for '0', substitui pelo número
        // Senão, concatena
        display.value = display.value === '0' ? numero : display.value + numero;
    }
}

/**
 * Adiciona um ponto decimal ao visor.
 */
function adicionarPonto() {
    // Se o display vai ser limpo, começa com "0."
    if (limparDisplayNaProximaEntrada) {
        display.value = '0.';
        limparDisplayNaProximaEntrada = false;
        return; // Sai da função
    }

    // Se o visor já não tiver um ponto, adiciona
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

/**
 * Armazena o operador escolhido e o primeiro número.
 * @param {string} operador - O operador (+, -, *, /)
 */
function escolherOperador(operador) {
    // Se já tivermos um operador e o usuário clicar em outro
    // (ex: 5 + 3 -), calcula o resultado parcial (5 + 3) primeiro.
    if (operadorAtual !== null && !limparDisplayNaProximaEntrada) {
        calcularResultado();
    }

    // Armazena o número atual como o primeiro número da operação
    primeiroNumero = parseFloat(display.value);
    // Armazena o operador clicado
    operadorAtual = operador;
    // Prepara o display para ser limpo na próxima vez que um número for digitado
    limparDisplayNaProximaEntrada = true;
}

/**
 * Executa o cálculo com base nos números e no operador armazenados.
 */
function calcularResultado() {
    // Se não tivermos um operador ou se o usuário
    // apertar '=' logo depois de um operador (sem segundo número), não faz nada.
    if (operadorAtual === null || limparDisplayNaProximaEntrada) {
        return;
    }

    // Pega o segundo número do visor
    const segundoNumero = parseFloat(display.value);
    let resultado;

    // A lógica que o eval() fazia, agora feita manualmente
    switch (operadorAtual) {
        case '+':
            resultado = primeiroNumero + segundoNumero;
            break;
        case '-':
            resultado = primeiroNumero - segundoNumero;
            break;
        case '*':
            resultado = primeiroNumero * segundoNumero;
            break;
        case '/':
            if (segundoNumero === 0) {
                resultado = "Erro"; // Tratamento de divisão por zero
            } else {
                resultado = primeiroNumero / segundoNumero;
            }
            break;
        default:
            return; // Sai caso algo esteja errado
    }

        // Mostra o resultado no visor
        display.value = String(resultado);
        // Reseta o operador
        operadorAtual = null;
        // Prepara o display para ser limpo
        // (Se o usuário digitar um novo número, começa uma nova conta)
        limparDisplayNaProximaEntrada = true;
        // O resultado fica no display, pronto para ser usado como
        // o 'primeiroNumero' de uma próxima operação (ex: 5 + 3 = 8... + 2 = 10)
        primeiroNumero = resultado;
    }