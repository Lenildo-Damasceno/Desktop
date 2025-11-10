const limparBtn = document.getElementById('limpar')
        const back = document.getElementById('back')
        const visor = document.getElementById('visor')
        let op

        limparBtn.addEventListener('click', () => {
            visor.value = ""
        })

        if (back) {
            back.addEventListener('click', () => {
                visor.value = visor.value.slice(0, -1)
            })
        }
        
        let botoes = document.querySelectorAll('button')
        botoes.forEach((botao) => {
            botao.addEventListener('click', () => {
                if(botao.className === 'num'){
                    visor.value += botao.textContent.trim()
                } else if(botao.className === 'op'){
                    visor.value += botao.textContent
                    op = botao.textContent.trim()
                    console.log(op)
                }else if(botao.id === 'igual'){                    
                    let conteudo = visor.value.split(op)
                    switch(op){
                        case '+': 
                            visor.value = Number(conteudo[0])+Number(conteudo[1])
                            break
                        case '-':
                            visor.value = Number(conteudo[0])-Number(conteudo[1])
                            break
                        case '*':
                            visor.value = Number(conteudo[0])*Number(conteudo[1])
                            break
                        case '/':
                            if(conteudo[1] === '0'){
                                visor.value = "Erro"
                            } else {
                                visor.value = Number(conteudo[0])/Number(conteudo[1])
                            }
                            break
                    }
                }
            })
        })

        document.getElementById('history-btn').addEventListener('click', () => {
          window.api.abrirHistorico();
        });
        