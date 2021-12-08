
function addString(oldValue: string, obj: any, prop: any) {
  let newValue = prop + `=` + objToString(obj[prop])
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

function getString(table: string, id :any, objectUpdate :any) {
  let fieldsUpdate = ''
  let primaryKey = []
  let wherePK = ''

  if (typeof id === 'string') {
    primaryKey = [id]
  } else {
    if (Array.isArray(id)) {
      primaryKey = id
    }
  }

  if (!!objectUpdate) {
    for (let prop in objectUpdate) {
      if (primaryKey.filter(el => el === prop).length) {
        wherePK = addString(wherePK, objectUpdate, prop)
        continue
      }
      if (objectUpdate.hasOwnProperty(prop) && objToString(objectUpdate[prop]) !== undefined) {
        fieldsUpdate = addString(fieldsUpdate, objectUpdate, prop)
      }
    }
  }
  let stringUpdate = `UPDATE ${table} SET ${fieldsUpdate} WHERE ${wherePK} ;`
  return stringUpdate
}

export default {
  getString,
}
