const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const databsase = require("./database"); 
const test = require("./Controllers/TestController");  
const report = require("./Controllers/ReportController");
const question = require ("./Controllers/QuestionController");
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  databsase.databaseconnection();
  // report.retrievereports(req,res);
  // test.retreiveQuery();
  // app.use("/api/retrievereports",(req,res)=>{
  //   report.retrievereports(req,res);
  // })

});

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

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });