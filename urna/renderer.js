// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
  // "Banco de dados" simples de candidatos
  // Em um app real, isso viria de um servidor ou arquivo
  // Adicione caminhos para as imagens em /images/
  const candidates = {
    '13': {
      name: 'EMANUEL',
      party: 'PT',
      photo: '../images/lula.jpg', // Crie a pasta /images e coloque a foto
    },
    '22': {
      name: 'LENILDO',
      party: 'PL',
      photo: '../images/bolsonaro.jpg', // Crie a pasta /images e coloque a foto
    },
    '50': {
      name: 'Candidato Teste',
      party: 'PSOL',
      photo: '', // Sem foto
    },
  };

  // Referências aos elementos do DOM
  const numericKeys = document.querySelectorAll('.numeric-keys .key-btn');
  const btnBranco = document.getElementById('btn-branco');
  const btnCorrige = document.getElementById('btn-corrige');
  const btnConfirma = document.getElementById('btn-confirma');

  const num1 = document.getElementById('num-1');
  const num2 = document.getElementById('num-2');

  const screens = {
    initial: document.getElementById('initial-screen'),
    candidate: document.getElementById('candidate-screen'),
    blank: document.getElementById('blank-screen'),
    nulled: document.getElementById('null-screen'),
    end: document.getElementById('end-screen'),
    results: document.getElementById('results-screen'),
  };

  const candidateInfo = {
    name: document.getElementById('candidate-name'),
    party: document.getElementById('candidate-party'),
    photo: document.getElementById('candidate-photo'),
  };

  // Elementos para resultados
  const btnResults = document.getElementById('btn-results');
  const resultsOutput = document.getElementById('results-output');
  const resultsScreen = document.getElementById('results-screen');
  const btnCloseResults = document.getElementById('btn-close-results');

  // Variáveis de estado
  let currentVote = '';
  const VOTE_DIGITS = 2; // Estamos votando para vereador (2 dígitos)
  let currentState = 'START'; // START, VOTING, BLANK, NULLED, CONFIRMED

  // --- Funções Auxiliares ---

  // Mostra apenas a tela desejada
  function showScreen(screenName) {
    // Esconde todas as telas
    Object.values(screens).forEach((screen) =>
      screen.classList.remove('active')
    );
    // Mostra a tela específica
    if (screens[screenName]) {
      screens[screenName].classList.add('active');
    }
  }

  // Reseta a urna para o estado inicial
  function resetUrna() {
    currentVote = '';
    currentState = 'START';
    num1.innerText = '';
    num2.innerText = '';
    candidateInfo.name.innerText = '---';
    candidateInfo.party.innerText = '---';
    candidateInfo.photo.src = '';
    candidateInfo.photo.classList.remove('visible');
    showScreen('initial');
  }

  // Atualiza a tela do candidato com base no número digitado
  function updateCandidateScreen() {
    if (currentVote.length === VOTE_DIGITS) {
      const candidate = candidates[currentVote];

      if (candidate) {
        // Candidato encontrado
        currentState = 'VOTING';
        candidateInfo.name.innerText = candidate.name;
        candidateInfo.party.innerText = candidate.party;
        if (candidate.photo) {
          candidateInfo.photo.src = candidate.photo;
          candidateInfo.photo.classList.add('visible');
        }
      } else {
        // Voto Nulo
        currentState = 'NULLED';
        candidateInfo.name.innerText = 'VOTO NULO';
        candidateInfo.party.innerText = 'VOTO NULO';
        showScreen('nulled'); // Mostra a tela de NULO por cima
        
        // HACK: Para mostrar "VOTO NULO" por baixo da sobreposição
        screens.candidate.classList.add('active'); 
        num1.innerText = currentVote[0] || '';
        num2.innerText = currentVote[1] || '';
      }
    }
  }

  // Mostra a tela de FIM e reseta após um tempo
  function finishVote() {
    currentState = 'CONFIRMED';
    showScreen('end');
    
    // Opcional: Tocar o som da urna
    // new Audio('path/to/fim-sound.mp3').play();

    // Reseta a urna após 3 segundos
    setTimeout(() => {
      resetUrna();
    }, 3000);
  }

  // --- Handlers de Eventos ---

  // Clique em tecla numérica
  function handleNumericKeyClick(event) {
    if (currentState === 'CONFIRMED' || currentState === 'BLANK') return;
    if (currentVote.length >= VOTE_DIGITS) return;

    const key = event.target.dataset.key;
    currentVote += key;

    // Mostra a tela do candidato assim que o primeiro número é digitado
    if (currentState === 'START') {
      showScreen('candidate');
      currentState = 'VOTING';
    }

    // Atualiza os displays de número
    num1.innerText = currentVote[0] || '';
    num2.innerText = currentVote[1] || '';

    // Se completou os dígitos, busca o candidato
    if (currentVote.length === VOTE_DIGITS) {
      updateCandidateScreen();
    }
  }

  // Clique em BRANCO
  function handleBrancoClick() {
    if (currentState === 'START') {
      currentState = 'BLANK';
      showScreen('blank');
    }
  }

  // Clique em CORRIGE
  function handleCorrigeClick() {
    resetUrna();
  }

  // Clique em CONFIRMA
  async function handleConfirmaClick() {
    let voteToConfirm = null;

    if (currentState === 'BLANK') {
      voteToConfirm = { candidate: 'BRANCO' };
    } else if (currentState === 'NULLED') {
      voteToConfirm = { candidate: `NULO (${currentVote})` };
    } else if (currentState === 'VOTING' && currentVote.length === VOTE_DIGITS) {
      voteToConfirm = { candidate: currentVote, details: candidates[currentVote] };
    } else {
      // Não faz nada se não estiver em um estado válido para confirmar
      return;
    }

    // Envia o voto para o Processo Principal (main.js)
      // Verifica se a API do preload está disponível
      if (!window.electronAPI || typeof window.electronAPI.confirmVote !== 'function') {
        console.error('electronAPI não está disponível no renderer', window.electronAPI);
        alert('Erro de comunicação: a ponte com o sistema não está disponível. Verifique se o app foi iniciado via Electron e se o preload foi carregado (Abra DevTools - Console para mais detalhes).');
        return;
      }

      try {
        // Usamos a API exposta pelo preload.js
        const result = await window.electronAPI.confirmVote(voteToConfirm);
        console.log('Resposta do Main:', result.message);

        // Só finaliza se o main process confirmar
        if (result.success) {
          finishVote();
        } else {
          alert('Erro ao registrar voto: ' + (result.message || 'erro desconhecido'));
        }
      } catch (error) {
        console.error('Erro ao enviar voto:', error);
        alert('Erro grave de comunicação com o sistema. Veja o console do DevTools para detalhes.');
      }
  }

  // --- Adiciona os Event Listeners ---

  // Teclas numéricas
  numericKeys.forEach((key) => {
    key.addEventListener('click', handleNumericKeyClick);
  });

  // Teclas de ação
  btnBranco.addEventListener('click', handleBrancoClick);
  btnCorrige.addEventListener('click', handleCorrigeClick);
  btnConfirma.addEventListener('click', handleConfirmaClick);
  // Botão de resultados
  if (btnResults) {
    btnResults.addEventListener('click', async () => {
      // Verifica API
      if (!window.electronAPI || typeof window.electronAPI.getResults !== 'function') {
        alert('Função de resultados não disponível. Abra DevTools e verifique o preload.');
        return;
      }

      // Chama getResults e exibe
      try {
        const res = await window.electronAPI.getResults();
        if (res && res.success) {
          const totals = res.totals || {};
          const totalVotes = res.totalVotes || 0;
          // Formata a saída
          let out = `Total de votos: ${totalVotes}\n\n`;
          const entries = Object.entries(totals);
          if (entries.length === 0) out += 'Nenhum voto registrado.';
          else {
            entries.forEach(([candidate, count]) => {
              out += `${candidate}: ${count}\n`;
            });
          }
          resultsOutput.innerText = out;
          // Mostra sobreposição de resultados
          showScreen('results');
        } else {
          alert('Falha ao obter resultados: ' + (res && res.message));
        }
      } catch (err) {
        console.error('Erro ao obter resultados:', err);
        alert('Erro ao obter resultados. Veja o console.');
      }
    });
  }

  if (btnCloseResults) {
    btnCloseResults.addEventListener('click', () => {
      // Fecha a sobreposição e volta à tela inicial
      resetUrna();
    });
  }

  // --- Inicialização ---
  // Diagnóstico: loga se a API exposta pelo preload está disponível
  try {
    // eslint-disable-next-line no-console
    console.log('Diagnóstico renderer: window.electronAPI =>', typeof window.electronAPI);
    if (window.electronAPI) {
      console.log('Diagnóstico renderer: electronAPI keys =>', Object.keys(window.electronAPI));
    }
  } catch (e) {
    // ignore
  }

  resetUrna(); // Garante que a urna comece no estado inicial
});