const sql = require('mssql');
const { sqlConfig } = require("../config");

const CreateReport = ((req,res)=> {
    let {question, answers, testid , canid } = req.body;
    let totalquestion = question.length;
        let correctanswers = 0;
        let rans ;
        answers.map((a)=>{
          rans = a.value + '' + a.id + ','    
          var r = question.find(item => item.question_id[0] === a.id)
          if (r.answer == a.value) {
            correctanswers++
          }
        })
      let score = (correctanswers/totalquestion)*100;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('tid', testid )
          req.input('cid',  canid)
          req.input('rscore',  score )
          req.input('ranswers', rans )
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

const getAllReport = ((req,res)=> {
    let examinerid = req.query.id;
    if (examinerid) {
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('eid', examinerid)
          req.execute("getAllReport" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success", output:result.recordset});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  }
  else {
    res.send({message:"Incomplete data"});
  }
})


module.exports = {
    CreateReport,
    getAllReport
}