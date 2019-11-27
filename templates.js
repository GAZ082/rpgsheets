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
          "format": "uppercase",
          "font": "CormorantInfant-Medium.ttf"
        },
        "group": [{
          "orientation": "column",
          "field": [{
              "name": "ws",
              "value": [
                1,
                2,
                "ws[0]+ws[1]"
              ],
              "orientation": "row",
              "type": "number",
              "size": 1,
              "label": {
                "position": "first",
                "value": "ws",
                "format": "capitalize",
                "size": 2
              }
            },
            {
              "name": "bs",
              "value": [
                1,
                2,
                "bs[0]+bs[1]"
              ],
              "orientation": "row",
              "type": "number",
              "size": 1,
              "label": {
                "position": "first",
                "value": "bs",
                "format": "capitalize",
                "size": 2
              }
            }
          ]
        }]
      }]
    }
  }
};