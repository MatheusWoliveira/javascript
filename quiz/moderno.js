const questaoQuiz = [
    {
        questoes: "Qual é a capital do Brasil?",
        escolhas: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
        resposta: "Brasília",
    },
    {
        questoes: "Qual é a capital da Argentina?",
        escolhas: ["Buenos Aires", "Brasília", "Lisboa", "Paris"],
        resposta: "Buenos Aires",
    },
    {
        questoes: "Qual é a capital da França?",
        escolhas: ["Roma", "Madrid", "Paris", "Londres"],
        resposta: "Paris",
    },
    {
        questoes: "Qual é a capital da Espanha?",
        escolhas: ["Lisboa", "Madrid", "Barcelona", "Valência"],
        resposta: "Madri",
    },
    {
        questoes: "Qual é a capital da Itália?",
        escolhas: ["Veneza", "Milão", "Roma", "Nápoles"],
        resposta: "Roma",
    },
    {
        questoes: "Qual é a capital do Canadá?",
        escolhas: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        resposta: "Ottawa",
    },
    {
        questoes: "Qual é a capital dos Estados Unidos?",
        escolhas: ["Nova York", "Los Angeles", "Chicago", "Washington D.C."],
        resposta: "Washington D.C.",
    },
    {
        questoes: "Qual é a capital do Reino Unido?",
        escolhas: ["Liverpool", "Manchester", "Edimburgo", "Londres"],
        resposta: "Londres",
    },
];


//Elementos
const questaoElement = document.querySelector("#questao");
const escolhaElements = document.querySelectorAll(".escolha");
const proximoElement = document.querySelector("#proximo");
const pontoElement = document.querySelector("#pontos");
const erroElement = document.querySelector("#erros");


// variaveis
let perguntaAtual = 0;
let ponto = 0;
let erro = 0;
let respostaEscolhida = false;

// funções

function loadPergunta() {
    const perguntaAtualData = questaoQuiz[perguntaAtual]
    questaoElement.innerText = perguntaAtualData.questoes;

    const perguntas = embaralharArray(perguntaAtualData.escolhas);

    for(let i = 0; i < escolhaElements.length; i++){
        escolhaElements[i].innerText = perguntas[i];
    }

    respostaEscolhida = false;
}

function embaralharArray(array) {
    let atualIndex = array.length;
    let temporarioValue;
    let aleatorioIndex;

    while (0 !== atualIndex) {
        aleatorioIndex = Math.floor(Math.random() * atualIndex);
        atualIndex -= 1

        temporarioValue = array[atualIndex];
        array[atualIndex] = array[aleatorioIndex];
        array[aleatorioIndex] = temporarioValue;
    }

    return array;
}

function checkAnswer(e) {
    if ( respostaEscolhida) return;

    respostaEscolhida = true;

    if(e.target.innerText === questaoQuiz[perguntaAtual].resposta) {
        ponto++;
        pontoElement.innerText = `Pontuação: ${ponto}`;
        alert("Correto!")
    } else {
        erro++;
        erroElement.innerText = `Erros: ${erro}`;
        alert(`Errado! A resposta correta é: ${questaoQuiz[perguntaAtual].resposta}`);
    }
}

escolhaElements.forEach((btn) => {
    btn.addEventListener("click", checkAnswer)
});

proximoElement.addEventListener("click", () => {
    if(!respostaEscolhida){
        alert("Por favor, responda a pergunta!");
        return;
    }

    perguntaAtual++;

    if(perguntaAtual < questaoQuiz.length){
        loadPergunta();
    } else { 
        alert("Fim de jogo ! Você acertou " + ponto + " de " + questaoQuiz.length + " perguntas !");
        restarQuiz();
    }
   
});

function restarQuiz() {
    perguntaAtual = 0;
    ponto = 0;
    erro = 0;
    pontoElement.innerText = "Pontuação: 0";
    erroElement.innerText = "Erros: 0";
    loadPergunta();
}

loadPergunta();