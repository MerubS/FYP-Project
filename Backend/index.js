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
  // report.retrievereports(req,res);
  // test.retreiveQuery();
  // app.use("/api/retrievereports",(req,res)=>{
  //   report.retrievereports(req,res);
  // })

});

app.use(cors());
app.use(express.json());
app.get("/api/retreive",(req,res)=>{
test.retrievetests(req,res);
})

app.get("/api/retrievereports",(req,res)=>{
  console.log("Retreive Reports")
  report.retrievereports(req,res);
})

app.get("/api/retrievequestions",(req,res)=>{
  question.retrievequestions(req,res);
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
          req.input('tid', sql.Int , 7)
          req.input('teid', sql.Int , 1)
          req.query(query, (err, rows) => {
                if (err) throw err;
                console.log("Row inserted with id");
                res.send({message: "Test Saved"});
            });
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
