function verificarSinal() {
  const inputEl = document.getElementById("num");
  const raw = inputEl.value;
  const numero = Number(raw);
  const resultadoEl = document.getElementById("resultado2");

  if (raw === "") {
    resultadoEl.innerText = "Digite um número.";
    return;
  }
  if (isNaN(numero)) {
    resultadoEl.innerText = "Valor inválido.";
    return;
  }

  if (numero > 0) {
    resultadoEl.innerText = "Positivo";
  } else if (numero < 0) {
    resultadoEl.innerText = "Negativo";
  } else {
    resultadoEl.innerText = "Zero";
  }
}
function parouimpa() {
  const inputEl = document.getElementById("num2");
  const raw = inputEl.value;
  const numero = Number(raw);
  const resultadoEl = document.getElementById("resultado3");

  if (raw === "") {
    resultadoEl.innerText = "Digite um número.";
    return;
  }
  if (isNaN(numero)) {
    resultadoEl.innerText = "Valor inválido.";
    return;
  }

  if (numero % 2 === 0) {
    resultadoEl.innerText = "Par";
  } else {
    resultadoEl.innerText = "Ímpar";
  }
}
function calcularMediaPonderada() {
  const atividade = parseFloat(document.getElementById("num").value);
  const prova = parseFloat(document.getElementById("num2").value);
  const resultadoEl = document.getElementById("resultado3");

  if (isNaN(atividade) || isNaN(prova)) {
    resultadoEl.innerText =
      "Por favor insira notas válidas para atividade e prova.";
    return;
  }

  const parte1 = atividade * 0.4;
  const parte2 = prova * 0.6;

  const mediaFinal = parte1 + parte2;

  resultadoEl.innerText = "Média ponderada: " + mediaFinal.toFixed(2);
}

function limparCampos() {
  document.getElementById("num").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("resultado3").innerText = "";
}
  function converterTemperatura() {
        var input = document.getElementById('Ncelcius');
        var c = parseFloat(input.value);
        if (isNaN(c)) {
          document.getElementById('kelvin').textContent = 'Por favor, insira um número válido.';
          document.getElementById('fahrenheit').textContent = '';
          return;
        }
        var k = c + 273.15;
        var f = (c * 9/5) + 32;
        document.getElementById('kelvin').textContent = 'Kelvin: ' + k.toFixed(2);
        document.getElementById('fahrenheit').textContent = 'Fahrenheit: ' + f.toFixed(2);
      }
      function limparCampos() {
        document.getElementById('Ncelcius').value = '';
        document.getElementById('kelvin').textContent = '';
        document.getElementById('fahrenheit').textContent = '';
      }

