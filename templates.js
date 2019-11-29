let characterData = {
  "sheet": {
    "basics_name": "Pedro",
    "basics_species": "Human",
    "basics_class": "Soldier",
    "basics_career": "Some career",
    "basics_career_level": 1,
    "basics_career_path": "xxxxx",
    "basics_status": "Active",
    "basics_age": 23,
    "basics_height": 183,
    "basics_hair": "Dark",
    "basics_eyes": "Brown",
    "ws": [1, 2],
    "bs": [3, 4]
  }, "metadata": {
    "character_created": "",
    "character_updated": "",
    "template_name": "",
    "template_version": "0",
    "template_author": "0"
  }
}


let templates = {
  "whfrpg4e": {
    "sheet": {
      "columns": 20,
      "section": [{
        "name": "characteristics",
        "row": "1",
        "col": "1-10",
        "label": {
          "value": "Characteristics",
          "format": "capitalize",
          "font": "CormorantInfant-Medium.ttf"
        },
        "group": [{
          "orientation": "row",
          "field": [{
            "name": "basics_name",
            "value": [,],
            "orientation": "column",
            "type": "text",
            "size": 3,
            "label": {
              "position": "last",
              "value": "name",
              "format": "capitalize",
              "size": 3
            }
          },
          {
            "name": "basics_species",
            "value": [,],
            "orientation": "column",
            "type": "text",
            "size": 3,
            "label": {
              "position": "last",
              "value": "species",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_class",
            "value": [,],
            "orientation": "column",
            "type": "text",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_career",
            "value": [,],
            "orientation": "column",
            "type": "text",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_career_level",
            "value": [,],
            "orientation": "column",
            "type": "number",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_career_path",
            "value": [,],
            "orientation": "column",
            "type": "text",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_status",
            "value": [,],
            "orientation": "column",
            "type": "text",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_age",
            "value": [,],
            "orientation": "column",
            "type": "number",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_height",
            "value": [,],
            "orientation": "column",
            "type": "number",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_hair",
            "value": [,],
            "orientation": "column",
            "type": "text",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "basics_eyes",
            "value": [,],
            "orientation": "column",
            "type": "text",
            "size": 1,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 2
            }
          }, {
            "name": "ws",
            "value": [, , "ws0+ws1"],
            "orientation": "column",
            "type": "number",
            "size": 3,
            "label": {
              "position": "last",
              "value": "ws",
              "format": "capitalize",
              "size": 3
            }
          },
          ]
        }]
      }]//section
    }
  }
};