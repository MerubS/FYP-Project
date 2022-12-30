const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const databsase = require("./database"); 
const test = require("./Controllers/TestController");  
const report = require("./Controllers/ReportController");
const question = require ("./Controllers/QuestionController");
const reportroute = require("./Routes/Report.js");
const questionroute = require("./Routes/Question.js");
const candidateroute = require("./Routes/Candiate");
const testroute = require("./Routes/Test");
var sql = require("mssql");
const { sqlConfig } = require("./config");
var cors = require('cors')

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  databsase.databaseconnection();
});

app.use(cors());
app.use(express.json());
app.use('/api/report',reportroute);
app.use('/api/question', questionroute);
app.use('/api/candidate', candidateroute);
app.use('/api/test' , testroute);
