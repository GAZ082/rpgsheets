'use strict';

function loadForm(xml, app) {
  return new Promise(function (resolve, reject) {
    resolve(generateForm(xml, app));
  });
}

function generateForm(xml, app) {
  let root = newSheet(xml);
  xml.querySelectorAll("section").forEach(section => {
    let nSection = newSection(section);
    section.querySelectorAll("group").forEach(group => {
      let nGroup = newGroup(group)
      group.querySelectorAll("field").forEach(field => {
        let type = getSelectorValue(field, "type");
        let nField;
        if (type == "combo") {
          nField = newCombo(field, app);
          nField.flexDirection = group.querySelector("orientation").innerHTML;
          nGroup.appendChild(nField);
        } else {
          nField = newField(field, app);
          nField.flexDirection = group.querySelector("orientation").innerHTML;
          nGroup.appendChild(nField);
          registerField(field, app);
        }
      });
      nSection.appendChild(nGroup);
    });
    root.appendChild(nSection);
  });
  xml.querySelectorAll("calculations>calc").forEach(calc => {
    app.calcTemplate[calc.getAttribute("name")] = calc.innerHTML
  });
  console.log(app);
}



function newSheet(xml) {
  let sheet = document.getElementById('character');
  let c = '';
  let columns = xml.querySelectorAll("sheet>configuration>columns");
  let vc = 100 / columns;
  for (let i = 0; i < columns; i++) {
    c += vc + 'vw ';
  }
  sheet.style.gridTemplateColumns = c;
  return sheet;
}

function newSection(template) {
  let section = document.createElement('fieldset');
  let title = document.createElement('legend');
  // section.style.height = getSelectorValue(template, "height") + "rem";
  title.className = 'title';
  title.title = getSelectorValue(template, "label>value");
  title.innerHTML = getSelectorValue(template, "label>value");
  title.style.textTransform = getSelectorValue(template, "label>format");
  section.appendChild(title);
  let row = getSelectorValue(template, "row").split('-');
  let col = getSelectorValue(template, "col").split('-');
  section.title = getSelectorValue(template, "label>value");
  section.className = 'section';
  section.style.gridColumnStart = col[0];
  section.style.gridColumnEnd = Number(col[1]) + 1;
  section.style.gridRowStart = row[0];
  section.style.gridRowEnd = Number(row[1]) + 1;
  // section.style.gridRowEnd = Number(row[0]) + 1;
  return section;
}

function newGroup(template) {
  let group = document.createElement('div');
  group.style.flexDirection = getSelectorValue(template, "orientation");
  group.className = 'group';
  return group;
}

function newField(template, app) {
  let fieldName = template.getAttribute("name");
  let fieldGroup = document.createElement('div');
  fieldGroup.className = 'fieldGroup';
  fieldGroup.style.flexDirection = getSelectorValue(template, "orientation")
  fieldGroup.style.flexGrow = getSelectorValue(template, "size");
  if (getSelectorValue(template, "label>position") == 'first') {
    fieldGroup.appendChild(newLabel(template));
  }
  let qValues = template.querySelectorAll("values>value").length;
  let v = 0;
  template.querySelectorAll("values>value").forEach(value => {
    let field;
    field = document.createElement('input');
    if (qValues > 1) {
      field.name = fieldName + v;
      if (v == qValues - 1) {//last one in the row/column is result
        field.className = 'result';
        field.disabled = true;
        field.style.pointerEvents = "none";
      } else {
        field.className = 'field';
      }
    } else {
      field.name = fieldName;
      field.className = 'field';
    }
    field.style.width = "100%";
    field.maxLength = getSelectorValue(template, "max_chars");
    field.onchange = () => {
      if (value.innerHTML != null) {
        app.data[field.name] = Number(
          document.getElementsByName(field.name)[0].value
        );
        doCalculations(app);
      }
    };
    field.onpointerdown = () => {
      field.value = app.data[fieldName]
    };
    field.onpointerup = () => {
      doCalculations(app);
    };
    field.onblur = () => {
      app.input[fieldName] = field.value;
      doCalculations(app); //with all the mods and calcs
    };
    fieldGroup.appendChild(field);
    v++;
  });

  if (getSelectorValue(template, "label>position") == 'last') {
    fieldGroup.appendChild(newLabel(template));
  }
  return fieldGroup;
}

function newLabel(template) {
  let label = document.createElement('label');
  label.innerHTML = getSelectorValue(template, "label>value");
  label.style.textTransform = getSelectorValue(template, "label>format");
  label.style.width = "100%"
  return label;
}

function newCombo(template, app) {
  let fieldGroup = document.createElement('div');
  fieldGroup.className = 'fieldGroup';
  fieldGroup.style.flexDirection = getSelectorValue(template, "orientation")
  fieldGroup.style.flexGrow = getSelectorValue(template, "size");
  let combo = document.createElement('select');
  if (getSelectorValue(template, "label>position") == 'first') {
    fieldGroup.appendChild(newLabel(template));
  }
  fieldGroup.appendChild(combo);
  template.querySelectorAll("option").forEach(item => {
    let nOption = document.createElement("option");
    nOption.value = item.getAttribute("name");
    nOption.innerHTML = item.getAttribute("name");
    combo.appendChild(nOption);
  });
  if (getSelectorValue(template, "label>position") == 'last') {
    fieldGroup.appendChild(newLabel(template));
  }
  combo.style.width = "100%"
  combo.onchange = () => {
    Object.keys(app.calc).forEach(element => {//reset all mods
      if (element.substring(0, 4) == "mod_") {
        app.calc[element] = 0
      }
    });

    template.querySelectorAll("option").forEach(item => {
      console.log(item);
      if (item.getAttribute("name") == combo.value) {
        item.querySelectorAll("mod").forEach(item => {
          app.calc["mod_" + item.getAttribute("name")] = Number(item.innerHTML);
        });
      }
    });
    doCalculations(app)
    console.log(app);

  };
  return fieldGroup;
}

function newLabelResult(value) {
  let label = document.createElement('label');
  label.className = 'result';
  label.innerHTML = value;
  return label;
}

function getSelectorValue(element, selector) {
  return element.querySelector(selector).innerHTML
}

function registerField(field, app) {
  let fieldName = field.getAttribute("name");
  app.data[fieldName] = 0;
  app.input[fieldName] = 0;
  if (getSelectorValue(field, "type") == "number") {
    app.calc[fieldName] = 0;
    app.calc["mod_" + fieldName] = 0;
  }

}
