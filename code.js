"use strict";


let app = {};
app.template = {}
app.crunch = []

function init() {
  localStorage.setItem("jsonData", JSON.stringify(templates.whfrpg4e));
  app.template = JSON.parse(localStorage.getItem("jsonData"));
  generateCrunch(app.template.sheet);
  //doCalculations(app.crunch);
  generateForm(app.template.sheet);
  // updateSheet(app.crunch[1]);

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
  doCalculations(app.crunch);
}

function generateCrunch(template) {
  let crunch = {};
  let values = {};
  template.section.forEach(section => {
    section.group.forEach(group => {
      group.field.forEach(field => {
        if (field.type == "number") {
          let index = 0
          field.value.forEach(ivalue => {
            if (typeof (ivalue) == "number") {
              crunch[field.name + index] = ivalue;
              values[field.name + index] = ivalue;
            } else {
              values[field.name + index] = 0;
              crunch[field.name + index] = ivalue
            }
            index++
          });
        }
      });
    });
  });
  app.crunch = [crunch, values]
}

function doCalculations(database) {
  Object.keys(database[0]).forEach(field => {
    if (typeof (database[0][field]) == 'string') {
      database[1][field] = doSingleCalc(database[0][field], database[1]);
    } else {
      database[1][field] = Number(document.getElementsByName([field])[0].value);
    }
  });

}

function updateSheet(crunch) {
  Object.keys(crunch).forEach(field => {
    document.getElementsByName(field)[0].value = crunch[field];
  });
}

function doSingleCalc(field, database) {
  if (field.includes("+")) {
    let sum = 0;
    field.split("+").forEach(element => {
      let name = element.match(/[a-z]+/gi)[0];
      let index = element.match(/[0-9]+/gi)[0];

      sum += database[name + index];
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
    field.name = config.name + c;
    field.type = config.type;
    field.style.flexGrow = config.size;
    // field.size = config.size;
    field.size = config.size;
    field.style.width = config.size + "rem";
    field.maxLength = config.size;
    field.className = "field";
    field.onchange = () => {
      if (field.value != "") {
        app.crunch[1][field.name] = Number(document.getElementsByName(field.name)[0].value);
        doCalculations(app.crunch);
        updateSheet(app.crunch[1]);
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