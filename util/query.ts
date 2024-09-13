//KNOWN ISSUE: error if string has unescaped ('), requires sanitization
//test for object types like Date
export function nullToDefault(arr: any[]){
  const values = arr.map((value) => {
    if(value == null) { 
      return "DEFAULT"
    } else if (typeof value === "string"){
      return `'${value}'`;
    } else {
      return value;
    };
  });
  return values;
}

export function setUpdateColumn(values: any[], colnames: string[]){
  const query = values.map((value, index) => {
    if(value == null) {
      return ""
    } else if (typeof value === "string"){
      return `"${colnames[index]}" = '${value}'`;
    } else {
      return `"${colnames[index]}" = ${value}`;
    };
  }).filter((value) => value != "").join(',');
  return query;
}

export function paginate(limit: number, page?: number){
  let sql = `LIMIT ${limit} `
  if(page != null){ 
    sql = sql + `OFFSET ${limit * (page - 1)}`
  }
  return sql;
}