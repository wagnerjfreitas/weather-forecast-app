
function addString(oldValue: string, obj: any) {
  let newValue = objToString(obj)
  return oldValue === '' ? newValue : oldValue + ', ' + newValue
}

function objToString(obj: any){
  let valueObj
  if (typeof obj === 'object') {
    valueObj = JSON.stringify(obj)
  } else {
    if (typeof obj === 'string') {
      valueObj = `'` + obj + `'`
    } else if (typeof obj === 'boolean') {
      valueObj = obj ?  1 : 0
    } else {
      valueObj = obj
    }
  }
  return valueObj
}

function getString(table: string, objectInsert: any) {
  let fieldsInsert = ''
  let valuesInsert = ''

  if (!!objectInsert) {
    for (let prop in objectInsert) {
      if (objectInsert.hasOwnProperty(prop) && objToString(objectInsert[prop]) !== undefined) {
        fieldsInsert += fieldsInsert === '' ? prop : ', ' + prop
        valuesInsert = addString(valuesInsert, objectInsert[prop])
      }
    }
  }
  let stringInsert = `INSERT OR REPLACE INTO ${table} ( ${fieldsInsert} ) VALUES ( ${valuesInsert} );`
  return stringInsert
}

export default {
  getString,
}
