# Documentation

## Template
### Hierarchy

The organization of a template looks like this:
```json
"sheet":{
  "configuration":{
    ...
  },
  "section":
    "configuration":{
    ...
  },
  "group":{
    "configuration":{
    ...
  },
      "field":{
        ...
      }
  }
	
}


```

* Sheet is the main object.
* Section is a division of sheet.
* Group is a division of sections. May be considered as columns.
* Field is the atomic unit of information of the sheet.
* Configuration sets the parameters to the specific hierarchy.