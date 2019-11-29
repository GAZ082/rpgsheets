"use strict";


let app = {};
app.template = {}
app.crunch = []

function init() {
  localStorage.setItem("jsonData", JSON.stringify(templates.whfrpg4e));
  app.template = JSON.parse(localStorage.getItem("jsonData"));
  generateCrunch(app.template.sheet);
  generateForm(app.template.sheet);
  // updateSheet(app.crunch);
  //doCalculations(app.crunch);
}

function generateCrunch(template) {
  let crunch = {};
  template.section.forEach(section => {
    section.group.forEach(group => {
      group.field.forEach(field => {
        if (field.value.length == 1) {
          crunch[field.name] = characterData["sheet"][field.name];
        } else {
          for (let i = 0; i < field.value.length; i++) {
            if ((characterData["sheet"][field.name][i]) == null) {
              crunch[field.name + i] = field.value[i];
            } else {
              crunch[field.name + i] = characterData["sheet"][field.name][i];
            }
          }
        }
      });
    });
  });
  console.log("crunch: ", crunch);

  app.crunch = crunch
}

function generateForm(sheet) {
  let root = newSheet(sheet);
  sheet.section.forEach(section => {
    let nSection = newSection(section);
    section.group.forEach(group => {
      let nGroup = newGroup(group);
      group.field.forEach(field => {
        let nField = newField(field);
        nField.flexDirection = group.orientation;
        nGroup.appendChild(nField);
      });
      nSection.appendChild(nGroup);
    });
    root.appendChild(nSection);
  });
}

function updateSheet(crunch) {
  Object.keys(crunch).forEach(field => {
    if (field.includes("+") || field.includes("*")) { //calculation field
      document.getElementsByName(field)[0].value = doSingleCalc(crunch[field], crunch)
    } else {
      document.getElementsByName(field)[0].value = crunch[field];
    }
  });
}

function doSingleCalc(field, crunch) {
  if (field.includes("+")) {
    let sum = 0;
    field.split("+").forEach(element => {
      sum += crunch[element];
    });
    return sum
  }
}

function newSheet(config) {
  let sheet = document.getElementById("character")
  let c = "";
  let vc = 100 / config.columns;
  for (let i = 0; i < config.columns; i++) {
    c += vc + "vw ";
  }
  sheet.style.gridTemplateColumns = c;
  return sheet;
}

function newSection(config) {
  let section = document.createElement("div");
  let title = document.createElement("div");
  title.className = "title";
  title.title = config.label.value;
  title.innerHTML = config.label.value;
  title.style.textTransform = config.label.format;
  title.style.fontFamily = config.label.font;
  section.appendChild(title);
  let row = config.row.split("-");
  let col = config.col.split("-");
  section.title = config.name;
  section.className = "section";
  section.style.gridColumnStart = col[0];
  section.style.gridColumnEnd = Number(col[1]) + 1;
  section.style.gridRowStart = row[0];
  section.style.gridRowEnd = Number(row[0]) + 1;
  return section;
}

function newGroup(config) {
  let group = document.createElement("div");
  group.style.flexDirection = config.orientation;
  group.className = "group";
  return group;
}

function addButton() {
  let button = document.createElement("input");
  button.type = "submit";
  button.name = "save";
  button.text = "save";
  button.onclick = saveData;
  //  sheet.appendChild(button);
}

function newField(config) {
  let fieldGroup = document.createElement("div");
  fieldGroup.className = "fieldGroup";
  fieldGroup.style.flexDirection = config.orientation;
  if (config.label.position == "first") {
    fieldGroup.appendChild(newLabel(config.label))
  }
  let c = 0;
  config.value.forEach(element => {
    let field = document.createElement("input");
    field.value = element;
    field.type = config.type;

    if (field.type == "number") {
      field.name = config.name + c;
    } else {
      field.name = config.name
    }
    field.style.flexGrow = config.size;
    field.size = config.size;
    field.style.width = config.size + "rem";
    field.maxLength = config.size;
    field.className = "field";
    field.onchange = () => {
      if (field.value != "") {
        app.crunch[field.name] = Number(document.getElementsByName(field.name)[0].value);
        updateSheet(app.crunch);
      }
    }
    fieldGroup.appendChild(field);
    c++
  });
  if (config.label.position == "last") {
    fieldGroup.appendChild(newLabel(config.label))
  }
  return fieldGroup;
}



function newLabel(config) {
  let label = document.createElement("label");
  label.innerHTML = config.value;
  label.style.textTransform = config.format;
  label.style.flexGrow = config.size;
  return label;
}

function newLabelResult(value) {
  let label = document.createElement("label");
  label.className = "result";
  label.innerHTML = value;
  return label;
}


window.onload = init;