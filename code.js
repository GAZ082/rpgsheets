"use strict";

function init() {
  localStorage.setItem("jsonData", JSON.stringify(templates.whfrpg4e));
  let character = JSON.parse(localStorage.getItem("jsonData"));
  generateForm(character.sheet);
  //generateNumberTable(character);
}

function generateForm(sheet) {
  let root = newSheet(sheet);
  // console.log(sheet);

  sheet.section.forEach(section => {
    let nSection = newSection(section);
    section.field.forEach(field => {
      let nField = newField(field)
      nSection.appendChild(nField);
    });
    root.appendChild(nSection);
  });

  // for (const son in sheet) {
  //   let newSection = newSection(sheet.section);
  //   const element = sheet[section];
  // }



  // let field = sheet.section[0].field[0]
  // // section.appendChild(newField(field));
  // root.appendChild(newField(field));



  // createInput(field, group)

}

function generateNumberTable(template) {
  for (const section in template.sheet) {
    for (const field in template.sheet[section]) {
      // for (const value in template.sheet[section][field]) {
      console.log(template.sheet[section].group.field);
      // }
    }
  }

}

function pepe() {
  alert('click');
}

function newSheet(config) {
  let sheet = document.getElementById("character")
  let r = "";
  let c = "";
  let vr = 100 / config.rows;
  let vc = 100 / config.columns;
  // for (let i = 0; i < config.rows; i++) {
  //   // r += vr + "% ";
  //   //r += "5% ";
  //   r += "auto ";
  // }
  for (let i = 0; i < config.columns; i++) {
    c += vc + "vw ";
    //c += "auto ";
  }
  sheet.style.gridTemplateRows = r;
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
  section.style.gridRowEnd = Number(row[1]) + 1;
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