function cliproc()
{
    arr=[]
    proc={flags:{"q":false},lang:"",file:"",folder:"",testcases:""};
    len=process.argv.length;
    for(let i=2;i<len;i++)
    {
        p=process.argv[i];
        if(p[0]=="-")
            //flag
            proc.flags[p.substr(1)]=true;
        else
            arr.push(p);
    }
    proc.lang=arr[0];
    proc.file=arr[1];
    if(!proc.flags["q"])
    {
        proc.testcases=arr[2];
        proc.folder=arr[3];
    }
    else
        proc.folder=arr[2];
    return proc;
}

proc=cliproc();
fs=require("fs");
cli=require("child_process");
/*node exe.js lang filename [testcases] folder [flags]
flags are
-q --if given. evaluates as not a submission for a question. stdout the output
*/

lang=require("./lang.js");
process.chdir(proc.folder);
excom=lang[proc.lang](proc.file);
if(!proc.flags.q)
{
    for(let i=0;i<=proc.testcases;i++)
    {
        filename=i+".txt";
        ex=excom.command+" < "+filename;
        command="time firejail --quiet --net=none --private="+proc.folder+" timeout "+excom.t+"s "+ex;
        command=command.split(" ");
        args=command.slice(1);
        command=command[0];
        out=cli.spawnSync(command,args,
                {"cwd":proc.folder
            });
        output=out.output[1].toString();
        fs.writeFileSync(i+".out",output);
        //console.log(out.output[2].toString()); //needs to be processed
        //update db
    }
}
else
{
    ex=excom.command+"<0.txt";
    command="time firejail --quiet --net=none --private="+proc.folder+" timeout "+excom.t+"s "+ex;
    command=command.split(" ");
        args=command.slice(1);
        command=command[0];
        out=cli.spawnSync(command,args,
                {"cwd":proc.folder
            });
        console.log(out.output[1].toString());
}