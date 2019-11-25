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
    let sectionDiv = setupSection(section, template.sheet[section]["configuration"]);
    let group = document.createElement("div");
    group.className = "group";
    if (template.sheet[section]["configuration"].orientation == "column") {
      group.style.flexDirection = "column"
    }

    sectionDiv.appendChild(group);

    for (const field in template.sheet[section]["fields"]) {
      if (field != "configuration") {
        let f = template.sheet[section]["fields"][field];
        let container = document.createElement("div");
        if (f["labelPosition"] == "first") {
          container.appendChild(createLabel(f));
        }
        container.className = "field";
        if (f.orientation == "row") {
          container.style.flexDirection = "row";
        } else {
          container.style.flexDirection = "column";
        }
        let operator = f["value"][f["value"].length - 1]
        let total = 0;
        let valuesLenght = 0;
        if (operator == "+") {
          valuesLenght = f["value"].length - 1
          for (let v = 0; v < valuesLenght; v++) {
            total += f["value"][v]
          }
        } else {
          valuesLenght = f["value"].length
          total = false
        }
        for (let v = 0; v < valuesLenght; v++) {
          container.appendChild(createInput(field, f, f["value"][v]));
        }
        if (total) {
          container.appendChild(createLabelResult(total));
        }
        if (f["labelPosition"] == "last") {
          container.appendChild(createLabel(f));
        }
        group.appendChild(container);
      }
    }
    sheet.appendChild(sectionDiv);
  }
}


function pepe() {
  alert('click');

}

function setupSheet(sheet, config) {
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
}

function setupSection(name, config) {
  let section = document.createElement("div");
  let title = document.createElement("div");
  title.className = "title";
  title.title = name;
  title.innerHTML = config.label;
  title.style.textTransform = config.labelFormat;
  title.style.fontFamily = config.labelFont;
  section.appendChild(title);
  let row = config.row.split("-");
  let col = config.col.split("-");
  section.title = name;
  section.className = "section";
  section.style.gridColumnStart = col[0];
  section.style.gridColumnEnd = col[1];
  section.style.gridRowStart = row[0];
  section.style.gridRowEnd = row[1];
  section.style.flexDirection = row[1];
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

function createLabelResult(value) {
  let label = document.createElement("label");
  label.className = "result";
  label.innerHTML = value;
  return label;
}


window.onload = init;