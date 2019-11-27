"use strict";


let app = {};
app.template = {}
app.crunch = []

function init() {
  localStorage.setItem("jsonData", JSON.stringify(templates.whfrpg4e));
  app.template = JSON.parse(localStorage.getItem("jsonData"));
  app.crunch = generateCrunch(app.template.sheet);
  doSingleCalculations(app.crunch);
  generateForm(app.template.sheet);
}

function generateForm(sheet) {
  let root = newSheet(sheet);
  sheet.section.forEach(section => {
    let nSection = newSection(section);
    section.field.forEach(field => {
      let nField = newField(field)
      nSection.appendChild(nField);
    });
    root.appendChild(nSection);
  });
}

function generateCrunch(template) {
  let data = {};
  template.section.forEach(section => {
    section.field.forEach(field => {
      if (field.type == "number") {
        data[field.name] = field.value;
      }
    });
  });
  return data
}

function doSingleCalculations(database) {
  for (const i in database) {
    let c = 0;
    database[i].forEach(element => {
      if (typeof (element) == "string") {
        database[i][c] = doSingleCalc(element, database);
      };
      c++
    });
  }
}


function doSingleCalc(field, database) {
  if (field.includes("+")) {
    let sum = 0;
    field.split("+").forEach(element => {
      let name = element.match(/.+\[/gi)[0].replace("[", "");
      let index = element.match(/\[[0-9]+?\]/gi)[0].replace("[", "").replace("]", "");
      sum += database[name][index];
    });
    return sum
  }
}


function pepe() {
  alert('click');
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

function addButton() {
  let button = document.createElement("input");
  button.type = "submit";
  button.name = "save";
  button.text = "save";
  button.onclick = saveData;
  //  sheet.appendChild(button);

}

function newField(config) {
  let group = document.createElement("div");
  group.className = "group";
  group.style.flexDirection = config.orientation;
  if (config.label.position == "first") {
    group.appendChild(newLabel(config.label))
  }
  config.value.forEach(element => {
    let field = document.createElement("input");
    field.value = element;
    field.name = config.name;
    field.type = config.type;
    field.style.flexGrow = config.size;
    // field.size = config.size;
    field.size = config.size;
    field.style.width = config.size + "rem";
    field.maxLength = config.size;
    field.className = "field";
    group.appendChild(field);
  });
  if (config.label.position == "last") {
    group.appendChild(newLabel(config.label))
  }
  return group;
}

function newLabel(config) {
  let label = document.createElement("label");
  label.innerHTML = config.value;
  label.style.textTransform = config.format;
  label.style.flexGrow = config.size;
  // label.style.width = config.size + 'rem';
  return label;
}

function newLabelResult(value) {
  let label = document.createElement("label");
  label.className = "result";
  label.innerHTML = value;
  return label;
}


window.onload = init;