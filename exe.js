/*
Excutes and asserts the code

TO-DO
handling other errors
Compilation (by lang.js)
runtime
Wrong answer
*/
'use strict';
const fs=require("fs");
const path=require("path");
const lang=require("./lang.js");
const cli=require("child_process");
const directory=__dirname;

function mainx(submission)
{
    //generate folder for execution
    submission=setup(submission);
    //execute and assert the output

    // if its custom input
    if(submission.customin)
    {
        execute(submission,0);
        customin(submission);
    }
    else //submission for a problem
    {
        for(let i=0;i<=submission.testcases;i++)
        {
            //console.log(i+" testcase");
            execute(submission,i);
            assert(submission,i);
        }
    }

    //reset __dirname
    process.chdir(directory);
    //delete execution folder
}

function setup(submission)
{
    submission.folder=path.resolve(__dirname,"./exearea/"+submission.dbid);//execution folder
    submission.qfolder=path.resolve(__dirname,"./problem/"+submission.qid);//question folder
    fs.mkdirSync(submission.folder);//make execution folder

    //copy testcases *.txt to execution folder
    if(!submission.customin)
    {
        for(let i=0;i<=submission.testcases;i++)
        {
            let src=path.resolve(submission.qfolder,"./"+i+".txt"); //source loc
            let dest=path.resolve(submission.folder,"./"+i+".txt"); //destination loc
            fs.copyFileSync(src,dest);
        }
    }
    else
    {
        //custom input file setup
        submission.qfolder=null;
        let src=path.resolve(submission.folder,"./0.txt");
        fs.writeFileSync(src,submission.input);
    }
    //change folder to execution folder
    process.chdir(submission.folder);

    //make the program file
    submission.filename=lang.file[submission.lang];
    fs.writeFileSync(submission.filename,submission.program);

    //compile the program
    submission.execom=lang.proc[submission.lang](submission.filename);
    return submission;
}

function execute(submission,num)
{
    let command=comgen(submission,num);
    let out=cli.spawnSync(command[0],command.slice(1),{cwd:submission.folder});
    let output=out.output[1].toString(); //get output
    gettime(submission,out.output[2].toString(),num);
    fs.writeFileSync(num+".out",output); //write output to .out file
}

function assert(submission,num)
{
    //console.log("assert");
    var expected=path.resolve(submission.qfolder,"./"+num+".out");
    var output=path.resolve(submission.folder,"./"+num+".out");
    var expStream=fs.readFileSync(expected);
    var outStream=fs.readFileSync(output);
    if(expStream.equals(outStream))
    {
        //output matches expected
        //console.log("assert eq check");
        global.db.assertdb(submission,num,"1");
    }
}

function customin(submission)
{
    //custom input
    let num=0;
    var output=path.resolve(submission.folder,"./"+num+".out");
    var outStream=fs.readFileSync(output);
    global.db.customindb(submission,outStream.toString());
}

function comgen(submission,num)
{
    let filename=num+".txt";
    let ex=submission.execom.command+" < "+filename;
    let command="time firejail --quiet --net=none --private="+submission.folder+" timeout "+submission.execom.t+"s "+ex;
    command=command.split(" ");
    return command;
}

function gettime(submission,err,num)
{
    var start=err.indexOf("system")+7;
    var end=err.indexOf("elapsed");
    var tim=err.slice(start,end);
    global.db.updatetime(submission,tim,num);
}

module.exports.mainx=mainx;