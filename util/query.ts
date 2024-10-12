const format = require('pg-format');

export function setInsertColumns(values: any[], colnames: string[]){
  let columns: string[] = []
  let inputs: any[] = []

  values.forEach((value, index) => {
    if(value != null && !Number.isNaN(value)) {
      inputs.push(value)
      columns.push(colnames[index])
    }
  })
  return { columns, inputs }
}

export function setUpdateColumns(values: any[], colnames: string[]){
  const query = values.map((value, index) => {
    if(value == null || Number.isNaN(value)) 
      return ""
    else
      return format(`%I = %L`, colnames[index], value)
  }).filter((value) => value != "").join(',');
  return query;
}

export function setWhere(values: any[], colnames: string[]){
  const query = values.map((value, index) => {
    if(value == null || Number.isNaN(value)) 
      return ""
    else
      return format(`AND %I = %L`, colnames[index], value)
  }).filter((value) => value != "").join(' ');
  console.log(query)
  return query;
}

export function setOffset(limit: number | string = `ALL`, page: number){
  if(typeof limit === "number" && page > 0) //if parameters are not default
    page = (page - 1) * limit
  else page = 0;
  return page;
}