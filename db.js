/*
DB handler

TO-DO:
sql_injection prevention
connection and query error handling
*/


'use strict'
const {Pool} = require('pg');
//to run tests as stand alone from terminal
module.exports.connect=()=>
{
    const link = new Pool({
        user: process.env.DBuser,
        host: process.env.DBhost,
        database: process.env.DBdatabase,
        password: process.env.DBpassword,
        port: process.env.DBport,
    });
    global.link=link;
    console.log("connected to postgres://"+process.env.DBuser+"@"+process.env.DBhost+":"+process.env.DBport+"/"+process.env.DBdatabase);
};
//function list
module.exports.getsubmission=(dbid,callback)=>
{
    global.link.query("SELECT * FROM SUBMISSION WHERE DBID="+dbid,(err,res)=>
    {
        callback(res.rows[0]);
    });
}

module.exports.assertdb=(submission,testcase,result)=>
{
    //console.log("assertdb");
    let dbid=submission.dbid;
    let m=testcase+":"+result;
    let percent=100/(submission.testcases+1);
    //change the score object according to options
    global.link.query("update submission set score=array_cat(score,'{"+m+"}'),progress=progress+"+percent+" where dbid="+dbid,(err,res)=>{
        //console.log(err,res);
    }); 
}


//clean up
process.on("exit",()=>{
    global.link.end();
    global.debug.log("closing database link!");
});