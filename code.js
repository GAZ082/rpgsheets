function init() {
  localStorage.setItem("jsonData", JSON.stringify(templates.whfrpg4e));
  let characterData = JSON.parse(localStorage.getItem("jsonData"));
  generateForm(characterData);
}

function saveData() {
  for (i in document.getElementById("character")) {
    console.log(i);
  }
}

function generateForm(characterData) {
  let sheet = document.getElementById("character")
  for (const field in characterData.basics) {
    let input = document.createElement("input");
    input.name = field;
    input.type = characterData.basics[field].type;
    sheet.appendChild(input);
  }
  let button = document.createElement("input");
  button.type = "submit";
  button.name = "save";
  button.text = "save";
  button.onclick = saveData;
  sheet.appendChild(button);
}

window.onload = init;