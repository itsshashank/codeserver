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
    var arr=[];
    arr.push(options.qid||-1);
    arr.push(options.userid||-1); //-1 is customin anonymous
    arr.push("'"+customin+"'");
    arr.push(options.testcases || 0);
    arr.push(options.progress || 0);
    arr.push("'"+options.lang+"'");
    arr.push("'"+options.program+"'");
    arr.push("'"+options.input+"'");
    return global.link.query("insert into submission(qid,userid,customin,testcases,progress,lang,program,input) values ("+arr.join()+") returning dbid")
    .catch((err)=>{});
}
module.exports.getsubmission=(dbid,callback)=>
{
    return global.link.query("SELECT * FROM SUBMISSION WHERE DBID="+dbid);
}

module.exports.assertdb=(submission,testcase,result)=>
{
    //console.log("assertdb");
    let dbid=submission.dbid;
    let m=testcase+":"+result;
    let percent=100/(submission.testcases+1);
    //change the score object according to options
    global.link.query("update submission set score=array_cat(score,'{"+m+"}'),progress=progress+"+percent+" where dbid="+dbid)
    .catch((err)=>{
        //console.log(err,res);
    }); 
}

module.exports.customindb=(submission,output)=>
{
    let dbid=submission.dbid;
    global.link.query("update submission set score='{"+output+"}',progress=100 where dbid="+dbid)
    .catch((err)=>{});
}
//clean up
process.on("exit",()=>{
    global.link.end();
    global.debug.log("closing database link!");
});