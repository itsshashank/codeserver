'use strict';

let cli=require("child_process");

module.exports.exe=(submission,filename,folder)=>
{
    let num=submission.testcases;
    let lang=submission.lang;
    let a=cli.spawn("./exe.sh",[lang,filename,num,folder]);
    a.stdout.on("data",()=>{

    });
    a.stderr.on("data",()=>{

    });
};
