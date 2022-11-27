const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const databsase = require("./database");   

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  databsase.databaseconnection();
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });