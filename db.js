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
cid       int                            code executor id
lang      text    not null               the language of program
customin  boolean                        whther it is custom input
program   text    not null               the program
score     text[]                         the score/output
errors    text[]                         the errors for each testcase
input     text                           the input for custom input
*/


'use strict'
const {Pool} = require('pg');
var format=require("pg-format");
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
module.exports.makesubmission=(customin,options)=>
{
    console.log("makesubmission");
    var qid=options.qid||-1;
    var userid=options.userid||-1; //-1 is customin anonymous
    var testcases=options.testcases || 0;
    var progress=options.progress || 0;
    var lang=options.lang;
    var program=options.program;
    var input=options.input;
    return global.link.query(format("insert into submission(qid,userid,customin,testcases,progress,lang,program,input) values (%L,%L,%L,%L,%L,%L,%L,%L) returning dbid",qid,userid,customin,testcases,progress,lang,program,input))
    .catch((err)=>{console.log(err);});
}
module.exports.getsubmission=(dbid,callback)=>
{//X
    return global.link.query(format("SELECT * FROM SUBMISSION WHERE DBID=%L",dbid));
}

module.exports.assertdb=(submission,testcase,result)=>
{
    //console.log("assertdb");
    let dbid=submission.dbid;
    let m=testcase+":"+result;
    let percent=100/(submission.testcases+1);
    //change the score object according to options
    global.link.query(format("update submission set score=array_cat(score,'{%s}'),progress=progress+%L where dbid=%L",m,percent,dbid))
    .catch((err)=>{
        console.log(err,res);
    }); 
}

module.exports.customindb=(submission,output)=>
{
    let dbid=submission.dbid;
    global.link.query(format("update submission set score='{%s}',progress=100 where dbid=%L",output,dbid))
    .catch((err)=>{console.log(err);});
}
module.exports.updatetime=(submission,time,num)=>
{
    var m=num+":"+time;
    let dbid=submission.dbid;
    global.link.query(format("update submission set time=array_cat(time,'{%s}') where dbid=%L",m,dbid))
    .catch((err)=>{
        console.log(err);
    });
}
//clean up
process.on("exit",()=>{
    global.link.end();
});