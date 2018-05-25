//handler for each language
cli=require("child_process");
module.exports={};
function compilerr(err)
{
    console.log(err);
}
module.exports.python3=(filename)=>
{
    excom={};
    excom.t=10;
    excom.command="python3 "+filename;
    return excom;
}

module.exports.java=(filename)=>
{
    classn=filename.replace(".java","");
    excom={};
    excom.t=4;
    out=cli.spawnSync("javac",[filename]);
    excom.command="java "+classn;
    compilerr(out.output[2].toString());
    return excom;
}

module.exports.cpp=(filename)=>
{
    excom={};
    excom.t=2;
    out=cli.spawnSync("g++",["-lm","-x","c++",filename]);
    compilerr(out.output[2].toString());
    excom.command="./a.out";
    return excom;
}

module.exports.c=(filename)=>
{
    excom={};
    excom.t=2;
    out=cli.spawnSync("gcc",["-lm","-x","c",filename]);
    excom.command="./a.out";
    compilerr(out.output[2].toString());
    return excom;
}