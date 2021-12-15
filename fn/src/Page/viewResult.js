import React, { useState, useEffect } from "react";

import Prediction_LandslideCoordinates from "../assets/PredictionResults/Prediction_LandslideCoordinates.csv";

import StepNavBtn from "../Component/stepNavBtn";
import OlMap from "../Component/map";

import readCSV from "../Component/readCSV";
import queryTiff from "../Component/queryTiff";

import { GeoTIFF } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
import { Grid, Paper, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

require("dotenv").config();
const columns = [
  { field: "x", headerName: "X", width: 100 },
  { field: "y", headerName: "Y", width: 100 },
  { field: "sus", headerName: "sus", width: 170 },
];
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
    getSusCount();
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
    let predictionCsv = await readCSV(Prediction_LandslideCoordinates, coord);
    setSusCsv(predictionCsv);
  };

  return (
    <>
      <Grid container sx={{ ml: 9, mr: 9 }}>
        <StepNavBtn title={"Review Results"} noForward={true} />
        <Grid container sx={{ ml: 5, mt: 4 }}>
          <Grid item lg={7} md={12} className="pb-5">
            <Paper
              className="p-4 h-100"
              sx={{ borderRadius: "15px", boxShadow: 2 }}
            >
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
          <Grid item lg={5} md={12}>
            <Grid container className="d-flex justify-content-between">
              <Grid item lg={4} md={4} className="pl-4 pr-4">
                <div>
                  <Paper sx={{ borderRadius: "10px", boxShadow: 2}}>
                    <div className="p-4 text-truncate font-weight-bold">
                      <p> X coordinate</p>
                      <p className="text-secondary">
                        {coord ? coord.click[0].toFixed(2) : <br />}
                      </p>
                      <p> Y coordinate</p>
                      <p className="text-secondary">
                        {coord ? coord.click[1].toFixed(2) : <br />}
                      </p>
                    </div>
                  </Paper>
                </div>
                <div>
                  <Paper sx={{ borderRadius: "10px", boxShadow: 2, mt: 4 }}>
                    <div className="p-3 text-truncate font-weight-bold">
                      <p className="text-truncate">
                        Landslide
                        <br /> Susceptibility
                      </p>
                      <p className="text-secondary">
                        {coord ? `${targetCoordSus}%` : <br />}
                      </p>
                    </div>
                  </Paper>
                </div>
              </Grid>
              <Grid item lg={8} md={8}>
                <Paper sx={{ borderRadius: "10px", boxShadow: 2, height:'100%'}}>
                  <div style={{ width: "100%", height: "100%" }}>
                    {susCsv ? (
                      <DataGrid
                        rows={susCsv}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                      />
                    ) : null}
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Grid container sx={{ pl: 3, pt: 5 }}>
              <Grid item lg={12} md={12}>
                <Paper
                  sx={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "10px",
                    boxShadow: 2,
                  }}
                >
                  <div style={{ width: "100%", height: "100%" }}>
                    <div className="d-flex justify-content-between">
                      <div className="pt-4 pl-4">
                        <h4 style={{ fontWeight: 650 }}>
                          INTERACTIVE STATISTICS
                        </h4>
                        <p style={{ color: "#A5A5A5" }}>
                          Landslide Susceptibility
                        </p>
                      </div>
                      <div className="pr-5 pt-4">
                        <Button variant="contained">Download CSV</Button>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height="80%" minHeight={'10%'}>
                      <ComposedChart
                        data={susFrequencyMap}
                        width={500}
                        height={300}
                        margin={{
                          top: 20,
                          right: 40,
                          left: 0,
                          bottom: 50,
                        }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid />
                        <dataSeries />
                        <Line
                          type="monotone"
                          dataKey="Susceptibility Range"
                          stroke="#00E6FF"
                        />
                        <Bar
                          dataKey="Susceptibility Range"
                          barSize={25}
                          fill="#5E9AC7"
                          shape={<Rectangle radius={10} />}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
