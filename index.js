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

const fs=require("fs");
const path=require("path");

function onreq(req,res)
{
    //make new folder in exearea
    dbid=req.param("id");
    code=req.param("program");
    global.db.getsubmission(dbid,(submission)=>{
        let qid=submission["qid"];
        let num=submission["testcases"];
        let loc=path.resolve(__dirname,"./exearea/"+dbid);
        fs.mkdirSync(loc);
        //copy testcases to it
        console.log(loc);
        for(let i=0;i<=num;i++)
        {
            fs.copyFileSync(path.resolve(__dirname,"./problem/"+qid+"/"+i+".txt"),path.resolve(loc,"./"+i+".txt"));
        }
        //make program file
        fs.writeFileSync(path.resolve(loc,"./main.java"),code);//TO-DO make it fit for different languages
        global.exe.exe(submission,"main.java",loc);    
    });
    
    res.send("1");
}

global.db=require("./db.js");
global.exe=require("./execu.js");

let express = require('express');
let app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get("/req",onreq);
var server = app.listen(9102, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("code server listening at http://%s:%s", host, port);
})