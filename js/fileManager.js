var lista = [];

function handleFile() {
  const input = document.getElementById('file-input');

  if (!input.files || input.files.length === 0) {
    alert('Selecione um arquivo JSON.');
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const jsonData = JSON.parse(e.target.result);
      registroPagina = document.getElementById("file-content"); 
      uploadPagina = document.getElementById("upload-page"); 
      registroPagina.style.width = '350px';   // DANDO TAMANHO À PÁGINA COM OS REGISTROS
      spacementInput = document.getElementById("input-spacement");
      spacementInput.style.display = "flex";
      uploadPagina.style.marginTop = '60px';

      displayEmployeeInfo(jsonData);
    } catch (error) {
      alert("Erro no formato de arquivo JSON!");
    }
  };

  reader.readAsText(file);
}

function displayEmployeeInfo(data) {
  const employeeInfoContainer = document.getElementById('employeeInfo');
  employeeInfoContainer.innerHTML = '';

  data.forEach(employee => {
    const employeeDiv = document.createElement('div');
    employeeDiv.className = 'employee-container'; 

    for (const key in employee) {
      if (employee.hasOwnProperty(key)) {
        const value = employee[key];

        const registroDiv = document.createElement('div'); 
        registroDiv.className = 'colab-fields'; 

        if (key === 'Nome' || key === 'Matricula 1') {
          registroDiv.classList.add('editable');

          registroDiv.addEventListener('click', function () {
            makeEditable(registroDiv);
          });
        }
        
        funcCount = 0;
        if(key === 'Nome' || key === 'Matricula 1'){
          registroDiv.innerHTML += `&#9998; ${key}: ${value}`;
          if(key === 'Matricula 1'){
            const linha = document.createElement('div');
            linha.className = 'field-spacement';
            employeeInfoContainer.appendChild(linha);
          }
        }else if(key === 'PIS'){
          registroDiv.innerHTML += `${key}: ${value}`;
         }
        employeeDiv.appendChild(registroDiv);
      }
    }

    employeeInfoContainer.appendChild(employeeDiv);
    
  });
  const salvarButton = document.createElement('button');
  salvarButton.textContent = 'Salvar alterações';
  salvarButton.className = 'save-button';
  salvarButton.addEventListener('click', function () {
    salvarInformacoes();
  });
  this.uploadPagina.appendChild(salvarButton);
}

function makeEditable(element) {
  const text = element.textContent.split(': ')[1];
  const input = document.createElement('input');
  input.value = text;

  input.addEventListener('blur', function () {
    element.textContent = `${element.textContent.split(': ')[0]}: ${(input.value).toUpperCase()}`;
  });

  element.textContent = `${element.textContent.split(': ')[0]}: `;
  element.appendChild(input);
  input.focus();
}

function salvarInformacoes() {
  lista = [];
  const employeeInfoContainer = document.getElementById('employeeInfo');
  const employeeDivs = employeeInfoContainer.getElementsByClassName('employee-container');

  for (let i = 0; i < employeeDivs.length; i++) {
    const registroDivs = employeeDivs[i].getElementsByClassName('colab-fields');
    const employeeObject = {};

    for (let j = 0; j < registroDivs.length; j++) {
      const keyValuePair = registroDivs[j].textContent.split(':');
      
      if (keyValuePair.length === 2) {
        const key = keyValuePair[0].trim();
        const value = keyValuePair[1].trim();
        employeeObject[key] = value;
      }
    }

    lista.push(employeeObject);

  }
  const downloadButton = document.getElementById("changes-download");
  downloadButton.style.display = "initial";
  console.log(lista);
}

function downloadResultados(){ // EXECUTAR DOWNLOAD
  console.log(lista);

  var jsonData = (JSON.stringify(lista).replace(/},/g, '},\r').replace(/✎ /g, '')) // TRANSFORMA EM JSON STRING
  console.log('CONTEÚDO BAIXADO:\n\n' + jsonData);

  var blob = new Blob([jsonData], { type: 'application/json' });
  var a = document.createElement('a'); // CRIANDO ÂNCORA
  a.href = window.URL.createObjectURL(blob);
  a.download = 'rep_colaborador.json'; // NOME DO ARQUIVO
  
  document.body.appendChild(a); //ADICIONAR ÂNCORA
  a.click();
  document.body.removeChild(a); // REMOÇÃO DE ÂNCORA
}

