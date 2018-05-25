'use strict';

let cli=require("child_process");

module.exports.exe=(submission,filename,folder)=>
{
    
    let num=submission["testcases"];
    let lang=submission["lang"];
    let a=cli.spawn("node",["exe.js",lang,filename,num,folder],{cwd:__dirname});
    console.log("reached!");
    a.stdout.on("data",(data)=>{
        console.log("out");
        console.log(data.toString());
    });
    a.stderr.on("data",(data)=>{
        console.log("err");
        //clean out the runtime errors/syntax errors
        console.log(data.toString());
    });
};
