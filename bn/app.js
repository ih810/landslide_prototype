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
  generateFileSASQueryParameters,
  AccountSASPermissions,
} = require("@azure/storage-file-share");
app.use(cors({ origin: "*" }));
require("dotenv").config();

// Enter your storage account name and shared key
const account = process.env.ACC_NAME;
const accountKey = process.env.ACC_KEY;

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new StorageSharedKeyCredential(account, accountKey);
console.log(credential)
const serviceClient = new ShareServiceClient(
  // When using AnonymousCredential, following url should include a valid SAS
  `https://${account}.file.core.windows.net/`,
  credential
);
const fileClient = new AzureStorageFileShare.ShareFileClient(
  `https://${account}.file.core.windows.net/data/HongKongLiDAR2011_DEMO/Output/Visualizations/TrainProgress.png`,
  credential
  )
  const fileClient1 = new AzureStorageFileShare.ShareFileClient(
    `https://${account}.file.core.windows.net/home/colorSus_map.tif`,
    credential
    )
  
console.log('file cunt;,',fileClient)
const fileprop = fileClient.generateSasUrl({
  'permissions': "r",
  'expiresOn': new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  'version': '2020-08-04'
})
const fileprop1 = fileClient1.generateSasUrl({
  'permissions': "r",
  'expiresOn': new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  'version': '2020-08-04'
})
const properties = serviceClient.generateAccountSasUrl(new Date(), new AccountSASPermissions({'read':true}), "sco");

console.log(fileprop)
console.log(fileprop1)
console.log(properties)

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
