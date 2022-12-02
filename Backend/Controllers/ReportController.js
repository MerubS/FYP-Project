var sql = require("mssql");
const { sqlConfig } = require("../config");

const retrievereports = (req,res) => {
    try {
        sql.connect(sqlConfig)    
        .then(function () {
            var req = new sql.Request();
            req.verbose = true;
            req.query('SELECT report.test_id + report.candidate_id AS id, report.per_face,Report.per_gaze,Report.per_object,report.score,Test.name as testname, Candidate.name from Report , candidate , Test where Candidate.candidate_id = Report.candidate_id AND Report.test_id = Test.test_id').then(function (recordset) {
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
    retrievereports
}