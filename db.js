'use strict'

const {Pool} = require('pg');
const link = new Pool({
    user: 'dravog',
    host: 'localhost',
    database: 'dravog',
    password: 'lightfighters@7',
    port: 5432,
  });
module.exports.getsubmission=(dbid,callback)=>{
    link.query("SELECT * FROM SUBMISSION WHERE DBID="+dbid,(err,res)=>{
        //convert submission res to an object
        console.log(res.rows[0])
        callback(res.rows[0]);
    });
}