/*
Entry Point
*/
//assigning globals
global.url=require("./url.js");
global.db=require("./db.js");
global.exe=require("./exe.js");

//setting up the server
let express = require('express');
global.app = express();

global.url.setup(); //setups the url table
require("dotenv").config(); //setup environmental variables
global.db.connect(); //connect to database

global.server = app.listen(9101,()=> //start server
{
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("code server listening at http://"+host+":"+port);
   console.log("using ctrl+C to exit!");
});