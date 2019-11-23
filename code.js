function init() {
  localStorage.setItem("jsonData", JSON.stringify(templates.whfrpg4e));
  let character = JSON.parse(localStorage.getItem("jsonData"));
  generateForm(character);
}

function generateForm(character) {
  let sheet = document.getElementById("character")
  for (const section in character.sheet) {
    console.log(section);
    let sectionDiv = document.createElement("div");
    sectionDiv.id = section;
    for (const field in character.sheet[section]) {
      let f = character.sheet[section][field];
      let container = document.createElement("div");
      container.className = "field";
      container.appendChild(createInput(field, f));
      container.appendChild(createLabel(f));
      sectionDiv.appendChild(container);
    }
    sheet.appendChild(sectionDiv);
  }
  let button = document.createElement("input");
  button.type = "submit";
  button.name = "save";
  button.text = "save";
  button.onclick = saveData;
  //  sheet.appendChild(button);
  console.log(sheet);
}


function saveData() {

}

function createInput(field, f) {
  let input = document.createElement("input");
  input.name = field;
  input.type = f.type;
  input.size = f.size;
  input.style.width = f.size + "rem";
  input.maxLength = f.size;
  return input;
}

function createLabel(f) {
  let label = document.createElement("label");
  label.innerHTML = f.label;
  return label;
}




window.onload = init;