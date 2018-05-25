'use strict'

const {Pool} = require('pg');
const link = new Pool({
    user: process.env.DBuser,
    host: process.env.DBhost,
    database: process.env.DBdatabase,
    password: process.env.DBpassword,
    port: process.env.DBport,
  });
module.exports.getsubmission=(dbid,callback)=>{
    link.query("SELECT * FROM SUBMISSION WHERE DBID="+dbid,(err,res)=>{
        //convert submission res to an object
        console.log(res.rows[0])
        callback(res.rows[0]);
    });
}