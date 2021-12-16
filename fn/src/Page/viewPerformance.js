import React, { useEffect } from "react";
import StepNavBtn from "../Component/stepNavBtn";
import { Button, Grid, Paper } from "@mui/material";
import OlMap from "../Component/map";

import trainProgress from "../assets/Visualizations/TrainProgress.png";
import accuracy from "../assets/Visualizations/Accuracy.txt";

import readTxt from '../util/readTxt'

//Open Layers
import { GeoTIFF } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";

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
export default function ViewPerformance() {

    useEffect(()=>{
        readTxt(accuracy)
    })
  return (
    <>
      <StepNavBtn title="Review Performance" next="/viewresults" />
      <Grid container sx={{ ml: 14, mr: 9, mb: 4 }}>
        <Grid item xs={7}>
          <Paper
            className="p-4 h-80"
            sx={{ borderRadius: "15px", boxShadow: 2 }}
          >
            <h3>SUSCEPTIBILITY MAP</h3>
            <OlMap
              viewLayer={viewLayer}
              layersGroup={layersGroup}
              height={"500px"}
            />
          </Paper>
          <Grid container sx={{ pt: 3 }} className="d-flex justify-content-between">
            <Grid item xs={8} sx={{ pr:1 }}>
                <img
                  src={trainProgress}
                  alt="train_progres"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: '15px',
                    boxShadow: '1px 1px 1px grey'
                  }}
                />
            </Grid>
            <Grid item xs={4}>
              <Paper>
                  uhga
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          diu ngo
        </Grid>
      </Grid>
    </>
  );
}
