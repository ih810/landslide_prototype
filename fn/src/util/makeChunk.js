import { v4 as uuidv4 } from "uuid";
import axios from "axios";
// define chunk size
const chunkSize = 1048576 * 1.8;

let fileSize = 0;
let chunkCount = 0;
let uploadQueue = {};
let fileId = "";
let fileGuid = "";
let counter = 1;
let beginingOfChunk = 0;
let endOfChunk = chunkSize;
let progress = 0;

function uploadLargeFile (e) {
  console.log('e', e)
  if(e){
    console.log('enter')
    resetChunkProperties();
    const file = e.target.files[0];
    fileSize = file.size;
    console.log('file', file)
    
    let totalCount =
      file.Size % chunkSize === 0
        ? file.size / chunkSize
        : Math.floor(file.size / chunkSize) + 1;
      console.log('total chunk', totalCount)
  
    chunkCount = totalCount;
    uploadQueue = file
    fileId = uuidv4() + "." + file.name.split(".").pop();
    fileGuid = fileId;
    console.log('file id', fileId)
    fileUpload(e.target.files[0].name)
  } else {
    console.log('why the fuck did this ran?')
  }
};

const resetChunkProperties = () => {
  progress = 0;
  counter = 1;
  beginingOfChunk = 0;
  endOfChunk = chunkSize;
};

const fileUpload = (fileName) => {
  console.log('current count', counter)
  console.log('current queue', uploadQueue)
  if (counter <= chunkCount) {
    let chunk = uploadQueue.slice(beginingOfChunk, endOfChunk);
    console.log('current chunk',counter, ':', chunk)
    uploadChunk(chunk, fileName);
  }
};

const uploadChunk = async (chunk, fileName) => {
  console.log('uploading chunk', chunk)
  try {
    // debugger;
    const response = await axios.post(`${process.env.REACT_APP_BN}/upload-input/upload`, chunk, {
      params: {
        id: counter,
        fileName: fileName,
        input_type: 'model',
        project_id: 'upload_test_1'
      },
      headers: { "Content-Type": "application/json" },
    });
    // debugger;
    const data = response.data;
    console.log(data)
    if (data.isSuccess) {
      beginingOfChunk = endOfChunk;
      endOfChunk = endOfChunk + chunkSize;
      if (counter === chunkCount) {
        console.log("Process is complete, counter", counter);
        // uploadCompleted()
      } else {
        let percentage = (counter / chunkCount) * 100;
        progress = percentage;
        counter += 1;
        // fileUpload();
      }
    } else {
      console.log("Error Occurred:", data.errorMessage);
    }
  } catch (error) {
    // debugger;
    // console.log("error", error);
  }
};
// const uploadCompleted = async () => {
//     var formData = new FormData();
//     formData.append("fileName", fileGuid);
//      const response = await axios.post(
//       "https://localhost:44356/weatherforecast/UploadComplete",
//       {},
//       {
//         params: {
//           fileName: fileGuid,
//         },
//         data: formData,
//       }
//     );
//     const data = response.data;
//     if (data.isSuccess) {
//         progress = 100;
//     }
//   };

export default uploadLargeFile;