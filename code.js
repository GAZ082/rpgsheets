"use strict";

function init() {
  localStorage.setItem("jsonData", JSON.stringify(templates.whfrpg4e));
  let character = JSON.parse(localStorage.getItem("jsonData"));
  generateForm(character);
}

function generateForm(template) {
  let sheet = document.getElementById("character")
  setupSheet(sheet, template.configuration);
  for (const section in template.sheet) {
    let sectionDiv = setupSection(section, template.sheet[section]["position"]);
    for (const field in template.sheet[section]) {
      if (field != "position") {
        let f = template.sheet[section][field];
        let container = document.createElement("div");
        if (f["labelPosition"] == "first") {
          container.appendChild(createLabel(f));
        }
        container.className = "field";
        for (let v = 0; v < f["value"].length; v++) {
          console.log(f["value"]);
          container.appendChild(createInput(field, f, f["value"][v]));
        }
        if (f["labelPosition"] == "last") {
          container.appendChild(createLabel(f));
        }

        sectionDiv.appendChild(container);
      }
    }
    sheet.appendChild(sectionDiv);
  }

  console.log(sheet);
}


function saveData() {

}

function setupSheet(sheet, config) {
  console.log(config.rows);
  let r = "";
  let c = "";
  let vr = 100 / config.rows;
  let vc = 100 / config.columns;
  for (let i = 0; i < config.rows; i++) {
    //r += vr + "% ";
    r += "auto ";
  }
  for (let i = 0; i < config.columns; i++) {
    //c += vc + "% ";
    c += "auto ";
  }
  sheet.style.gridTemplateRows = r;
  sheet.style.gridTemplateColumns = c;
  console.log(c);
}

function setupSection(name, position) {
  let section = document.createElement("div");
  let row = position.row.split("-");
  let col = position.col.split("-");
  section.title = name;
  section.className = "section";
  section.style.gridColumnStart = col[0];
  section.style.gridColumnEnd = col[1];
  section.style.gridRowStart = row[0];
  section.style.gridRowEnd = row[1];
  return section;
}

function addButton() {
  let button = document.createElement("input");
  button.type = "submit";
  button.name = "save";
  button.text = "save";
  button.onclick = saveData;
  //  sheet.appendChild(button);

}

function createInput(field, f, value) {
  let input = document.createElement("input");
  input.value = value;
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
  label.style.textTransform = f.labelFormat;
  return label;
}

window.onload = init;