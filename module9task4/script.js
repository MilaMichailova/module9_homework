document.addEventListener("DOMContentLoaded", onContentLoaded);

let buttonNode;
let inputNode1;
let inputNode2;
let resultNode;

function onContentLoaded() {
  buttonNode = document.getElementById("buttonId");
  inputNode1 = document.getElementById("inputId1");
  inputNode2 = document.getElementById("inputId2");
  resultNode = document.getElementById("resultId");
  buttonNode.addEventListener("click", sendRequest);
}

function sendRequest() {
  let inputValue1 = Math.round(inputNode1.value);
  let inputValue2 = Math.round(inputNode2.value);

  if (
    inputValue1 >= 100 &&
    inputValue1 <= 300 &&
    inputValue2 >= 100 &&
    inputValue2 <= 300
  ) {
    resultNode.innerHTML = "";

    fetch(`https://picsum.photos/${inputValue1}/${inputValue2}`)
      .then((response) => {
        let cards = `
                    <div class="card">
                    <img
                        src="${response.url}"
                        class="card_img"
                    >
                    </div>
                `;
        resultNode.innerHTML = cards;
      })
      .catch(() => {
        console.log("error");
      });
  }
}
