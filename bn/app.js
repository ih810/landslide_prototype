const express = require("express");
const app = express();
const http = require("http").createServer(app);
const axios = require("axios");
const crypto = require('crypto');
const cors = require("cors");
const AzureStorageFileShare = require("@azure/storage-file-share");
const {
  ShareServiceClient,
  StorageSharedKeyCredential,
  generateAccountSASQueryParameters
} = require("@azure/storage-file-share");
app.use(cors({ origin: "*" }));
require("dotenv").config();
const azure = {
  accName: process.env.ACC_NAME,
  folder: "home",
  file: "colorSus_map",
  sas: process.env.SAS_KEY,
};
var generateSasToken = function(resourceUri, signingKey, expiresInMins) {
  resourceUri = encodeURIComponent(resourceUri);

  // Set expiration in seconds
  var expires = (Date.now() / 1000) + expiresInMins * 60;
  expires = Math.ceil(expires);
  var toSign = resourceUri + '\n' + expires;

  // Use crypto
  var hmac = crypto.createHmac('sha256', Buffer.from(signingKey, 'base64'));
  hmac.update(toSign);
  var base64UriEncoded = encodeURIComponent(hmac.digest('base64'));

  // Construct authorization string
  var token = "SharedAccessSignature sr=" + resourceUri + "&sig="
  + base64UriEncoded + "&se=" + expires;
  return token;
};
const token = generateSasToken('https://aiat3landslidestg.file.core.windows.net', process.env.ACC_KEY, 10)
console.log(token)

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
