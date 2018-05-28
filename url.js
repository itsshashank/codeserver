//all urls requests processed here
//dictionary of functions for url
module.exports.setup=()=>{
    global.app.get("/",(req,res)=>{
        res.send("HEllo");
    });
    global.app.get("/req",(req,res)=>{
        //gets request
        dbid=req.param("id");
        global.db.getsubmission(dbid,global.exe.mainx);
        res.send("1");
    });
};