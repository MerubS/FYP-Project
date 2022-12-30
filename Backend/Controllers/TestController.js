var sql = require("mssql");
const { sqlConfig } = require("../config");

const getAllTest = ((req,res)=>{
    try {sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('eid', 1)
            req.execute("getAllTest" , (err,result) => {
              console.log("Recordset" , result.recordset);
              res.send({message: "Success"});
            })
      })
    }
      catch (error) {
        console.log(error)
      }
})

const getTestbyId = ((req,res)=>{
    try {
    let testid = req.query.id;
    console.log(testid)
    sql.connect(sqlConfig)    
    .then(function () {
        console.log('CONNECTED');
        var req = new sql.Request();
        req.verbose = true;
        req.input('tid',  testid)
        req.execute("getTestbyId" , (err,result) => {
          if (err) {console.log(err);}
          console.log("Recordset" , result.recordset);
          res.send({message: "Success"});
        })
  })
}
  catch (error) {
    console.log(error)
  }})

const CreateTest = ((req,res)=>{
    try {
        let {name , description, nquestions, difficulty,timelimit , unit , selectedques } = req.body;
        sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('tname',name)
            req.input('tdes',  description)
            req.input('tnques',  nquestions)
            req.input('tdifficulty',difficulty)
            req.input('ttlimit',timelimit)
            req.input('tunit', unit)
            req.input('tstatus','created')
            req.input('tid', 10)
            req.input('teid', 1)
            req.execute("CreateTest" , (err,result) => {
              if (err) {console.log(err);}
              console.log("Recordset" , result.recordset);
              res.send({message: "Success"});
            })
      })
    }
      catch (error) {
        console.log(error)
      }
})

const UpdateTest = ((req,res)=> {
    try {
        let {name , description, nquestions, difficulty,timelimit , unit , selectedques , test_id } = req.body;
        sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('tname', name)
              req.input('tdes', description)
              req.input('tnques', nquestions)
              req.input('tdifficulty', difficulty)
              req.input('ttlimit', timelimit)
              req.input('tunit', unit)
              req.input('tstatus', 'created')
              req.input('tid', test_id)
              req.input('teid',  1)
            req.execute("UpdateTest" , (err,result) => {
              console.log("Recordset" , result.recordset);
              res.send({message: "Success"});
            })
      })
    }
      catch (error) {
        console.log(error)
      }
})

const DeleteTest = ((req,res)=>{
    let questionid = req.query.id;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('qid', questionid)
          req.input('eid' , 1)
          req.execute("DeleteQuestion" , (err,result) => {
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
    getAllTest,
    getTestbyId,
    CreateTest,
    UpdateTest,
    DeleteTest
}