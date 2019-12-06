'use strict';

let app = {};
app.template = {};
app.data = [];
app.calc = [];

function init() {
  // fetch('http://localhost/templates.js')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(err => console.error(err));
  localStorage.setItem('templateData', JSON.stringify(templates.whfrpg4e));
  app.template = JSON.parse(localStorage.getItem('templateData'));
  cacheData(app.template.sheet);
  generateForm(app.template.sheet);
  loadDataFromFile(app.data);
  doCalculations(app);
  exportToJsonFile(app.data);
}

function cacheData(template) {
  let data = {};
  let calc = [];
  template.section.forEach(section => {
    section.group.forEach(group => {
      group.field.forEach(field => {
        if (field.value.length == 1) {
          data[field.name] = characterData['sheet'][field.name];
        } else {
          for (let i = 0; i < field.value.length; i++) {
            if (characterData['sheet'][field.name][i] == null) {
              //formula
              let fv = field.value[i];
              calc.push({
                name: field.name + i,
                formula: fv.match(/[^:]*$/gi)[0],
                order: Number(fv.match(/^[0-9]+/)[0])
              });
              data[field.name + i] = '';
            } else {
              data[field.name + i] = characterData['sheet'][field.name][i];
            }
          }
        }
      });
    });
  });
  calc.sort((a, b) => a.order - b.order);
  app.data = data;
  app.calc = calc;
  console.log(app);
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

function loadDataFromFile(data) {
  Object.keys(data).forEach(dataField => {
    let formField;
    try {
      formField = document.getElementsByName(dataField)[0];
    } catch (error) {
      console.log('Field not found in template: ' + dataField);
    }
    formField.value = data[dataField];
  });
}

function doCalculations(data) {
  console.log('Doing calculations.');
  data.calc.forEach(dataField => {
    let formField;
    try {
      formField = document.getElementsByName(dataField.name)[0];
    } catch (error) {
      console.log('Calculation not found in template: ' + dataField);
    }
    formField.value = doSingleCalc(dataField.formula, app.data);
    app.data[formField.name] = Number(formField.value);
  });
}

function doSingleCalc(field, data) {
  if (field.includes('+')) {
    let sum = 0;
    field.split('+').forEach(element => {
      sum += data[element];
    });
    return sum;
  } else {
    let mult = 0;
    field.split('*').forEach(element => {
      mult *= data[element];
    });
    return mult;
  }
}

function newSheet(config) {
  let sheet = document.getElementById('character');
  let c = '';
  let vc = 100 / config.columns;
  for (let i = 0; i < config.columns; i++) {
    c += vc + 'vw ';
  }
  sheet.style.gridTemplateColumns = c;
  return sheet;
}

function newSection(config) {
  let section = document.createElement('fieldset');
  let title = document.createElement('legend');
  title.className = 'title';
  title.title = config.label.value;
  title.innerHTML = config.label.value;
  title.style.textTransform = config.label.format;
  title.style.fontFamily = config.label.font;
  section.appendChild(title);
  let row = config.row.split('-');
  let col = config.col.split('-');
  section.title = config.name;
  section.className = 'section';
  section.style.gridColumnStart = col[0];
  section.style.gridColumnEnd = Number(col[1]) + 1;
  section.style.gridRowStart = row[0];
  section.style.gridRowEnd = Number(row[0]) + 1;
  return section;
}

function newGroup(config) {
  let group = document.createElement('div');
  group.style.flexDirection = config.orientation;
  group.className = 'group';
  return group;
}

function saveData() {
  localStorage.setItem('characterData', JSON.stringify(app.data));
  alert('Saved!');
}

function newField(config) {
  let fieldGroup = document.createElement('div');
  fieldGroup.className = 'fieldGroup';
  fieldGroup.style.flexDirection = config.orientation;
  if (config.label.position == 'first') {
    fieldGroup.appendChild(newLabel(config.label));
  }
  let c = 0;
  config.value.forEach(value => {
    let field;
    field = document.createElement('input');
    if (typeof value == 'string') {
      field.className = 'result';
      field.disabled = true;
    } else {
      field = document.createElement('input');
      field.className = 'field';
    }
    field.value = value;
    field.type = config.type;
    if (config.value.length > 1) {
      field.name = config.name + c;
    } else {
      field.name = config.name;
    }
    // field.style.flexGrow = config.size;
    //field.size = config.size;
    field.style.width = config.size + 'vw';
    field.maxLength = config.max_chars;

    field.onchange = () => {
      if (field.value != '') {
        app.data[field.name] = Number(
          document.getElementsByName(field.name)[0].value
        );
        doCalculations(app);
        console.log(app.data);
      }
    };
    fieldGroup.appendChild(field);
    c++;
  });
  if (config.label.position == 'last') {
    fieldGroup.appendChild(newLabel(config.label));
  }
  return fieldGroup;
}

function newLabel(config) {
  let label = document.createElement('label');
  label.innerHTML = config.value;
  label.style.textTransform = config.format;
  label.style.flexGrow = config.size;
  return label;
}

function newLabelResult(value) {
  let label = document.createElement('label');
  label.className = 'result';
  label.innerHTML = value;
  return label;
}

function exportToJsonFile(jsonData) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
  let exportFileDefaultName = jsonData.basics_name + '.json';
  let linkElement = document.getElementsByName('export')[0];
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  // document.body.appendChild(linkElement);
}

function xml22() {
  var xmlDoc = (new DOMParser).parseFromString(xmltemplate, 'text/xml');
  let nodes = xmlDoc.evaluate("/sheet", xmlDoc, null, XPathResult.ANY_TYPE, null);
  var result = nodes.iterateNext();
  console.log(result);
}

// window.onload = init;/*  */

window.onload = xml22;