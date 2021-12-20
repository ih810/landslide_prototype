const express = require("express");
const app = express();
const http = require("http").createServer(app);
const axios = require("axios");
const cors = require("cors");
const GeoTIFF = require('geotiff');
app.use(cors({origin:'*'}));

require("dotenv").config();
const azure = {
  accName: process.env.ACC_NAME,
  folder: "home",
  file: "colorSus_map",
  sas: process.env.SAS_KEY,
};

app.get("/", (req, res) => {
    console.log('0')
    axios
    .get(
        `https://${azure.accName}.file.core.windows.net/${
            azure.folder
          }/prupleColorSus_map.tif${azure.sas}&xyz=${Date.now()}`
    )
    .then((response) => {
        res.writeHead(200,response.headers);
        res.write(response.data);
        res.end(response.data)
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/1", (req, res) => {
    console.log('1')
  axios
    .get(
        `https://${azure.accName}.file.core.windows.net/${
            azure.folder
          }/prupleColorSus_map.tif.ovr${azure.sas}&xyz=${Date.now()}`
    )
    .then((response) => {
        res.writeHead(200, response.headers);
        res.write(response.data);
        res.end(response.data)
    })
    .catch((err) => {
      console.log(err);
    });
});

//Setup Server
http.listen(8080, () => {
  console.log("app listening on port 8080");
});
