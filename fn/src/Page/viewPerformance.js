import React from "react";
import StepNavBtn from "../Component/stepNavBtn";
import { Button, Grid, Paper } from "@mui/material";
import OlMap from "../Component/map";

import TrainProgress from "../assets/Visualizations/TrainProgress.png";

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
  return (
    <>
      <StepNavBtn title="Review Performance" next="/viewresults" />
      <Grid container sx={{ ml: 14, mr: 9, mb: 4 }}>
        <Grid item xs={5}>
          <Paper
            className="p-4 h-80"
            sx={{ borderRadius: "15px", boxShadow: 2 }}
          >
            <OlMap
              viewLayer={viewLayer}
              layersGroup={layersGroup}
              height={"500px"}
            />
          </Paper>
          <Grid container sx={{ pt: 3 }}>
            <Grid item xs={8}>
                <img
                  src={TrainProgress}
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
              prog
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          diu ngo
        </Grid>
      </Grid>
    </>
  );
}
