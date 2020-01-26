'use strict';

async function init() {
  let app = {};
  app.data = [];
  app.input = [];
  app.calc = [];
  app.mods = {};
  app.calcTemplate = [];

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
  loadForm(xml, app).then(loadDataFromFile(app.data));
  doCalculations(app);
}


window.onload = init;