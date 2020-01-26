'use strict';

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

function doCalculations(app) {
  console.log('Doing calculations.');
  console.log(app.calcTemplate);
  for (const key of Object.keys(app.calcTemplate)) {
    app.calc[key] = 0;
    app.calcTemplate[key].split("+").forEach(term => {
      app.calc[key] += app.calc[term]
    });
  }
  updateValues(app);
  console.log(app);

}

function doSingleCalc(field, data, mods) {
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

function saveData() {
  localStorage.setItem('characterData', JSON.stringify(app.data));
  alert('Saved!');
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


function getSelectorValue(element, selector) {
  return element.querySelector(selector).innerHTML
}

function refreshData() {
  console.log(Object.values(app.data));
}

function updateValues(app) {
  Object.keys(app.calc).forEach(key => {
    if (document.querySelector("[name=" + key + "]")) {
      document.querySelector("[name=" + key + "]").value = app.calc[key]
    }
  });
}