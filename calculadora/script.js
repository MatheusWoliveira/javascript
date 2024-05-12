// Seleção dos elementos
const display = document.querySelector("#displayInput"); 
const botaoIgual = document.querySelector(".igual"); 
const botaoPonto = document.querySelector(".ponto"); 
const botoesNumeros = document.querySelectorAll(".num");  
const botoesOperadores = document.querySelectorAll(".operador"); 
const botaoLimpar = document.querySelector(".limpar"); 



// Variáveis globais
let operacaoAtual = ""; 
let operador = null;  
let valorAnterior = ""; 
let calculando = false; 


// Funções
function atualizaDisplay() {
    display.value = operacaoAtual;
}

function insereNumero(event) {

    if (calculando) {
        operacaoAtual = event.target.textContent;
        calculando = false;

    } else {
        operacaoAtual += event.target.textContent;
    }

    atualizaDisplay(); // Atualiza o display após inserir o número
}

function inserePonto() {
    if (operacaoAtual.indexOf(".") === -1) {
        operacaoAtual += ".";
        atualizaDisplay(); // Atualiza o display após inserir o ponto decimal
    }
}

function insereOperador(event) {

    if (operacaoAtual !== "") {
        if (!calculando) {
            if (operador !== null) {
                calcula(); // Se não estiver calculando, realiza o cálculo
            }
            valorAnterior = operacaoAtual;
            operacaoAtual = "";
        }
        operador = event.target.textContent; // Define o operador atual
    }
}

// Realiza o cálculo da operação
function calcula() {

    let resultado = null;
    const operandoAnterior = parseFloat(valorAnterior);
    const operandoAtual = parseFloat(operacaoAtual);

    switch (operador) {
        case "+":
            resultado = operandoAnterior + operandoAtual;
            break;
        case "-":
            resultado = operandoAnterior - operandoAtual;
            break;
        case "*":
            resultado = operandoAnterior * operandoAtual;
            break;
        case "÷":
            resultado = operandoAnterior / operandoAtual;
            break;
    }

    operacaoAtual= String(resultado); // Converte o resultado em uma string
    valorAnterior = operacaoAtual;
    calculando = true;  
    atualizaDisplay(); 
};

// Limpa a operação atual
function limpaOperacao() {
    operacaoAtual = ""; 
    valorAnterior = ""; 
    operador = null; 
    calculando = false; 
    atualizaDisplay(); 
}


// Eventos
botaoPonto.addEventListener("click", inserePonto );

botoesNumeros.forEach((botao) => botao.addEventListener("click", insereNumero)); 

botoesOperadores.forEach((botao) =>
    botao.addEventListener("click", insereOperador));

botaoIgual.addEventListener("click", calcula); 

botaoLimpar.addEventListener("click", limpaOperacao); 


