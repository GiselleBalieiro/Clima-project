let chave = "1f9cb6cb96a7411225cbe3ac49882675";

function resetarPagina() {
  document.querySelector(".cidade").innerHTML = "";
  document.querySelector(".temperatura").innerHTML = "";
  document.querySelector(".icon-tempo").src = "";
  document.querySelector(".descricao").innerHTML = "";
  document.querySelector(".umidade").innerHTML = "";
  document.querySelector(".input-cidade").value = "";
  document.getElementById("icon-title").href =
    "./assets/brightness-high-fill.svg";
}

function colocarNaTela(dados) {
  document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;

  document.querySelector(".temperatura").innerHTML =
    Math.floor(dados.main.temp) + "°C";

  document.querySelector(".descricao").innerHTML = dados.weather[0].description;

  document.querySelector(".icon-tempo").src =
    "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";

  document.querySelector(".umidade").innerHTML =
    "Umidade: " + dados.main.humidity + "%";

  document.querySelector(".input-cidade").value = "";

  document.getElementById("icon-title").href =
    "https://openweathermap.org/img/wn/" + dados.weather[0].icon + ".png";
}

async function buscarCidade(cidade) {
  let dados = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cidade +
      "&appid=" +
      chave +
      "&lang=pt_br&units=metric"
  )
    .then((resposta) => {
      if (!resposta.ok) {
        throw new console.error("Cidade não encontrada!");
      }
      return resposta.json();
    })

    .catch((erro) => {
      console.error(erro);
      document.querySelector(".input-cidade").value = "";
      resetarPagina();
      buscarLocalizacao();
    });

  if (dados) {
    colocarNaTela(dados);
  }
}

function cliqueiNoBotao() {
  let cidade = document.querySelector(".input-cidade").value;

  buscarCidade(cidade);
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    cliqueiNoBotao();
  }
});

function buscarLocalizacao() {
  navigator.geolocation.getCurrentPosition(function (position) {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        buscarCidade(data.address.city);
      })
      .catch((error) => console.error(error));
  });
}

buscarLocalizacao();

