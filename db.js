'use strict'

const {Pool} = require('pg');
const link = new Pool({
    user: 'dravog',
    host: 'localhost',
    database: 'dravog',
    password: 'lightfighters@7',
    port: 5432,
  });

link.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    link.end();
  });

module.exports.getsubmission=(dbid)=>{
    link.query("SELECT * FROM SUBMISSION WHERE ID="+dbid,(err,res)=>{
        //convert submission res to an object
        console.log(err,res);
    });
}