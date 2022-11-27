const sql = require("mssql");
const {sqlConfig} = require("./config.js");

const databaseconnection = () => {
    let connection = sql.connect(sqlConfig,(err)=>{
        if(err) {
            console.log(err)
        }
        else {
            console.log('Database is connected');
        }
    })
}

module.exports = {
    databaseconnection
}