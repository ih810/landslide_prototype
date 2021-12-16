import { ShareServiceClient } from "@azure/storage-file-share";

//account name
const account = "aiat3landslidestg";

//azure website/<storage account>/Shared access signature
const sas =
  "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2021-12-02T11:35:16Z&st=2021-12-02T03:35:16Z&spr=https&sig=X3R7rlOlFU45fLoYZyT0ZjJvQl9jjLdcymWrhm%2Bf4x8%3D";

//file under the root of account
const shareName = "home";
const directoryName = "";
const fileName = "susceptibility_map.tif";

const serviceClient = new ShareServiceClient(
  // When using AnonymousCredential, following url should include a valid SAS
  `https://aiat3landslidestg.file.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2021-12-02T11:35:16Z&st=2021-12-02T03:35:16Z&spr=https&sig=X3R7rlOlFU45fLoYZyT0ZjJvQl9jjLdcymWrhm%2Bf4x8%3D`
);
//https://aiat3landslidestg.file.core.windows.net/home/susceptibility_map.tif?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2021-12-02T11:35:16Z&st=2021-12-02T03:35:16Z&spr=https&sig=X3R7rlOlFU45fLoYZyT0ZjJvQl9jjLdcymWrhm%2Bf4x8%3D
const handleBlob = async (blob) => {

  var reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  return new Promise ((resolve, reject)=>{
      reader.onloadend = (e) => {
        console.log('e',e);
        resolve(e.target.result)
      }
  })
    // reader.onloadend = async (e) => {
    //     console.log(await e.target.result)
    // return await e.target.result;
    // };
};

async function main() {
  const fileClient = await serviceClient
    .getShareClient(shareName)
    .getDirectoryClient(directoryName)
    .getFileClient(fileName);
  const downloadFileResponse = await fileClient.download(0);
//   console.log(downloadFileResponse);
//   const arrBTiff = await handleBlob(await downloadFileResponse.blobBody);
//     console.log('arrBTiff',  handleBlob(await downloadFileResponse.blobBody))
//   return await arrBTiff;
  return await downloadFileResponse.blobBody;
}

export default main;
