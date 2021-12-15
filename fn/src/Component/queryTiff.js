import susceptibility_map from "../assets/susceptibility_map.tif";
import { fromArrayBuffer } from "geotiff";

export default async function queryTiff(coord) {
  return new Promise((resolve) => {
    //start hash map
    const countMap = {
      0.1: 0,
      0.2: 0,
      0.3: 0,
      0.4: 0,
      0.5: 0,
      0.6: 0,
      0.7: 0,
      0.8: 0,
      0.9: 0,
      len: 0,
    };

    const readTif = async (tifFile) => {
      let clickcorX = coord.click[0];
      let clickcorY = coord.click[1];

      //read targeted area
      const rasterSus = await tifFile.readRasters({
        bbox: coord.extent,
      });
      console.log('extent', coord.extent)
      //read clicked px
      const pxSus = await tifFile.readRasters({
        bbox: [clickcorX, clickcorY, clickcorX + 20, clickcorY + 20],
      });

      //filter unwanted data && count range
      for (let i = 0; i < rasterSus[0].length; i++) {
        if (rasterSus[0][i] < 0.1) continue;
        else if (rasterSus[0][i] < 0.2 && rasterSus[0][i] > 0.15) {
          countMap["0.1"]++;
          countMap["len"]++;
        } else if (rasterSus[0][i] < 0.3 && rasterSus[0][i] > 0.2) {
          countMap["0.2"]++;
          countMap["len"]++;
        } else if (rasterSus[0][i] < 0.4 && rasterSus[0][i] > 0.3) {
          countMap["0.3"]++;
          countMap["len"]++;
        } else if (rasterSus[0][i] < 0.5 && rasterSus[0][i] > 0.4) {
          countMap["0.4"]++;
          countMap["len"]++;
        } else if (rasterSus[0][i] < 0.6 && rasterSus[0][i] > 0.5) {
          countMap["0.5"]++;
          countMap["len"]++;
        } else if (rasterSus[0][i] < 0.7 && rasterSus[0][i] > 0.6) {
          countMap["0.6"]++;
          countMap["len"]++;
        } else if (rasterSus[0][i] < 0.8 && rasterSus[0][i] > 0.7) {
          countMap["0.7"]++;
          countMap["len"]++;
        } else if (rasterSus[0][i] < 0.9 && rasterSus[0][i] > 0.8) {
          countMap["0.8"]++;
          countMap["len"]++;
        } else if (rasterSus[0][i] < 1 && rasterSus[0][i] > 0.9) {
          countMap["0.9"]++;
          countMap["len"]++;
        }
      }
      resolve({ countMap: countMap, pxSus: pxSus });
    };

    const requestTif = async () => {
      let tifFile;

      //send an req to get the file
      var request = new XMLHttpRequest();

      request.open("GET", susceptibility_map, true);
      request.responseType = "blob";

      request.onload = function () {
        //read file
        var reader = new FileReader();
        reader.readAsArrayBuffer(request.response);
        reader.onloadend = async (e) => {
          tifFile = await fromArrayBuffer(e.target.result);
          await readTif(tifFile);
        };
      };
      request.send();
    };
    requestTif();
  });
}
