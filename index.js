//accepts http requests for running code
//http request consist of file location,question id
//each file should be located in a different folder
// the data is directly updated in db

//parts
// server, code executor, db updater
newFunction();
function newFunction() {
    'use strict';
}

function onreq(req,res)
{
    //run the code
    //compare code to required result
    //update db
    //all async
}

global.db=require("db.js");
global.exe=require("execu.js");

let express = require('express');
let app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get("/req",onreq);
var server = app.listen(9101, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("code server listening at http://%s:%s", host, port);
})