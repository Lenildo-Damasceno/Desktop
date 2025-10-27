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
      const num1 = parseFloat(document.getElementById('num').value)
      const num2 = parseFloat(document.getElementById('num2').value)
      const resultadoEl = document.getElementById('resultadoEl')

    
      if (isNaN(num1) || isNaN(num2)) {
        resultadoEl.textContent = 'Por favor, insira as duas notas.'
        return;
      }
      const pesoAtividade = 0.4
      const pesoProva = 0.6
      const mediaPonderada = (num1 * pesoAtividade + num2 * pesoProva) / (pesoAtividade + pesoProva)
      resultadoEl.textContent = `Sua média ponderada é: ${mediaPonderada.toFixed(2)}`
    }
function limparCampos() {
  document.getElementById("n1").value = ""
  document.getElementById("n2").value = ""
  document.getElementById("resultado").innerText = ""
}


        document.getElementById("btnCalcular").addEventListener("click", function() {


            let n1 = parseFloat(document.getElementById("nota1").value)
            let n2 = parseFloat(document.getElementById("nota2").value)
            let n3 = parseFloat(document.getElementById("nota3").value)
            let n4 = parseFloat(document.getElementById("nota4").value)

           
            let soma = n1 + n2 + n3 + n4;
            let media = soma / 4;
            if (isNaN(media)) {
              document.getElementById("resultado").textContent = "A média final é: " + media.toFixed(2)
            } else if (media < 6) {
              document.getElementById("resultado").textContent = "Reprovado sua nota é: " + media.toFixed(2)
            } else {
              document.getElementById("resultado").textContent = "Aprovado sua nota é: " + media.toFixed(2)
            }
        });


        
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
  document.getElementById('fahrenheit').textContent = ''
}
function converterDolar() {
  const valorEmReais = Number(document.getElementById("valor").value)
  const taxaDeConversao = 5.424 
  const valorEmDolares = valorEmReais / taxaDeConversao
  document.getElementById("resultado").innerText = "Valor em Dólares: " + valorEmDolares.toFixed(2);
}
function converterEuro() {
  const valorEmReais = Number(document.getElementById("valor").value)
  const taxaDeConversao = 6.353 
  const valorEmEuro = valorEmReais / taxaDeConversao
  document.getElementById("resultado").innerText = "Valor em Euro: " + valorEmEuro.toFixed(2);
}
function converterPeso(){
  const valorEmReais=Number(document.getElementById("valor").value)
  const taxaDeConversao = 0.0042
  const valorEmPeso = valorEmReais / taxaDeConversao
  document.getElementById("resultado").innerText = "Valor em Peso:" + valorEmPeso.toFixed(2)
}

function converterLibra(){
  const valorEmReais=Number(document.getElementById("valor").value)
  const taxaDeConversao = 7.326
  const valorEmLibra = valorEmReais / taxaDeConversao
  document.getElementById("resultado").innerText = "Valor em Libra:" + valorEmLibra.toFixed(2)
}
function converterFranco(){
  const valorEmReais=Number(document.getElementById("valor").value)
  const taxaDeConversao = 6.753
  const valorEmfranco = valorEmReais / taxaDeConversao
  document.getElementById("resultado").innerText = "Valor em Libra:" + valorEmfranco.toFixed(2)
}
function limparCampos() {
  document.getElementById("valor").value = "";
  document.getElementById("resultado").innerText = "";
}


