const app = require("express")();
app.listen(3000,function () {
   console.log(`app ready on port 3000`);
})
module.exports = app;