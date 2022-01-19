import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
// define chunk size

const uploadLargeFile = () => {

    const chunkSize = 1048576*1.8

    let fileSize = 0;
    let chunkCount = 0;
    let uploadQueue = {};
    let fileId = "";
    let fileGuid = "";
    let counter = 1;
    let beginingOfChunk = 0;
    let endOfChunk = chunkSize;
    let progress = 0;
    
    const makeChunks = (e) => {
        resetChunkProperties()
        const file = e.target.files[0]
        fileSize = file.size
    
        let totalCount = file.Size%chunkSize === 0 ? 
        file.size/chunkSize
        : 
        Math.floor(file.size/chunkSize) + 1;
    
        chunkCount = totalCount
    
        fileId = uuidv4()+"."+file.name.split('.').pop();
        fileGuid = fileId
      }
    
    const fileUpload = () => {
        counter += 1
        if(counter <= chunkCount){
            let chunk = uploadQueue.slice(beginingOfChunk, endOfChunk);
            uploadChunk(chunk)
        }
    }
    const resetChunkProperties = () => {
        progress = 0
        counter = 1
        beginingOfChunk = 0
        endOfChunk = chunkSize
      }
    const uploadChunk = async (chunk) => {
        try {
          debugger
          const response = await axios.post('api', chunk, {
            params: {
              id: counter,
              fileName: fileGuid,
            },
            headers: { 'Content-Type': 'application/json' }
          });
          debugger
          const data = response.data;
          if (data.isSuccess) {
            beginingOfChunk = endOfChunk;
            endOfChunk = endOfChunk + chunkSize;
            if (counter === chunkCount) {
              console.log('Process is complete, counter', counter)
              await uploadCompleted();
            } else {
              let percentage = (counter / chunkCount) * 100;
              progress = percentage;
            }
          } else {
            console.log('Error Occurred:', data.errorMessage)
          }
    } catch (error) {
          debugger
          console.log('error', error)
        }
      }

      const uploadCompleted = async () => {
        var formData = new FormData();
        formData.append("fileName", fileGuid);
         const response = await axios.post(
          "https://localhost:44356/weatherforecast/UploadComplete",
          {},
          {
            params: {
              fileName: fileGuid,
            },
            data: formData,
          }
        );
    const data = response.data;
        if (data.isSuccess) {
          console.log('success')
        }
      };
}
