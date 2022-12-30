var sql = require("mssql");
const { sqlConfig } = require("../config");

const getAllQuestion = ((req,res)=>{
    try {sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('eid' , 2)
            req.execute("getAllQuestion" , (err,result) => {
              console.log("Recordset" , result.recordset);
              res.send({message: "Success"});
            })
      })
    }
      catch (error) {
        console.log(error)
      }
})

const getQuestionbyId = ((req,res)=>{
    let questionid = req.query.id;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('qid',questionid)
          req.input('eid', 1)
          req.execute("getQuestionbyId" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
})

const CreateQuestion = ((req,res)=>{
    let {question , difficulty , option1, option2,option3 , option4 , answer} = req.body;
    let options = option1.concat(",",option2).concat(",",option3).concat(",",option4)
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('qquestion',question)
          req.input('qdifficulty', difficulty)
          req.input('qoptions', options)
          req.input('qanswer',answer)
          req.input('qid', 13)
          req.input('eid', 1)
          req.execute("CreateQuestion" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
})

const UpdateQuestion = ((req,res)=>{
    try {
        let {question_id , question , answer , difficulty , option1 , option2 , option3 , option4 } = req.body;
        let options = option1.concat(",",option2).concat(",",option3).concat(",",option4);
        sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('qquestion',question)
            req.input('qdifficulty', difficulty)
            req.input('qoptions', options)
            req.input('qanswer',answer)
            req.input('qid',question_id)
            req.input('eid', 1)
            req.execute("UpdateQuestion" , (err,result) => {
              console.log("Recordset" , result.recordset);
              res.send({message: "Success"});
            })
      })
    }
      catch (error) {
        console.log(error)
      }
})

const DeleteQuestion = ((req,res)=>{
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
    getAllQuestion,
    getQuestionbyId,
    CreateQuestion,
    UpdateQuestion,
    DeleteQuestion
}