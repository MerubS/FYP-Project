var sql = require("mssql");
const { sqlConfig } = require("../config");


// var retreiveQuery = function (query, res) {
//     sql.connect(sqlConfig, function (err) {
//         if (err) {
//             console.log("Error while connecting database :- " + err);
//             res.send(err);
//         } else {
//             // create Request object
//             var request = new sql.Request();
//             // query to the database
//             request.query(query, function (err, ress) {
//                 if (err) {
//                     console.log("Error while querying database :- " + err);
//                     res.send(err);
//                 } else {
//                     res.json(ress);
//                 }
//             });
//         }
//     });
// }
const retrievetests = (req,res) => {
    try {
        sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.query('select *,test_id as id from test').then(function (recordset) {
                console.log('COMPLETE');
                // console.dir(recordset);
                res.json(recordset);
            })
            .catch(function (err) {
                console.error(err);
            });
        })
        .catch(function (err) {
            console.error(err);
        });
    }
    catch (error) {
        console.log(error)
    }
}
const inserttest = (req,res) => {
    try{

    }
    catch {

    }
}
module.exports = {
    retrievetests,
    inserttest
}