/*
Handles compiling and generation of execution code for each program language

TO-DO:
compile error handling!
*/
cli=require("child_process");
module.exports.proc={};
module.exports.file={};

function compilerr(err)
{
    console.log(err);
}

//module functions
module.exports.file.python3="main.py";
module.exports.proc.python3=(filename)=>
{
    excom={};
    excom.t=10;
    excom.command="python3 "+filename;
    return excom;
};

module.exports.file.java="main.java";
module.exports.proc.java=(filename)=>
{
    classn=filename.replace(".java","");
    excom={};
    excom.t=4;
    out=cli.spawnSync("javac",[filename]);
    excom.command="java "+classn;
    compilerr(out.output[2].toString());
    return excom;
};

module.exports.file.cpp="main.cpp";
module.exports.proc.cpp=(filename)=>
{
    excom={};
    excom.t=2;
    out=cli.spawnSync("g++",["-lm","-x","c++",filename]);
    compilerr(out.output[2].toString());
    excom.command="./a.out";
    return excom;
};

module.exports.file.c="main.c";
module.exports.proc.c=(filename)=>
{
    excom={};
    excom.t=2;
    out=cli.spawnSync("gcc",["-lm","-x","c",filename]);
    excom.command="./a.out";
    compilerr(out.output[2].toString());
    return excom;
};