nome = document.getElementById("name-input");
pis = document.getElementById("pis-input");
matricula = document.getElementById("matricula-input");
submitButton = document.getElementById("submit-button");
downloadButton = document.getElementById("download-button");
registroBox = document.getElementById("registros");

let registroCounter = 1; // Inicie o contador

function resizeRegistros() {
    var letrasNome = ((nome.value).split(' ')).length
    var tamanhoNome = (nome.value).length
    
    calc = 60 + tamanhoNome / 1.5
    
   registroBox.style.height = registroBox.offsetHeight + calc + "px";
}


function pisCheck(pisInput){
   return /^[0-9]+$/.test(pisInput);	
}

function checkForm(){
   if(!pis.value || !matricula.value || !nome.value){   
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

var lista = []
function handleSubmit(event) {
    event.preventDefault();
    
    nome.value = (nome.value.toUpperCase()).trim()
    matricula.value = (matricula.value).trim()
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
    // Criar uma nova div para cada informação do registro
    const registroDiv = document.createElement("div");
    registroDiv.className = "registro-item";
    registroDiv.id = `regist-func${registroCounter}`;
    
    document.querySelector(".register-list").appendChild(registroDiv);
   
    registroPagina.style.width = '350px';    
    
    // Adicionar informações do registro à div
    registroDiv.innerHTML = `
        <p><strong>Nome:</strong> ${value.Nome}</p>
        <p><strong>PIS:</strong> ${value.PIS}</p>
        <p><strong>Matrícula:</strong> ${value["Matricula 1"]}</p>
        <button class="remove-button" onclick="removeRegistro('${registroDiv.id}')">X</button>
    `;
    // Adicionar a nova div à lista de registros
    registroDiv.style.width = '320px'; 
}
 


function removeRegistro(registroId) {
    const registroDiv = document.getElementById(registroId);
    registroDiv.remove();
    
    const registroContainer = document.querySelector('.register-list');

if (registroContainer && registroContainer.children.length === 0) {
    registroPagina = document.getElementById("register-page");
    registroPagina.style.width = '0';
} 
}

 
function downloadResultados(){
    console.log(lista);

    var jsonData = JSON.stringify(this.lista);
    console.log(jsonData);

    var blob = new Blob([jsonData], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'rep_colaborador.json';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}




pis.addEventListener('input', checkForm);
matricula.addEventListener('input', checkForm);
nome.addEventListener('input', checkForm);

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
