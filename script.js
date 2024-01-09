var nome = document.getElementById("name-input");
pis = document.getElementById("pis-input");
matricula = document.getElementById("matricula-input");
submitButton = document.getElementById("submit-button");
downloadButton = document.getElementById("download-button");
registroBox = document.getElementById("registros");

var lista = []; // ARRAY COM TODO O CONTEÚDO DE REGISTRADOS (REMOVE E ADD)

let registroCounter = -1; // INICIADOR DO CONTADOR PARA NOMEAR ID DAS DIVS


function pisCheck(pisInput){ //PERMITIR SOMENTE NÚMEROS (AJEITAR BUG QUANDO INSERE + ou -)
   return /^[0-9]+$/.test(pisInput);	
}

function checkForm(){
   if(!pis.value || !matricula.value || !nome.value){  // IF PARA MENSAGENS DE ERRO (AJEITAR HIERARQUIA) 
      submitButton.disabled = true;
      document.getElementById("error-message").innerHTML = "Um ou mais campos estão em branco!";
   }else{
      if ((pis.value).length == 11){
         if (pisCheck(pis.value)){      
            submitButton.disabled = false;
            document.getElementById("error-message").innerHTML = null           
         }else{
            submitButton.disabled = true;    
            document.getElementById("error-message").innerHTML = "Caractere especial detectado!<br>Utilize somente números no campo do PIS.";        
         }
      }else{
         submitButton.disabled = true;            
         document.getElementById("error-message").innerHTML ="O PIS deve conter 11 dígitos!<br>(Não utilize caracteres especiais, somente números!)";
      }
   }
}

function handleSubmit(event) {
    event.preventDefault();
    
    nome.value = (nome.value.toUpperCase()).trim();
    matricula.value = (matricula.value).trim();


    registNome = nome.value; // REGISTRAR VALOR DO NOME POIS FUTURAMENTE SERÁ NULL

    var value = {"Operação":"1+1+I","PIS":pis.value,"Nome":nome.value,"Verificação de Biometria":"1","Qtde Referências":"1","Matricula 1":matricula.value};
    lista.push(value);
    const data = new FormData(event.target);
   
   document.getElementById("registros").innerHTML += 'REGISTRADO:\nNome: ' + JSON.stringify(value.Nome) + '\nPIS: ' + JSON.stringify(value.PIS) + '\nMatrícula: ' + JSON.stringify(value["Matricula 1"]) + '\n\n';
   
    pis.value = null;
    nome.value = null;
    matricula.value = null;
    submitButton.disabled = true;
    downloadButton.disabled = false;
    
    document.getElementById("error-message").innerHTML = "Usuário registrado com sucesso!";
    

    registroCounter++;
    registroPagina = document.getElementById("register-page"); 
    registroPagina.style.width = '350px';   // DANDO TAMANHO À PÁGINA COM OS REGISTROS

    const registroDiv = document.createElement("div"); // CRIANDO DIV
    registroDiv.className = "registro-item"; // DANDO CLASSE
    registroDiv.id = `regist-func${registroCounter}`; // DANDO ID
    registroDiv.setAttribute("name", registNome); // SETANDO NOME DA CLASSE
    
    document.querySelector(".register-list").appendChild(registroDiv); // ADICIONANDO DIV DO COLABORADOR À DIV PAI
   
    
    // Adicionar informações do registro à div
    registroDiv.innerHTML = `
        <p><strong>Nome:</strong> ${value.Nome}</p>
        <p><strong>PIS:</strong> ${value.PIS}</p>
        <p><strong>Matrícula:</strong> ${value["Matricula 1"]}</p>
        <button class="remove-button" onclick="removeRegistro('${registroDiv.id}')">X</button>
    `; //INSERINDO CONTEÚDO NA DIV DO COLABORADOR
    spacementInput = document.getElementById("input-spacement");
    spacementInput.style.display = "flex";
    console.log(lista)
}
 


function removeRegistro(registroId) {
   const registroDiv = document.getElementById(registroId);
   getDivName = registroDiv.getAttribute("name"); // PEGA O NOME DA DIV DO COLABORADOR PARA UTILIZAR NO FOR

    for(linhas in lista){
       for(linha in linhas){
         if (getDivName == (lista[linhas[linha]].Nome)){ //CHECAR SE O NOME DA DIV DO COLABORADOR (QUE É IGUAL AO NOME DO COLABORADOR NA LISTA) É IGUAL AO NOME NO OBJ ATUAL DA CHECAGEM
            console.log(getDivName + ' foi removido com sucesso!')
            lista.splice(linhas, 1)
         }else {
            console.log('Erro! Entre em contato com o desenvolvedor\nTambém pode reiniciar a página (Perde todo o conteúdo)')
         }
      }
    }

    registroDiv.remove(); //REMOVE DIV DO COLABORADOR

    const registroContainer = document.querySelector('.register-list');
   if (registroContainer && registroContainer.children.length === 0) { //CHECAR SE A DIV PAI ESTÁ VAZIA, PARA ESCONDER DA PÁGINA TOTALMENTE
      registroPagina.style.width = '0';
      spacementInput.style.display = "none";
   }
}

 
function downloadResultados(){ // EXECUTAR DOWNLOAD
    console.log(lista);

    var jsonData = JSON.stringify(lista); // TRANSFORMA EM JSON STRING
    console.log('CONTEÚDO BAIXADO:\n\n' + jsonData);

    var blob = new Blob([jsonData], { type: 'application/json' });
    var a = document.createElement('a'); // CRIANDO ÂNCORA
    a.href = window.URL.createObjectURL(blob);
    a.download = 'rep_colaborador.json'; // NOME DO ARQUIVO
    
    document.body.appendChild(a); //ADICIONAR ÂNCORA
    a.click();
    document.body.removeChild(a); // REMOÇÃO DE ÂNCORA
}



pis.addEventListener('input', checkForm);
matricula.addEventListener('input', checkForm);
nome.addEventListener('input', checkForm);

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);


// function resizeRegistros() {
//     var letrasNome = ((nome.value).split(' ')).length 
//     var tamanhoNome = (nome.value).length
    
//    calc = 60 + tamanhoNome / 1.5
    
//   registroBox.style.height = registroBox.offsetHeight + calc + "px";
//} INUTILIZADO MAS GUARDADO PARA INSERÇÃO DA LISTAGEM FÍSICA (DIV DE ID #registros)
