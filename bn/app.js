const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.get('/', (req, res)=>{
    console.log(req)
})

//Setup Server
http.listen(8080, () => {
    console.log("app listening on port 8080");
  });