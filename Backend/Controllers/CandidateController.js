var sql = require("mssql");
const { sqlConfig } = require("../config");

const CreateCandidate = ((req,res)=>{
    let {cnic , name , city , email , contact , dob , gender } = req.body;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('cid', sql.Numeric , cnic)
          req.input('bdate', sql.Date , dob)
          req.input('cname', sql.NVarChar(30), name)
          req.input('cgender',sql.Char(1), gender)
          req.input('ccity', sql.NVarChar(30), city)
          req.input('cemail',sql.NVarChar(50),email)
          req.execute("CreateCandidate" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
})

module.exports = {
    CreateCandidate
}