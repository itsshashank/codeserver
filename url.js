//all urls requests processed here
module.exports.setup=()=>{
    global.app.get("/",(req,res)=>
    {
        res.send("Welcome!");
    });


    global.app.get("/req",(req,res)=>
    {
        //gets request
        dbid=req.param("id");
        global.db.getsubmission(dbid)
        .then((resq)=>
        {
            global.exe.mainx(resq.rows[0]);
        });
        res.send("1");
    });


    global.app.get("/make",(req,res)=>
    {
        //make a submission
        options={};
        //required
        options.lang=req.param("lang");
        options.program=req.param("program");
        
        //optional
        options.qid=req.param("qid")||"-1";
        options.customin=req.param("customin")||true;
        options.input=req.param("input")||"";
        options.userid=req.param("userid")||"-1";
        options.testcases=req.param("testcases")||"0";

        options.progress=0;        
        a=global.db.makesubmission(options.customin,options);
        a.then((resq)=>
        {
            //respond with the dbid
            res.send(""+resq.rows[0].dbid);
        });
    });


    global.app.get("/result",(req,res)=>
    {
        //print a submission in JSON
        a=global.db.getsubmission(req.param("id"))
        .then((resq)=>
        {
            res.send(""+JSON.stringify(resq.rows[0]));
        });
    });
};