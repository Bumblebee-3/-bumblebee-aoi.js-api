const fs=require("fs");

function loadUtils(){
  /*const app = require("./express.js")
  app.get("/",async function (req,res) {
     res.send("hello world")
  })*/



  fs.writeFileSync(process.cwd() + "/database/funcs.json", "test")
  fs.unlinkSync(process.cwd() + "/database/funcs.json");
  fs.writeFileSync(process.cwd() + "/database/funclist.json", "test")
  fs.unlinkSync(process.cwd() + "/database/funclist.json");

    
  const logData= require("./logData.js")
  logData()
  setTimeout(function(){
    const validateFunc= require("./validateFunc.js")
    const getFuncDetails= require("./getFuncDetails.js")

  console.log(`Starting speed test!`);
  const t=Date.now();
  let data = getFuncDetails("$joinvc")
  const ts =Date.now()
    console.log("response ping: "+(ts-t)+" ms");
    console.log(`speed test over!`);
  },5000)

}

module.exports = loadUtils;