import React, { useState, useEffect } from "react";

import Prediction_LandslideCoordinates from "../assets/PredictionResults/Prediction_LandslideCoordinates.csv";

import StepNavBtn from "../Component/stepNavBtn";
import OlMap from "../Component/map";

import readCSV from "../Component/readCSV";
import queryTiff from "../Component/queryTiff";

import { GeoTIFF } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Grid, Paper } from "@mui/material";

require("dotenv").config();

const azure = {
  accName: process.env.REACT_APP_STORAGE_ACC_NAME,
  folder: "home",
  file: "colorSus_map",
  sas: process.env.REACT_APP_STORAGE_SAS_TOKEN,
};
const viewLayer = new GeoTIFF({
  sources: [
    {
      url: `https://${azure.accName}.file.core.windows.net/${azure.folder}/${
        azure.file
      }.tif${azure.sas}&xyz=${Date.now()}`,
      overview: `https://${azure.accName}.file.core.windows.net/${
        azure.folder
      }/${azure.file}_reporj.tif.ovr${azure.sas}&xyz=${Date.now()}`,
      nodata: 0,
    },
  ],
});
const layersGroup = [
  new TileLayer({
    className: "old",
    visible: true,
    opacity: 0.5,
    source: new GeoTIFF({
      sources: [
        {
          url: `https://${azure.accName}.file.core.windows.net/${
            azure.folder
          }/${azure.file}.tif${azure.sas}&xyz=${Date.now()}`,
          overview: `https://${azure.accName}.file.core.windows.net/${
            azure.folder
          }/${azure.file}_reporj.tif.ovr${azure.sas}&xyz=${Date.now()}`,
          nodata: 0,
        },
      ],
    }),
  }),
];
export default function ViewResult() {
  const [coord, setCoord] = useState();
  const [susCsv, setSusCsv] = useState();
  const [susFrequencyMap, setSusFrequencyMap] = useState([]);
  const [targetCoordSus, setTargetCoordSus] = useState([]);

  useEffect(() => {
    getSusCount(coord);
    getCsv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coord]);

  const getSusCount = async () => {
    if (coord) {
      let susCount = await queryTiff(coord);
      let barChartSusCount = [];
      for (let item in susCount["countMap"]) {
        if (item !== "len") {
          barChartSusCount.push({
            name: item,
            "Susceptibility Range": susCount["countMap"][item],
          });
        }
      }
      setSusFrequencyMap(barChartSusCount);
      setTargetCoordSus((susCount["pxSus"][0] * 100).toFixed(4));
    }
  };

  const getCsv = async () => {
    let predictionCsv = await readCSV(Prediction_LandslideCoordinates);
    setSusCsv(predictionCsv);
  };

  return (
    <>
      <Grid container sx={{ ml: 9, mr: 9 }}>
        <StepNavBtn title={"Review Results"} noForward={true} />
        <Grid container sx={{ ml: 3 }}>
          <Grid item xs={7}>
            <Paper className="p-4" sx={{ borderRadius: "10px", boxShadow: 3 }}>
              <h3 className="p-3" style={{ fontWeight: 650 }}>
                SUSCEPTIBILITY MAP
              </h3>
              <OlMap
                viewLayer={viewLayer}
                layersGroup={layersGroup}
                setCoord={setCoord}
              />
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Grid container>
              <Grid item xs={6}>
                <button onClick={getCsv}>fuck</button>
                <div>
                  <Paper>
                    <p>X Coord</p>
                    <p>{coord ? coord.click[0].toFixed() : "N/A"}</p>
                    <p>Y Coord</p>
                    <p>{coord ? coord.click[1].toFixed() : "N/A"}</p>
                  </Paper>
                </div>
                <div>
                  <Paper>
                    <p>Sus!</p>
                    <p>{coord ? `${targetCoordSus}%` : "N/A"}</p>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>csv</div>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Paper sx={{ width: "100%", height: "400px" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={susFrequencyMap}
                      width={500}
                      height={300}
                      margin={{
                        top: 50,
                        right: 40,
                        left: 0,
                        bottom: 20,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <CartesianGrid />
                      <Bar dataKey="Susceptibility Range" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
