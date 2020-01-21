'use strict';

let app = {};
app.data = [];
app.calc = [];

async function init() {
  // fetch('http://localhost/templates.js')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //   })
  //   .catch(err => console.error(err));
  // localStorage.setItem('templateData', JSON.stringify(templates.whfrpg4e));
  // localStorage.setItem('templateData', JSON.stringify(json));
  // app.template = JSON.parse(localStorage.getItem('templateData'));
  let xml = (new DOMParser).parseFromString(xmltemplate, 'text/xml');
  // cacheData(xml, app);
  loadForm(xml).then(loadDataFromFile(app.data));
  doCalculations(app);
}

function cacheData(xml, app) {
  let data = {};
  let calc = [];
  xml.querySelectorAll("section").forEach(section => {
    section.querySelectorAll("group").forEach(group => {
      group.querySelectorAll("field").forEach(field => {
        field.querySelectorAll("values").forEach(values => {
          let fieldName = field.getAttribute("name")
          let qValue = values.getElementsByTagName("value").length
          if (qValue == 1) {
            data[fieldName] = characterData['sheet'][fieldName];
          } else {
            let f = 0;
            values.querySelectorAll("value").forEach(value => {
              console.log(value);

              if (characterData['sheet'][fieldName][f] == null) { //formula
                calc.push({
                  name: fieldName + f,
                  formula: value.innerHTML.match(/[^":]+[a-z0-9]+[^"]/gi)[0],
                  order: Number(value.innerHTML.match(/[0-9]+/)[0])
                });
              } else {
                data[fieldName + f] = characterData['sheet'][fieldName][f];
              }
              f++
            });
          };
        });
      });
    });
  });
  calc.sort((a, b) => a.order - b.order);
  app.data = data;
  app.calc = calc;
  console.log(app);
}


function loadForm(xml) {
  return new Promise(function (resolve, reject) {
    resolve(generateForm(xml));
  });
};

function generateForm(xml) {

  let root = newSheet(xml);
  xml.querySelectorAll("section").forEach(section => {
    let nSection = newSection(section)
    section.querySelectorAll("group").forEach(group => {
      let nGroup = newGroup(group)
      group.querySelectorAll("field").forEach(field => {
        let type = getSelectorValue(field, "type");
        let nField;
        if (type == "combo") {
          nField = newCombo(field);
          nField.flexDirection = group.querySelector("orientation").innerHTML;
          nGroup.appendChild(nField);
        } else {
          nField = newField(field);
          nField.flexDirection = group.querySelector("orientation").innerHTML;
          nGroup.appendChild(nField);
        }
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
  console.log(data.calc);

  data.calc.forEach(dataField => {
    console.log(dataField);
    let formField;
    try {
      formField = document.getElementsByName(dataField.name)[0];
    } catch (error) {
      console.log('Calculation not found in template: ' + dataField);
    }
    formField.value = doSingleCalc(dataField.formula, app.data);
  });
}

function doSingleCalc(field, data) {
  if (field.includes('+')) {
    let sum = 0;
    field.split('+').forEach(element => {
      if (data[element] == null) {
        sum += Number(document.getElementsByName(element)[0].value);
      } else {
        sum += data[element];
      }
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

function saveData() {
  localStorage.setItem('characterData', JSON.stringify(app.data));
  alert('Saved!');
}

function newField(template) {
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
    //  field.style.width = getSelectorValue(template, "size") + 'vw';
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
  // label.style.flexGrow = getSelectorValue(template, "label>size");
  label.style.width = "100%"
  return label;
}
function newCombo(template) {
  let fieldGroup = document.createElement('div');
  fieldGroup.className = 'fieldGroup';
  fieldGroup.style.flexDirection = getSelectorValue(template, "orientation")
  fieldGroup.style.flexGrow = getSelectorValue(template, "size");
  let combo = document.createElement('select');
  let fieldName = template.getAttribute("name");
  if (getSelectorValue(template, "label>position") == 'first') {
    fieldGroup.appendChild(newLabel(template));
  }
  fieldGroup.appendChild(combo);
  template.querySelectorAll("values>class").forEach(section => {
    let nOption = document.createElement("option");
    nOption.value = section.getAttribute("name");
    nOption.innerHTML = section.getAttribute("name");
    combo.appendChild(nOption);
  });
  if (getSelectorValue(template, "label>position") == 'last') {
    fieldGroup.appendChild(newLabel(template));
  }
  combo.style.width = "100%"
  combo.onchange = () => {
    if (combo.innerHTML != null) {
      // app.data[field.name] = Number(
      //   document.getElementsByName(field.name)[0].value
      // );
      // doCalculations(app);
      console.log("cambio");

    }
  };
  return fieldGroup;
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


function xPathReturn(xml, xpath) {
  return xml.evaluate(xpath, xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

}

function parseXML(xml, term) {
  let nodes = xml.evaluate(term, xml, null, XPathResult.ANY_TYPE, null);
  let node = null;
  let returnArray = [];
  while (node = nodes.iterateNext()) {
    returnArray.push(node);
  }
  return returnArray;
}

function getSelectorValue(element, query) {
  return element.querySelector(query).innerHTML
}


window.onload = init;