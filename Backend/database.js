const sql = require("mssql");
const {sqlConfig} = require("./config.js");

let connection 
const databaseconnection = () => {
    connection = sql.connect(sqlConfig,(err)=>{
        if(err) {
            console.log(err)
        }
        else {
            console.log('Database is connected');
        }
    })
    let connectionpool = new sql.ConnectionPool(sqlConfig);
    // console.log(connection, connectionpool)
}

module.exports = {
    databaseconnection,
    connection
}