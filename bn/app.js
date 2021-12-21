const express = require("express");
const app = express();
const http = require("http").createServer(app);
const axios = require("axios");
const cors = require("cors");
const AzureStorageFileShare = require("@azure/storage-file-share");
const {
  ShareServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-file-share");
app.use(cors({ origin: "*" }));
require("dotenv").config();
const azure = {
  accName: process.env.ACC_NAME,
  folder: "home",
  file: "colorSus_map",
  sas: process.env.SAS_KEY,
};
const credential = new StorageSharedKeyCredential(
  process.env.ACC_NAME,
  process.env.ACC_KEY
);
console.log(credential);
const serviceClient = new ShareServiceClient(
  `https://${process.env.ACC_NAME}.file.core.windows.net`,
  credential
);
console.log(serviceClient);

app.get("/", (req, res) => {
  res.send(credential);
});
app.get("/1", (req, res) => {
  res.send(credential);
});

//Setup Server
http.listen(8080, () => {
  console.log("app listening on port 8080");
});
