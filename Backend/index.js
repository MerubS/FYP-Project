const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const databsase = require("./database"); 
const test = require("./Controllers/TestController");  
const report = require("./Controllers/ReportController");
const question = require ("./Controllers/QuestionController");
var sql = require("mssql");
const { sqlConfig } = require("./config");
var cors = require('cors')

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  databsase.databaseconnection();
});

app.use(cors());
app.use(express.json());

app.get("/api/getQuestionbyTestid", (req,res)=>{
  console.log("Retreived by Test id" , req.query.id);
 let testid = req.query.id;
 try {
  sql.connect(sqlConfig)    
  .then(function () {
      console.log('CONNECTED');
      var req = new sql.Request();
      req.verbose = true;
      req.input('tid', sql.Int , testid)
      req.query('Select * from Question , Testcontains where testcontains.question_id = question.question_id AND testcontains.test_id = @tid').then(function (recordset) {
        res.json(recordset);
      })
      .catch(function (err) {
          console.error(err);
      });

}) }
catch (error) {
  console.log(error)
}
})


app.get("/api/retreive",(req,res)=>{
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
})


app.get("/api/deletetest",(req,res)=>{
  console.log("Retreived by Test id" , req.query.id);
  let testid = req.query.id;
  try {
    sql.connect(sqlConfig)    
    .then(function () {
        console.log('CONNECTED');
        var req = new sql.Request();
        req.verbose = true;
        req.input('tid',sql.Int, testid)
        req.query('Delete from Test where test_id = @tid;').then(function () {
            res.json({message: 'Deleted'});
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
})


app.get("/api/deletequestion",(req,res)=>{
  console.log("Retreived by Question id" , req.query.id);
  let questionid = req.query.id;
  try {
    sql.connect(sqlConfig)    
    .then(function () {
        console.log('CONNECTED');
        var req = new sql.Request();
        req.verbose = true;
        req.input('qid',sql.Int, questionid)
        req.query('Delete from Question where question_id = @qid;').then(function () {
            res.json({message: 'Deleted'});
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
})

app.get("/api/retrievereports",(req,res)=>{
  console.log("Retreive Reports")
  report.retrievereports(req,res);
})

app.get("/api/retrievequestions",(req,res)=>{
  question.retrievequestions(req,res);
})

app.get("/api/getbyidTest",(req,res)=>{
 console.log("Retreived by Test id" , req.query.id);
 let testid = req.query.id;
 try {
  sql.connect(sqlConfig)    
  .then(function () {
      console.log('CONNECTED');
      var req = new sql.Request();
      req.verbose = true;
      req.input('tid', sql.Int , testid)
      req.query('select * from test where test_id = @tid').then(function (recordset) {
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
})

app.post('/api/inserttest', express.json() , function(req,res) {
    console.log(req.body);
    try {
      let {name , description, nquestions, difficulty,timelimit , unit , selectedques } = req.body;
      sql.connect(sqlConfig)    
      .then(function () {
          var req = new sql.Request();
          req.verbose = true;
          let query = `INSERT INTO Test (test_id, examiner_id ,status, name, description , no_questions , difficulty , timelimit , unit ) VALUES (@tid,@teid, @tstatus, @tname, @tdes ,@tnques , @tdifficulty ,@ttlimit, @tunit)`;
          req.input('tname', sql.NChar(30) , name)
          req.input('tdes', sql.Text , description)
          req.input('tnques', sql.Numeric(18,0), nquestions)
          req.input('tdifficulty',sql.Char(10), difficulty)
          req.input('ttlimit', sql.Numeric(18,0), timelimit)
          req.input('tunit',sql.NChar(10),unit)
          req.input('tstatus',sql.NChar(10),'created')
          req.input('tid', sql.Int , 9)
          req.input('teid', sql.Int , 1)
          req.query(query, (err, rows) => {
                if (err) throw err;
                console.log("Row inserted with id");
                res.send({message: "Test Saved"});
            });
          selectedques.map((q)=>{
          req.query(`INSERT INTO TestContains (test_id, question_id ) VALUES (@tid,${q.question_id})`, (err, rows) => {
                  if (err) throw err;
                  console.log("Row inserted with id");
                  // res.send({message: "Question Saved"});
              });  
            console.log("Question is",q.question_id)})
      })
      .catch(function (err) {
          console.error(err);
      });
  }
  catch (error) {
      console.log(error)
  }
} );
const changetomillisecs = (start_date , timelimit , unit) => {
  let msecs;  
  if (unit == 'min       ') {
      msecs = timelimit*60*1000;
    }
    else if (unit == 'hr       ' ) {
      msecs = timelimit*60*60*1000;
    }
    let end_date = start_date.getTime() + msecs ;
    end_date = new Date (end_date);
    return end_date;
}


app.post('/api/updatetest', express.json() , function(req,res) {
  console.log(req.body);
  try {
    let {test_id , status , timelimit , unit } = req.body;
    sql.connect(sqlConfig)    
    .then(function () {
        var req = new sql.Request();
        req.verbose = true;
        if (status == 'started') {
          let start_date = new Date();
          console.log(start_date)
          let end_date = changetomillisecs(start_date , timelimit , unit);
        let query = `UPDATE Test SET status = @tstatus, start_date = @tsdate , end_date = @tedate WHERE test_id = @tid`;
        req.input('tstatus', sql.NChar(10) , status)
        req.input('tid', sql.Int , test_id)
        req.input('tsdate' , sql.DateTime , start_date)
        req.input('tedate', sql.DateTime , end_date)
        req.query(query, (err, rows) => {
              if (err) throw err;
              console.log("Row Update Successfully");
              res.send({message: "Status Changed"});
          });
        }
      else if (status == 'ended') {
        let query = `UPDATE Test SET status = @tstatus WHERE test_id = @tid`;
        req.input('tstatus', sql.NChar(10) , status)
        req.input('tid', sql.Int , test_id)
        req.query(query, (err, rows) => {
              if (err) throw err;
              console.log("Row Update Successfully");
              res.send({message: "Status Changed"});
          });
      }
    })
    .catch(function (err) {
        console.error(err);
    });
}
catch (error) {
    console.log(error)
}
} );

app.post('/api/updatequesdetails', express.json(), function(req,res) {
  try {
    let {question_id , question , answer , difficulty , option1 , option2 , option3 , option4 } = req.body;
    let options = option1.concat(",",option2).concat(",",option3).concat(",",option4);
    console.log(question_id,question,answer,difficulty,option1,option2,option3,option4);
    sql.connect(sqlConfig)    
    .then(function () { 
      var req = new sql.Request();
      req.verbose = true;
      let query = `UPDATE Question SET difficulty = @qdifficulty , answer = @qanswer , question = @qquestion , options = @qoptions where question_id = @qid`
      req.input('qquestion', sql.Text , question)
      req.input('qdifficulty', sql.NChar(10) , difficulty)
      req.input('qoptions', sql.Text, options)
      req.input('qanswer',sql.Text, answer)
      req.input('qid',sql.Int,question_id)
      req.query(query, (err, rows) => {
        if (err) throw err;
        console.log("Row inserted with id");
        res.send({message: "Question Updated"});
    });
    })
    .catch(function (err) {
      console.error(err);
  });  
  }
  catch (error) {
    console.log(error)
  }
})


app.post('/api/generatereport', express.json(), function(req,res) {
    try {
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
    console.log("Correct Answers are", correctanswers)
    console.log("Score is", (correctanswers/totalquestion)*100)
      sql.connect(sqlConfig)    
        .then(function () {
            var req = new sql.Request();
            req.verbose = true;
            let query = `UPDATE REPORT SET test_id = @tid ,  candidate_id = @cid , score = @rscore , answers = @ranswers`;
            req.input('tid', sql.Int , testid )
            req.input('cid', sql.Int , canid)
            req.input('rscore', sql.Decimal, score )
            req.input('ranswers',sql.Text, rans )
            req.query(query, (err, rows) => {
                  if (err) throw err;
                  console.log("Row inserted with id");
                  res.send({message: "Test Updated"});
              });
    }) 
  }
    catch (error) {
      console.log(error)
    }     
})

app.post('/api/updatetestdetails', express.json(), function(req,res) {
  try {
    let {name , description, nquestions, difficulty,timelimit , unit , selectedques , test_id } = req.body;
    console.log(name,description,nquestions,difficulty,timelimit,unit,selectedques,test_id);
    sql.connect(sqlConfig)    
      .then(function () {
          var req = new sql.Request();
          req.verbose = true;
          let query = `UPDATE Test SET name = @tname ,  description = @tdes , no_questions = @tnques , difficulty = @tdifficulty , timelimit = @ttlimit , unit = @tunit  WHERE test_id = @tid`;
          req.input('tname', sql.NChar(30) , name)
          req.input('tdes', sql.Text , description)
          req.input('tnques', sql.Numeric(18,0), nquestions)
          req.input('tdifficulty',sql.Char(10), difficulty)
          req.input('ttlimit', sql.Numeric(18,0), timelimit)
          req.input('tunit',sql.NChar(10),unit)
          req.input('tstatus',sql.NChar(10),'created')
          req.input('tid', sql.Int , test_id)
          req.input('teid', sql.Int , 1)
          req.query(query, (err, rows) => {
                if (err) throw err;
                console.log("Row inserted with id");
                res.send({message: "Test Updated"});
            });
            selectedques.map((q)=>{
              req.query(`SELECT 1 AS result FROM TestContains WHERE test_id = @tid AND question_id = ${q.question_id}`).then(function (recordset) {
                console.log(recordset.rowsAffected[0])
                if (recordset.rowsAffected[0] == 0 ) {
                  console.log(" Does not Exists");
                  req.query(`INSERT INTO TestContains (test_id, question_id ) VALUES (@tid,${q.question_id})`, (err, rows) => {
                    if (err) throw err;
                    console.log("Row inserted with id");
                });
                }
                console.dir(recordset);
            }) 
                console.log("Question is",q.question_id)})
  }) }
  catch (error) {
    console.log(error)
  }
})


app.post('/api/insertcandidate', express.json(),  function (req, res) {
  try {
    let {cnic , name , city , email , contact , dob , gender } = req.body;
    sql.connect(sqlConfig)    
    .then(function () {
        var req = new sql.Request();
        req.verbose = true;
        let query = `INSERT INTO Candidate (candidate_id, gender , dob , name , email , city ) VALUES (@cid, @cgender ,@bdate , @cname ,@cemail , @ccity)`;
        req.input('cid', sql.Numeric , cnic)
        req.input('bdate', sql.Date , dob)
        req.input('cname', sql.NVarChar(30), name)
        req.input('cgender',sql.Char(1), gender)
        req.input('ccity', sql.NVarChar(30), city)
        req.input('cemail',sql.NVarChar(50),email)
        req.query(query, (err, rows) => {
              if (err) throw err;
              console.log("Row inserted with id");
              res.send({message: "Candidate registered"});
          });
    })
    .catch(function (err) {
        console.error(err);
    });
}
catch (error) {
    console.log(error)
}
});


app.post('/api/insertquestion', express.json() , function(req,res) {
  console.log(req.body);
  try {
    let {question , difficulty , option1, option2,option3 , option4 , answer} = req.body;
    let options = option1.concat(",",option2).concat(",",option3).concat(",",option4)
    console.log(options)
    sql.connect(sqlConfig)    
    .then(function () {
        var req = new sql.Request();
        req.verbose = true;
        let query = `INSERT INTO Question (question_id, examiner_id , difficulty , answer , question , options  ) VALUES (@qid , @eid , @qdifficulty , @qanswer , @qquestion , @qoptions)`;
        req.input('qquestion', sql.Text , question)
        req.input('qdifficulty', sql.NChar(10) , difficulty)
        req.input('qoptions', sql.Text, options)
        req.input('qanswer',sql.Text, answer)
        req.input('qid', sql.Int, 10)
        req.input('eid',sql.Int, 1)
        req.query(query, (err, rows) => {
              if (err) throw err;
              console.log("Row inserted with id");
              res.send({message: "Test Saved"});
          });
    }
    )
    .catch(function (err) {
        console.error(err);
    });
}
catch (error) {
    console.log(error)
}
} );
