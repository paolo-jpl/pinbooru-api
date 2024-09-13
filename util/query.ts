const format = require('pg-format');
export function setInsertColumns(values: any[], colnames: string[]){
  let columns: string[] = []
  let inputs: any[] = []

  values.forEach((value, index) => {
    if(value != null) {
      inputs.push(value)
      columns.push(colnames[index])
    }
  })
  return { columns, inputs }
}

export function setUpdateColumns(values: any[], colnames: string[]){
  const query = values.map((value, index) => {
    if(value == null) 
      return ""
    else
      return format(`%I = %L`, colnames[index], value)
  }).filter((value) => value != "").join(',');
  return query;
}