// Funções de verificação
function verificarSinal() {
  const inputEl = document.getElementById("num");
  const inputValue = inputEl.value.trim();
  const numero = Number(inputValue);
  const resultadoEl = document.getElementById("resultado2");

  if (inputValue === "") {
    resultadoEl.innerText = "Digite um número.";
    return;
  }
  if (Number.isNaN(numero)) {
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
  const inputValue = inputEl.value.trim();
  const numero = Number(inputValue);
  const resultadoEl = document.getElementById("resultado3");

  if (inputValue === "") {
    resultadoEl.innerText = "Digite um número.";
    return;
  }
  if (Number.isNaN(numero)) {
    resultadoEl.innerText = "Valor inválido.";
    return;
  }

  resultadoEl.innerText = numero % 2 === 0 ? "Par" : "Ímpar";
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

// Conversões de temperatura (simples e separadas)
function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

// Wrappers para UI — mostram somente uma conversão
function mostrarKelvin() {
  const inputEl = document.getElementById('Ncelcius');
  const kelvinEl = document.getElementById('kelvin');
  const raw = inputEl.value.trim();
  const c = Number(raw);
  if (raw === '' || Number.isNaN(c)) {
    kelvinEl.textContent = 'Por favor, insira um número válido.';
    return;
  }
  kelvinEl.textContent = `Kelvin: ${celsiusToKelvin(c).toFixed(2)}`;
}

function mostrarFahrenheit() {
  const inputEl = document.getElementById('Ncelcius');
  const fahrenheitEl = document.getElementById('fahrenheit');
  const raw = inputEl.value.trim();
  const c = Number(raw);
  if (raw === '' || Number.isNaN(c)) {
    fahrenheitEl.textContent = 'Por favor, insira um número válido.';
    return;
  }
  fahrenheitEl.textContent = `Fahrenheit: ${celsiusToFahrenheit(c).toFixed(2)}`;
}

function limparTempCampos() {
  const inputEl = document.getElementById('Ncelcius');
  inputEl.value = '';
  document.getElementById('kelvin').textContent = '';
  document.getElementById('fahrenheit').textContent = '';
}
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
function converterCelsiusParaFahrenheit(celsius) {
  let fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}
function converterCelsiusParaKelvin(celsius) {
  let kelvin = celsius + 273.15;
  return kelvin;
}


function limparCampos() {
  const inputEl = document.getElementById('Ncelcius');
  inputEl.value = '';
  document.getElementById('kelvin').textContent = '';
  document.getElementById('fahrenheit').textContent = '';
}

