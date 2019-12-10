'use strict';

let app = {};
app.data = [];
app.calc = [];

function init() {
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
  cacheData(xml, app);
  console.log(app);
  generateForm(xml);
  // loadDataFromFile(app.data);
  // doCalculations(app);
  // exportToJsonFile(app.data);
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
              if (characterData['sheet'][fieldName][f] == null) { //formula
                calc.push({
                  name: fieldName + f,
                  formula: value.innerHTML.match(/[^:]*$/gi)[0],
                  order: Number(value.innerHTML.match(/[0-9]+/)[0])
                });
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
}

function generateForm(xml) {
  let root = newSheet(xml);
  xml.querySelectorAll("section").forEach(section => {
    let nSection = newSection(section)
    section.querySelectorAll("group").forEach(group => {
      let nGroup = newGroup(group)
      group.querySelectorAll("field").forEach(field => {
        let nField = newField(field);
        nField.flexDirection = group.querySelector("orientation").innerHTML;;
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

function newSheet(xml) {
  let sheet = document.getElementById('character');
  let c = '';
  let columns = getXMLValue(xml, "/sheet//columns");
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
  title.className = 'title';
  title.title = getSelectorValue(template, "label>value");
  title.innerHTML = getSelectorValue(template, "label>value");
  title.style.textTransform = getSelectorValue(template, "label>format");
  // title.style.fontFamily = getSelectorValue(template,"font");
  section.appendChild(title);
  let row = getSelectorValue(template, "row").split('-');
  let col = getSelectorValue(template, "col").split('-');
  section.title = getSelectorValue(template, "label>value");
  section.className = 'section';
  section.style.gridColumnStart = col[0];
  section.style.gridColumnEnd = Number(col[1]) + 1;
  section.style.gridRowStart = row[0];
  section.style.gridRowEnd = Number(row[0]) + 1;
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

  if (getSelectorValue(template, "label>position") == 'first') {
    fieldGroup.appendChild(newLabel(template));
  }
  let c = 0;
  template.querySelectorAll("value").forEach(value => {
    console.log(value);
    let field = document.createElement('input');
    if (getSelectorValue(template, "type") == 'text') {
      field.className = 'result';
      field.disabled = true;
    } else {
      field.className = 'field';
    }
    fieldGroup.appendChild(field);
  });

  // config.value.forEach(value => {
  //   let field;
  //   field = document.createElement('input');
  //   if (typeof value == 'string') {
  //     field.className = 'result';
  //     field.disabled = true;
  //   } else {
  //     field = document.createElement('input');
  //     field.className = 'field';
  //   }
  //   field.value = value;
  //   field.type = config.type;
  //   if (config.value.length > 1) {
  //     field.name = config.name + c;
  //   } else {
  //     field.name = config.name;
  //   }
  //   // field.style.flexGrow = config.size;
  //   //field.size = config.size;
  //   field.style.width = config.size + 'vw';
  //   field.maxLength = config.max_chars;

  //   field.onchange = () => {
  //     if (field.value != '') {
  //       app.data[field.name] = Number(
  //         document.getElementsByName(field.name)[0].value
  //       );
  //       doCalculations(app);
  //       console.log(app.data);
  //     }
  //   };
  // fieldGroup.appendChild(field);
  //   c++;
  // });

  if (getSelectorValue(template, "label>position") == 'last') {
    fieldGroup.appendChild(newLabel(template));
  }
  // }

  return fieldGroup;
}

function newLabel(template) {
  let label = document.createElement('label');
  label.innerHTML = getSelectorValue(template, "label>value");
  label.style.textTransform = getSelectorValue(template, "label>format");
  label.style.flexGrow = getSelectorValue(template, "label>size");
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

function getXMLValue(xml, xpath) {
  return xml.evaluate(`string(${xpath})`, xml, null, XPathResult.ANY_TYPE, null).stringValue;
}

function getSelectorValue(element, query) {
  return element.querySelector(query).innerHTML
}


window.onload = init;