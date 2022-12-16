const sql = require("mssql");
const {sqlConfig} = require("./config.js");

// class databaseconnection {
//   async getConnection() {
//     try {
//         let connection = await sql.connect(sqlConfig,(err)=>{
//             if(err) {
//                 console.log(err)
//             }
//             else {
//                 console.log('Database is connected');
//             }
//         })
//         return connection
//     }
//     catch (error) {
//         console.log(error)
//     }
//   }
// }

const databaseconnection = () => {
    connection = sql.connect(sqlConfig,(err)=>{
        if(err) {
            console.log(err)
        }
        else {
            console.log('Database is connected');
        }
    })
}

module.exports = {databaseconnection};