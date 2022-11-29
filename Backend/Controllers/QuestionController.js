var sql = require("mssql");
const { sqlConfig } = require("../config");

const retrievequestions = (req,res) => {
    try {
        sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.query('select *,question_id as id from question').then(function (recordset) {
                console.log('COMPLETE');
                console.dir(recordset);
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

module.exports = {
    retrievequestions
}