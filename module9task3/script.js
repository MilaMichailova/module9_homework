document.addEventListener("DOMContentLoaded", onContentLoaded);

let buttonNode;
let inputNode;
let resultNode;

function onContentLoaded() {
  buttonNode = document.getElementById("buttonId");
  inputNode = document.getElementById("inputId");
  resultNode = document.getElementById("resultId");
  buttonNode.addEventListener("click", sendRequest);
}

function sendRequest() {
  let xhr = new XMLHttpRequest();
  let inputValue = inputNode.value;
  inputValue = Math.round(inputValue);

  if (inputValue >= 1 && inputValue <= 10) {
    xhr.open("GET", `https://picsum.photos/v2/list?limit=${inputValue}`);

    xhr.onload = function () {
      if (xhr.status != 200) {
        console.log("Статус ответа: ", xhr.status);
      } else {
        let response = JSON.parse(xhr.response);
        console.log(response);
        showResult(response);
      }
    };

    xhr.send();
  } else {
    resultNode.innerHTML = "число вне диапазона от 1 до 10";
  }
}

function showResult(response) {
  let cards = "";
  response.forEach((item) => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });

  resultNode.innerHTML = cards;
}
