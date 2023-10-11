const MENSAGEM = "msg";
const STATUS = "status";
const SUCESSO = "success";
const ERRO = "error";

function seSucesso() {
  // setTimeout(() => {
  //   window.location.reload();
  // }, 900);
}

function seErro() {
  console.log("Fasma .LDA informa: erro");
}

const myCSS = `
.spinner {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 3.8px solid #474bff;
    animation: spinner-bulqg1 0.8s infinite linear alternate,
    spinner-oaa3wk 1.6s infinite linear;
 }
 
.load{
    display: flex;
    align-items: center;
    gap:10px;
    justify-content:center;
}

 @keyframes spinner-bulqg1 {
    0% {
       clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
    }
 
    12.5% {
       clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
    }
 
    25% {
       clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
    }
 
    50% {
       clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
    }
 
    62.5% {
       clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
    }
 
    75% {
       clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
    }
 
    100% {
       clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
    }
 }
 
 @keyframes spinner-oaa3wk {
    0% {
       transform: scaleY(1) rotate(0deg);
    }
 
    49.99% {
       transform: scaleY(1) rotate(135deg);
    }
 
    50% {
       transform: scaleY(-1) rotate(0deg);
    }
 
    100% {
       transform: scaleY(-1) rotate(-135deg);
    }
 }
`;

document.head.appendChild(document.createElement("style")).innerText = myCSS;

// Criação do elemento div
const alertDiv = document.createElement("div");

alertDiv.role = "alert";
// alertDiv.innerHTML = "This is a danger dismissible alert — check it out!" +
//                      "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";

// Local onde o elemento div será adicionado (após o botão de "Registar")
// const registarBtn = document.querySelector(".btn.btn-primary.mb-2.d-grid.w-100");

function capturarIDdoFormulario(event) {
  // Evita o comportamento padrão de envio do formulário
  if ((form = document.getElementById(event.target.id))) {
    event.preventDefault();

    form = document.getElementById(event.target.id);

    const btn_submit = form.querySelector('button[type="submit"]');
    btn_submit.disabled = true;
    old = btn_submit.innerHTML;
    btn_submit.innerHTML =
      '<div class="load"><div class="spinner"></div> Processando...</div>';

    //pega todos os dados do formulario e coloca na variavel do tipo FormData
    var dados = new FormData(form);
    //faz a requisicao com o fetch
    fetch(form.action, {
      method: form.method,
      body: dados,
    })
      .then((res) => {
        //em caso de erro
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then((data) => {
        // console.log("data: "+data[STATUS]+" | "+data[MENSAGEM]);
        //pegar os parametros necessarios caso for sucesso
        if (data[STATUS] == ERRO)
          alertDiv.className = "alert alert-danger alert-dismissible";
        else {
          form.reset();
          alertDiv.className = "alert alert-success alert-dismissible";
          seSucesso();
        }
          alertDiv.innerHTML = data[MENSAGEM];

        // Adiciona a nova linha à tabela
      })
      .catch((error) => {
        console.log(error);
        alertDiv.innerHTML = error;
        alertDiv.className = "alert alert-warning alert-dismissible";
        seErro();
      })
      .finally(() => {
        alertDiv.innerHTML +=
          "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>";
        // registarBtn.insertAdjacentElement("afterend", alertDiv);
        btn_submit.insertAdjacentElement("afterend", alertDiv);
        btn_submit.innerHTML = old;
        btn_submit.disabled = false;
      });
  }
}

// Adiciona um ouvinte de evento (event listener) para cada formulário na página
const forms = document.getElementsByTagName("form");
for (let i = 0; i < forms.length; i++) {
  // alert("ID do formulário enviado:"+forms[i].id);

  forms[i].addEventListener("submit", capturarIDdoFormulario);
}

var oldimg = "";

function sudo_showImage(origem, destino) {
  var imagem = document.querySelector("input[name=" + origem + "]").files[0];
  var preview = document.querySelector("#" + destino);

  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (imagem) {
    reader.readAsDataURL(imagem);
  } else {
    document.querySelector("#" + destino).src =
      "assets/img/avatars/JoseArturKassala.jpg";
  }
}
