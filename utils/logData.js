
const fs= require("fs")
const path= require("path")
function logFunctions(){
  try {
    function* walkSync(dir) {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (const file of files) {
        if (file.isDirectory()) {
          yield* walkSync(path.join(dir, file.name));
        } else {
          yield path.join(dir, file.name);
        }
      }
    }
    let arr =[]
    let farr =[]
    let ff = []
    let count = 0;
    for (const filePath of walkSync(path.join(process.cwd(), "/aoi.js-documentation/src/functions"))) {
      ff.push(filePath);
    }

    for (const filePath of walkSync(path.join(process.cwd(), "/aoi.js-documentation/src/akarui/aoi.music/functions"))) {
      ff.push(filePath);
    }
    
    for (const rr of ff) {
      let pathh = rr;
      let filedata= fs.readFileSync(pathh).toString()
      let fname = filedata.split("title: ")[1].split("description: ")[0].replace(/\n/g,"")
      //console.log(fname);
      let fdesc = filedata.split("---")[2].split("## Usage")[0].replace(/\n/g, "");
      //console.log(fdesc);
      let fusage = filedata.split("## Usage")[1]||"No usage found!"
      fusage =fusage.split("## Parameters")[0].replace(/\n\n/g, "").replace(undefined,"No usage found!")
      //console.log(fusage);
      let fparams = filedata.split("## Parameters")[1]||"No Parameters";
      fparams =fparams.split("## Example(s)")[0].replace(/\n\n/g, "").replace(undefined,"No usage found!")
      //console.log(fparams);
      let fexample = filedata.split("## Example(s)")[1]||"No example found!";
      //console.log(fexample);
      let fcat = pathh.replace(process.cwd(),"").replace("/aoi.js-documentation/src/functions/","").replace(fname.replace("$","")+".md","").replace("/","")
      let src,docs="";
      if (fcat.includes("aoi.music")) {
        fcat="aoi.music";
        src= "https://github.com/AkaruiDevelopment/music/blob/main/src/newstruct/aoiVoice.ts",
        docs=`https://aoi.js.org/docs/akarui/aoi.music/functions/${fname.replace("$","").replace(/\r/g,"")}`
        fdesc=fdesc+". Please note: **You need to have ** `@akarui/aoi.music` **setup to use "+fname.replace(/\r/g,"")+" !**"
      } else {
        src= `https://github.com/AkaruiDevelopment/aoi.js/blob/v6/src/functions/Funcs/${fcat}/${fname.replace("$","")}.js`,
        docs=`https://aoi.js.org/docs/functions/${fcat}/${fname.replace("$","")}`
      }

      farr.push(fname.replace(/\r/g,""))
      
      arr.push({
        "name": fname.replace(/\r/g,""),
        "desc": fdesc.replace(/\r/g,""),
        "usage": fusage.replace(/\r/g,""),
        "params": fparams.replace(/\r/g,""),
        "example": fexample.replace(/\r/g,""),
        "category": fcat.replace(/\r/g,""),
        "src": src.replace(/\r/g,""),
        "docs": docs.replace(/\r/g,"")
        
      })
      count++
    }
    fs.appendFile(process.cwd() + "/database/" + "funcs" + ".json", JSON.stringify(arr), function(err) {
      if (err) throw err;
     console.log('Function data saved!');
    });

    fs.appendFile(process.cwd() + "/database/" + "funclist" + ".json", JSON.stringify(farr), function(err) {
      if (err) throw err;
      console.log('Function list saved!');
    });
    
  
  
    
    console.log(count)
    //console.log(arr)
  
  
  } catch (e) {
    console.log("invalid path/error occoured! "+e.stack)
  }
}

module.exports = logFunctions;