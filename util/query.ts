//KNOWN ISSUE: error if string has unescaped ('), requires sanitization
//test for object types like Date
export function nullToDefault(arr: any[]){
  const values = arr.map((property) => {
    if(!property) { 
      return "DEFAULT"
    } else if (typeof property === "string"){
      return `'${property}'`;
    } else {
      return property;
    };
  });

  return values;
}