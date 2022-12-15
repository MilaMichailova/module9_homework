document.addEventListener("DOMContentLoaded", onContentLoaded);

let buttonNode;
let inputNode1;
let inputNode2;
let resultNode;
let lastSessionKey = "lastSession";

function onContentLoaded() {
  buttonNode = document.getElementById("buttonId");
  inputNode1 = document.getElementById("inputId1");
  inputNode2 = document.getElementById("inputId2");
  resultNode = document.getElementById("resultId");
  buttonNode.addEventListener("click", sendRequest);

  loadLastSession();
}

function sendRequest() {
  let inputValue1 = Math.round(inputNode1.value);
  let inputValue2 = Math.round(inputNode2.value);

  if (
    (inputValue1 < 1 || inputValue1 > 10) &&
    (inputValue2 < 1 || inputValue2 > 10)
  ) {
    resultNode.innerHTML = "";
    resultNode.innerHTML = "«Номер страницы и лимит вне диапазона от 1 до 10»";
  } else if (inputValue1 < 1 || inputValue1 > 10) {
    resultNode.innerHTML = "";
    resultNode.innerHTML = "«Номер страницы вне диапазона от 1 до 10»";
  } else if (inputValue2 < 1 || inputValue2 > 10) {
    resultNode.innerHTML = "";
    resultNode.innerHTML = "Лимит вне диапазона от 1 до 10»";
  } else if (
    inputValue1 >= 1 &&
    inputValue1 <= 10 &&
    inputValue2 >= 1 &&
    inputValue2 <= 10
  ) {
    resultNode.innerHTML = "";

    fetch(
      `https://picsum.photos/v2/list?page=${inputValue1}&limit=${inputValue2}`
    )
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        showImages(res);
        localStorage.setItem(lastSessionKey, JSON.stringify(res));
      })
      .catch(() => {
        console.log("error");
      });
  }
}

function loadLastSession() {
  let lastSessionImages = localStorage.getItem(lastSessionKey);

  if (lastSessionImages !== null) {
    showImages(JSON.parse(lastSessionImages));
  }
}

function showImages(imagesArray) {
  let cards = "";

  imagesArray.forEach((item) => {
    console.log(item);
    cards += `
                    <div class="card">
                    <img
                        src="${item.download_url}"
                        class="img"
                    >
                    </div>
                `;
  });

  resultNode.innerHTML = cards;
}
