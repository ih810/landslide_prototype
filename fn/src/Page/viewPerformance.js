import React, { useState, useEffect } from "react";
import StepNavBtn from "../Component/stepNavBtn";
import OlMap from "../Component/map";

import trainProgress from "../assets/Visualizations/TrainProgress.png";
import modelAccuracytxt from "../assets/Visualizations/Accuracy.txt";
import precisionRecallF1 from "../assets/Visualizations/PrecisionRecallFscore.csv";
import confusionMatrixCsv from "../assets/Visualizations/ConfusionMatrix.csv";

import readTxt from "../util/readTxt";
import readCSV from "../util/readCSV";

import {
  Button,
  Grid,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

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
  const [modelAccuracy, setModelAccuracy] = useState();
  const [modelPerformance, setModelPerformance] = useState();
  const [confusionMatrix, setConfusionMatrix] = useState();
  const [metricSelection, setMetricSelection] = useState(true);

  useEffect(() => {
    handleModelStat();
  }, []);

  const handleModelStat = async () => {
    setModelAccuracy(
      (parseFloat(await readTxt(modelAccuracytxt)) * 100).toFixed(2)
    );

    processPerformanceGroup(await readCSV(precisionRecallF1))
    processConfusionGroup(await readCSV(confusionMatrixCsv))
  };

  const processPerformanceGroup = async (performanceCsvArr) => {
    const modelPerformanceGroup = performanceCsvArr
      .filter((row) => row["Landslide"] !== undefined)
      .map((row) => {
        if (row[""] !== "Support") {
          row["Landslide"] = (parseFloat(row["Landslide"]) * 100).toFixed(2);
          row["NotLandslide"] = (parseFloat(row["NotLandslide"]) * 100).toFixed(
            2
          );
        }
        return row;
      });
    setModelPerformance(modelPerformanceGroup);
  }

  const processConfusionGroup = (confusionCsvArr) => {
    const confusionGroup = confusionCsvArr
    .filter((row) => row[""] !== "")
    .map((row)=>{
        row[""] = row[""]
        .split("_")
        .join(' ')
        .split(/(?=[A-Z])/)
        .join(' ')
        console.log(row)
        return row
    })

    setConfusionMatrix(confusionGroup)
  }

  const handleSwitch = (e) => {
    setMetricSelection(!metricSelection);
  };
  return (
    <>
      <StepNavBtn title="Review Performance" next="/viewresults" />
      <Grid container sx={{ ml: 14, mr: 9, mb: 4, mt: 4 }}>
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
          <Grid
            container
            sx={{ pt: 3 }}
            className="d-flex justify-content-between"
            spacing={3}
          >
            <Grid item lg={7} md={12} xs={12} sx={{ pb: 1 }}>
              <Paper
                sx={{ borderRadius: "10px", boxShadow: 2, height: "100%" }}
              >
                <img
                  src={trainProgress}
                  alt="train_progres"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Paper>
            </Grid>
            <Grid item lg={5} md={12} xs={12} sx={{ pb: 1 }}>
              <Paper
                sx={{ borderRadius: "10px", boxShadow: 2, height: "100%" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="pt-3 pl-3">
                    <h4>Model Performance</h4>
                    <p>Accuracy: {modelAccuracy}%</p>
                  </div>
                  <div>
                    <Switch
                      checked={metricSelection}
                      onChange={handleSwitch}
                    ></Switch>
                  </div>
                </div>
                <Table aria-label="simple table">
                    {metricSelection?
                    <>
                        <TableHead>
                            <TableRow>
                            <TableCell>Metrics</TableCell>
                            <TableCell align="right">Landslide</TableCell>
                            <TableCell align="right">Not Landslide</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {modelPerformance
                                ? modelPerformance.map((row, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                        {row[""]}
                                        </TableCell>
                                        {row[""] === "Support" ? (
                                        <>
                                            <TableCell align="right">
                                            {row["Landslide"]}
                                            </TableCell>
                                            <TableCell align="right">
                                            {row["NotLandslide"]}
                                            </TableCell>
                                        </>
                                        ) : (
                                        <>
                                            <TableCell align="right">
                                            {row["Landslide"]}%
                                            </TableCell>
                                            <TableCell align="right">
                                            {row["NotLandslide"]}%
                                            </TableCell>
                                        </>
                                        )}
                                    </TableRow>
                                    ))
                                : 
                                null
                            }
                        </TableBody>
                    </>
                    :
                    <>
                    <TableHead>
                            <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">Positive Prediction</TableCell>
                            <TableCell align="right">Negative Prediction</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {confusionMatrix
                                ? confusionMatrix.map((row, i) => (
                                    <TableRow
                                        key={i}
                                        sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                        {row[""]}
                                        </TableCell>
                                        <TableCell align="right">
                                        {row["Landslide_pred"]}
                                        </TableCell>
                                        <TableCell align="right">
                                        {row["NotLandslide_pred"]}
                                        </TableCell>
                                    </TableRow>
                                    ))
                                : 
                                null
                            }
                        </TableBody>
                    </>
                    }
                  
                </Table>
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
