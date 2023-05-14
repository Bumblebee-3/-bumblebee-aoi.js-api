const getFuncDetails= require("./getFuncDetails.js")

function validateFunc(inp){
  let flist = require("../database/funclist.json")
  let nk = []
  let a =flist.length
  while (a--){
    nk.push(flist[a].toLowerCase().replace("$",""))
  }
  const micromatch = require('micromatch');
    const search=inp;
    let result = micromatch(nk, [`${search.toLowerCase().replace("$","")}*`]);
  if (result.length==0) {
     return {
        "name": "function not found",
        "desc": "description not found",
        "usage": "usage not found",
        "params": "params not found",
        "example": "example not found",
        "category": "category not found",
        "src": "src not found",
        "docs": "docs not found"
        
      }
  } else {
     let dat=[]
    let d=result.length;
    let i=0;
     while (i<d){
       dat.push(getFuncDetails(result[i]))
       i++
     }
    return dat;
  }
}
module.exports = validateFunc;