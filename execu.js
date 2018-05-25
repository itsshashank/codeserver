'use strict';

let cli=require("child_process");

module.exports.exe=(submission,filename,folder)=>
{
    
    let num=submission["testcases"];
    let lang=submission["lang"];
    let a=cli.spawn("./exe.sh",[lang,filename,num,folder],{});
    console.log("reached!");
    a.stdout.on("data",(data)=>{
        console.log("out");
        console.log(data.toString());
    });
    a.stderr.on("data",(data)=>{
        console.log("err");
        console.log(data.toString());
    });
};
