const fs = require("fs");

function getFuncDetails(fname) {
   let data = fs.readFileSync(process.cwd()+"/database/funcs.json").toString()
  let obj = JSON.parse(data);      var len = obj.length;
    while ( len-- ) {

      if (fname.toLowerCase().replace("$","")==obj[len].name.toLowerCase().replace("$","")) return obj[len];
    }


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
}

module.exports=getFuncDetails;
