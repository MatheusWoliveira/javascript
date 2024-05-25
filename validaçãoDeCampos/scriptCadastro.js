//Página de Cadastro

//Funções para validar o formulário
function validarNumero() { 

    var numeroValido = document.getElementById("numero").value;

    if (numeroValido.length === 11){
        console.log("número válido");
        return true;
    } else {
        alert("O número que você digitou é inválido! Digite corretamente");
        console.log("número inválido");
        document.getElementById("numero").value = "";
        return false;
    }
}

function verificarSenha(){

    var senha1 = document.getElementById("senha").value;
    var confirmacaoDeSenha = document.getElementById("confirmar-senha").value;

    if(senha1 != confirmacaoDeSenha){
        alert("Senha incorreta ! Digite a mesma senha digitada anterior");
        document.getElementById("confirmar-senha").value = "";
        console.log("Confirmação de senha errado !");
        return false;
    } else {
        alert("Cadastrado");
        console.log("senha digitado certo !");
    }

    return true;
}

function validarNome() {

    var nomeValido = document.getElementById("nome").value;

    if(nomeValido == ""){
        alert("Por Favor ! Digite seu nome");
        document.getElementById("nome").value = "";
        console.log("Nome não digitado");
        return false;
    } else {
        console.log(("Nome digitado"));
    }

    return true;

}

// Eventos

document.getElementById("nome").addEventListener("blur", function(){
    validarNome();
})

document.getElementById("numero").addEventListener("blur", function(){
    validarNumero();
});

document.getElementById("formulario").addEventListener("submit", function(event) {
    if (!validarNumero() || !verificarSenha() || !validarNome()) {
        event.preventDefault(); // Impede a submissão do formulário
    } 
});