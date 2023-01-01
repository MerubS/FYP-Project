var sql = require("mssql");
const { sqlConfig } = require("../config");
const service = require("../Utils");



const CreateCandidate = ((req,res)=>{
    let {registerdata , testdata } = req.body;
    console.log(registerdata,testdata);
    let startdate = new Date();
    let enddate = service.getEndDate( startdate , testdata.timelimit , testdata.unit);
    enddate = new Date(enddate);
   
    if (registerdata.cnic && registerdata.name && registerdata.contact && registerdata.city && registerdata.email && registerdata.dob && registerdata.gender && registerdata.contact
      && testdata.test_id) {
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('cid', registerdata.cnic)
          req.input('bdate',  registerdata.dob)
          req.input('cname',  registerdata.name)
          req.input('cgender', registerdata.gender)
          req.input('contact',registerdata.contact)
          req.input('ccity', registerdata.city)
          req.input('cemail', registerdata.email)
          req.input('tid', testdata.test_id)
          req.input('tstart', startdate)
          req.input('tend', enddate)
          req.execute("CreateCandidate" , (err,result) => {
            if (err) {console.log(err)}
            console.log(result.recordset , result.rowsAffected);
            res.send({message: "Success" });
          })
    })
  }
    catch (error) {
      console.log(error)
    }
    }
    else {
      res.send({message:"Incomplete data"})
    }
})

module.exports = {
    CreateCandidate
}