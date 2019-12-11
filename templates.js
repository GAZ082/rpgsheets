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
    "bs": [3, 4],
    "xs": [3, 4],
    "ys": [3, 4],
    "fel": [1]
  },
  "meta": {
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
        "col": "1-20",
        "max_chars": 16,
        "label": {
          "value": "basic information",
          "format": "capitalize",
          "font": "CormorantInfant-Medium.ttf"
        },
        "group": [{
          "orientation": "row",
          "field": [{
              "name": "basics_name",
              "value": [, ],
              "orientation": "column",
              "type": "text",
              "size": 40,
              "max_chars": 16,
              "label": {
                "position": "last",
                "value": "name",
                "format": "capitalize",
                "size": 40,
              }
            },
            {
              "name": "basics_species",
              "value": [, ],
              "orientation": "column",
              "type": "text",
              "size": 20,
              "max_chars": 16,
              "label": {
                "position": "last",
                "value": "species",
                "format": "capitalize",
                "size": 20,
              }
            }, {
              "name": "basics_class",
              "value": [, ],
              "orientation": "column",
              "type": "text",
              "size": 20,
              "max_chars": 16,
              "label": {
                "position": "last",
                "value": "class",
                "format": "capitalize",
                "size": 20,
              }
            }, {
              "name": "basics_career",
              "value": [, ],
              "orientation": "column",
              "type": "text",
              "size": 20,
              "max_chars": 16,
              "label": {
                "position": "last",
                "value": "career",
                "format": "capitalize",
                "size": 20,
              }
            }, {
              "name": "basics_career_level",
              "value": [, ],
              "orientation": "column",
              "type": "number",
              "size": 1,
              "max_chars": 2,
              "label": {
                "position": "last",
                "value": "career lvl",
                "format": "capitalize",
                "size": 1,
              }
            }, {
              "name": "basics_career_path",
              "value": [, ],
              "orientation": "column",
              "type": "text",
              "size": 1,
              "max_chars": 32,
              "label": {
                "position": "last",
                "value": "career path",
                "format": "capitalize",
                "size": 1,
              }
            }, {
              "name": "basics_status",
              "value": [, ],
              "orientation": "column",
              "type": "text",
              "size": 1,
              "max_chars": 16,
              "label": {
                "position": "last",
                "value": "status",
                "format": "capitalize",
                "size": 1,
              }
            }, {
              "name": "basics_age",
              "value": [, ],
              "orientation": "column",
              "type": "number",
              "size": 5,
              "max_chars": 3,
              "label": {
                "position": "last",
                "value": "age",
                "format": "capitalize",
                "size": 5,
              }
            }, {
              "name": "basics_height",
              "value": [, ],
              "orientation": "column",
              "type": "number",
              "size": 5,
              "max_chars": 3,
              "label": {
                "position": "last",
                "value": "height",
                "format": "capitalize",
                "size": 5,
              }
            }, {
              "name": "basics_hair",
              "value": [, ],
              "orientation": "column",
              "type": "text",
              "size": 1,
              "max_chars": 12,
              "label": {
                "position": "last",
                "value": "hair",
                "format": "capitalize",
                "size": 1,
              }
            }, {
              "name": "basics_eyes",
              "value": [, ],
              "orientation": "column",
              "type": "text",
              "size": 5,
              "max_chars": 12,
              "label": {
                "position": "last",
                "value": "eyes",
                "format": "capitalize",
                "size": 5,
              }
            }
          ]
        }]
      }] //section
    }
  }
};