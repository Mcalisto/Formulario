
function showDiv(){
  document.getElementById('radioDiv').style.display = 'block'
}
function showDiv2(){
  document.getElementById('radioDiv').style.display = 'none'
}


var botaoEnviar = document.querySelector("#Enviar");
botaoEnviar.addEventListener("click", function(event){

  event.preventDefault();

  var form = document.querySelector("#FormJSON");
  var dados = obterForm(form);
  var erros = validaForm(dados);

  console.log(form);
  console.log(dados);
  console.log(erros);
  if (erros.length > 0) {
      exibeMensagensDeErro(erros);

      return;
  }

  $.ajax({
  type: "POST",
  url: 'http://localhost:80',
  dataType: "json",
  data: {nome : JSON.stringify(dados.Nome), Telefone:JSON.stringify(dados.Telefone), Conheceu:JSON.stringify(dados.Conheceu),
  RedeSocial: [
    {Linkedin : JSON.stringify(dados.Link)},
    {Facebook:JSON.stringify(dados.Face)},
    {Instagram: JSON.stringify(dados.Insta)}] },
  sucess: function (data){
      alert('Sucess');
  },
  error: function () {
      alert('Error');
  },
});

});

function obterForm(form){

var dados = {
   Nome : form.Nome.value,
   Telefone : form.Telefone.value,
   Conheceu : form.Conheceu.value,
   Link : document.querySelector('#Linkedin').checked,
   Face : document.querySelector('#Facebook').checked,
   Insta : document.querySelector('#Instagram').checked,
}
return dados;
}


function validaForm(dados) {

    var erros = [];
    var fone = dados.Telefone;
    var regex = new RegExp('^(([0-9]{2}-[0-9]{8}))$');

    if (dados.Nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if (regex.test(fone) == false) {
        erros.push("O telefone não pode ser em branco ou conter letras e deve seguir o padrão 99-99999999.");
    }

    return erros;
}

function exibeMensagensDeErro(erros) {
    var ul = document.querySelector("#erros");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}
