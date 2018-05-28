/*
DB handler

TO-DO:
sql_injection prevention
connection and query error handling



DB STRUCTURE (postgresql)
table submission
dbid      serial  not null primary key   the id of submission
qid       int     not null               the question id
testcases int     not null               the number of testcases [0 implies 1,1 implies 2]
userid    int     not null               the user id
progress  real    not null               the progress %
cid       int     not null               code executor id
lang      text                           the language of program
customin  boolean                        whther it is custom input
program   text    not null               the program
score     text[]                         the score/output
errors    text[]                         the errors for each testcase
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