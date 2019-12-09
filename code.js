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
  let qsections = xml.evaluate("count(//section)", xml, null, XPathResult.ANY_TYPE, null).numberValue;
  //XPATH W3C specs first item is 1 not 0.
  for (let s = 1; s <= qsections; s++) {
    let qgroups = xml.evaluate(`count(//section[${s}]/group)`, xml, null, XPathResult.ANY_TYPE, null).numberValue;
    for (let g = 1; g <= qgroups; g++) {
      let qfields = xml.evaluate(`count(//section[${s}]/group[${g}]/field)`, xml, null, XPathResult.ANY_TYPE, null).numberValue;
      for (let f = 1; f <= qfields; f++) {
        let fieldName = xml.evaluate(`string(//section[${s}]/group[${g}]/field[${f}]/@name)`, xml, null, XPathResult.ANY_TYPE, null).stringValue;
        let qvalues = xml.evaluate(`count(//section[${s}]/group[${g}]/field[${f}]/values/value)`, xml, null, XPathResult.ANY_TYPE, null).numberValue;
        if (qvalues == 1) {
          data[fieldName] = characterData['sheet'][fieldName];
        } else {
          for (let i = 0; i < qvalues; i++) {
            if (characterData['sheet'][fieldName][i] == null) { //formula
              let fv = xml.evaluate(`string(//field[@name='${fieldName}']//value[last()])`, xml, null, XPathResult.ANY_TYPE, null).stringValue;
              calc.push({
                name: fieldName + i,
                formula: fv.match(/[^:]*$/gi)[0],
                order: Number(fv.match(/[0-9]+/)[0])
              });
              data[fieldName + i] = '';
            } else {
              data[fieldName + i] = characterData['sheet'][fieldName][i];

            }
          }
        }
      }
    }
  }
  calc.sort((a, b) => a.order - b.order);
  app.data = data;
  app.calc = calc;
}

function generateForm(xml) {
  let root = newSheet(xml);
  xml.querySelectorAll("section").forEach(section => {
    console.log(section.getAttribute("name"));
    section.querySelectorAll("group").forEach(group => {
      console.log(group.getAttribute("name"));
      group.querySelectorAll("field").forEach(field => {
        console.log(field.getAttribute("name"));
        field.querySelectorAll("values").forEach(values => {
          console.log(values.getElementsByTagName("value").length);
        });
      });
    });
  });

  // let qsections = xml.evaluate("count(//section)", xml, null, XPathResult.ANY_TYPE, null).numberValue;
  // let sections = xml.evaluate("//section", xml, null, XPathResult.ANY_TYPE, null);
  // let section = []
  // while (section = sections.iterateNext()) {
  //   let nSection = newSection(xml, section.getAttribute("name"));
  //   // let groups = section.ChildNode();
  //   console.log(section.getElementsByTagName("group")[0]);




  // }

  /*   for (let s = 1; s <= qsections; s++) {
      let section = getXMLValue(xml, `//section[${s}]/@name`)
      let nSection = newSection(xml, section);
      let qgroups = xml.evaluate(`count(//section[${s}]/group)`, xml, null, XPathResult.ANY_TYPE, null).numberValue;
      for (let g = 1; g <= qgroups; g++) {
        let group = getXMLValue(xml, `//section[${s}]/group/@name`)
        let nGroup = newGroup(xml, group);
        let qfields = xml.evaluate(`count(//section[${s}]/group[${g}]/field)`, xml, null, XPathResult.ANY_TYPE, null).numberValue;
        for (let f = 1; f <= qfields; f++) {
          let fieldName = getXMLValue(xml, `//section[${s}]/group[${g}]/field[${f}]/@name`);
          let nField = newField(xml, fieldName);
          //       nField.flexDirection = group.orientation;
          //       nGroup.appendChild(nField);




        }
        nSection.appendChild(nGroup);
      }
      root.appendChild(nSection);
    } */



  // sheet.section.forEach(section => {
  //   let nSection = newSection(section);
  //   section.group.forEach(group => {
  //     let nGroup = newGroup(group);
  //     group.field.forEach(field => {
  //       let nField = newField(field);
  //       nField.flexDirection = group.orientation;
  //       nGroup.appendChild(nField);
  //     });
  //     nSection.appendChild(nGroup);
  //   });
  //   root.appendChild(nSection);
  // });
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

function newSection(xml, name) {
  let sectionName = `//section[@name='${name}']`;
  let section = document.createElement('fieldset');
  let title = document.createElement('legend');
  title.className = 'title';
  title.title = getXMLValue(xml, sectionName + "/label/value");
  title.innerHTML = getXMLValue(xml, sectionName + "/label/value");
  title.style.textTransform = getXMLValue(xml, sectionName + "/format");
  title.style.fontFamily = getXMLValue(xml, sectionName + "/label/font");
  section.appendChild(title);
  let row = getXMLValue(xml, sectionName + "/row").split('-');
  let col = getXMLValue(xml, sectionName + "/col").split('-');
  section.title = getXMLValue(xml, sectionName + "/label/value");
  section.className = 'section';
  section.style.gridColumnStart = col[0];
  section.style.gridColumnEnd = Number(col[1]) + 1;
  section.style.gridRowStart = row[0];
  section.style.gridRowEnd = Number(row[0]) + 1;
  return section;
}

function newGroup(xml, name) {
  let group = document.createElement('div');
  group.style.flexDirection = getXMLValue(xml, `//group[@name='${name}']/orientation`);
  group.className = 'group';
  return group;
}

function saveData() {
  localStorage.setItem('characterData', JSON.stringify(app.data));
  alert('Saved!');
}

function newField(xml, name) {
  let fieldName = `//field[@name='${name}']`;
  let fieldGroup = document.createElement('div');
  fieldGroup.className = 'fieldGroup';
  fieldGroup.style.flexDirection = getXMLValue(xml, fieldName + "/orientation");
  if (getXMLValue(xml, fieldName + "/label/position") == 'first') {
    fieldGroup.appendChild(newLabel(getXMLValue(xml, fieldName + "/label/value")));
  }
  let c = 0;
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
  //   fieldGroup.appendChild(field);
  //   c++;
  // });

  if (getXMLValue(xml, fieldName + "/label/position") == 'last') {
    fieldGroup.appendChild(newLabel(getXMLValue(xml, fieldName + "/label/value")));
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


window.onload = init;