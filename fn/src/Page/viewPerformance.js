import React, { useState, useEffect } from "react";
import StepNavBtn from "../Component/stepNavBtn";
import OlMap from "../Component/map";

import dummyRect from '../assets/high-resolution-black-background-08.jpg'

import axios from 'axios'

import {
  Grid,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
} from "@mui/material";

//Open Layers
import { GeoTIFF } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";
import {register} from 'ol/proj/proj4';
import {get as getProjection, transformExtent} from 'ol/proj';
//proj4
import proj4 from "proj4";

//define projection
proj4.defs(
  "EPSG:2326",
  "+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs"
);
proj4.defs(
  "EPSG:3857",
  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
);
register(proj4)

const proj2326 = getProjection('EPSG:2326');
// proj2326.setExtent([795233.5770899998, 794267.8361200001, 872991.5360700004, 853188.3580900002])
const proj3857 = getProjection('EPSG:3857');
// proj3857.setExtent([-20026376.39, -20048966.10, 20026376.39, 20048966.10])

const azure = {
  accName: process.env.REACT_APP_STORAGE_ACC_NAME,
  folder: "home",
  file: "colorSus_map",
  sas:process.env.REACT_APP_STORAGE_SAS_TOKEN
};

export default function ViewPerformance(props) {
  const [modelAccuracy, setModelAccuracy] = useState();
  const [modelPerformance, setModelPerformance] = useState();
  const [confusionMatrix, setConfusionMatrix] = useState();
  const [metricSelection, setMetricSelection] = useState(true);
  const [coord, setCoord] = useState()
  const [image, setImage] = useState()
  const [viewLayer, setViewLayer] = useState();
  const [layersGroup, setLayersGroup] = useState();
  useEffect(() => {
    handleModelStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModelStat = async () => {
    axios.get(`${process.env.REACT_APP_BN}/view-performance/info?project_id=${props.match.params.project_name}`)
    .then((response)=>{
      let tempModelStatistic=response.data.model_performance
      // accuracy
      setModelAccuracy((parseFloat(tempModelStatistic.accuracy)*100).toFixed(2))
      // confusion matrix
      setConfusionMatrix(tempModelStatistic.confusion_matrix)
      // metrics
      setModelPerformance(tempModelStatistic.metrics)
      // train progress (png)
      setImage(tempModelStatistic.train_progress)
    })
    axios.get(`${process.env.REACT_APP_BN}/view-performance/layers?project_id=${props.match.params.project_name}`)
    .then((response)=>{
      console.log(response.data.layers.layers_url)
      console.log(response.data.layers.ovr_url)
      setViewLayer(
        new GeoTIFF({
          sources: [
            {
              url: response.data.layers.layers_url,
              overview: response.data.layers.ovr_url,
              nodata: 0,
              projection: 'EPSG:3857'
            },
          ],
        })
      ) ;
      setLayersGroup([
        new TileLayer({
          className: "old",
          visible: true,
          opacity: 0.5,
          source: new GeoTIFF({
            sources: [
              {
                url: response.data.layers.layers_url,
                overview: response.data.layers.ovr_url,
                nodata: 0,
                projection: 'EPSG:3857'
              },
            ],
          }),
        }),
      ]);
    })
  };

  const handleSwitch = (e) => {
    setMetricSelection(!metricSelection);
  };
  console.log()
  return (
    <>
      <StepNavBtn title="Review Performance" next={`/view-results/${props.match.params.project_name}`} />
      <Grid container sx={{ m:3, ml: 14 }}>
        <Grid item md={4} xs={12} >
          <Paper
            className="p-4 h-80"
            sx={{ borderRadius: "15px", boxShadow: 2 }}
          >
            <h3 style={{fontWeight: 650}}>SUSCEPTIBILITY MAP</h3>
            <OlMap
              viewLayer={viewLayer}
              layersGroup={layersGroup}
              setCoord={setCoord}
              height={"500px"}
            />
          </Paper>
          <Grid
            container
            sx={{ pt: 3 }}
            className="d-flex justify-content-between"
            spacing={3}
          >
            <Grid item xs={12} sx={{ pb: 1 }}>
              <Paper
                sx={{ borderRadius: "10px", boxShadow: 2, height: "100%" }}
              >
                <img
                  src={image}
                  alt="train_progres"
                  style={{
                    paddingTop: "24px",
                    width: '100%',
                    height: '100%',
                    maxWidth: "100%",
                    borderRadius: "10px",
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} sx={{ pb: 1 }}>
              <Paper
                sx={{ borderRadius: "10px", boxShadow: 2, height: "100%" }}
              >
                <div className="d-flex justify-content-between">
                  <div className="pt-3 pl-3">
                    <h4>Model Performance</h4>
                    <p>Accuracy: {modelAccuracy}%</p>
                  </div>
                  <div className="pt-3 pr-3">
                    <Switch
                      checked={metricSelection}
                      onChange={handleSwitch}
                    ></Switch>
                  </div>
                </div>
                <TableContainer sx={{ maxHeight: 400, width:'auto', maxWidth:'350' }}>
                <Table aria-label="simple table">
                  {metricSelection ? (
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
                          ? modelPerformance.map((metricsRow, i) => (
                              <TableRow
                                key={i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {metricsRow[""]}
                                </TableCell>
                                {metricsRow[""] === "Support" ? (
                                  <>
                                    <TableCell align="right">
                                      {metricsRow["Landslide"]}
                                    </TableCell>
                                    <TableCell align="right">
                                      {metricsRow["NotLandslide"]}
                                    </TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell align="right">
                                      {(parseFloat(metricsRow["Landslide"])*100).toFixed(2)}%
                                    </TableCell>
                                    <TableCell align="right">
                                      {(parseFloat(metricsRow["NotLandslide"])*100).toFixed(2)}%
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            ))
                          : null}
                      </TableBody>
                    </>
                  ) : (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="right">
                            Landslide Prediction
                          </TableCell>
                          <TableCell align="right">
                            No Landslide Prediction
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {confusionMatrix
                          ? confusionMatrix.map((matrixRow, i) => (
                              <TableRow
                                key={i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {matrixRow[""]}
                                </TableCell>
                                <TableCell align="right">
                                  {matrixRow['Landslide_pred']}
                                </TableCell>
                                <TableCell align="right">
                                  {matrixRow['NotLandslide_pred']}
                                </TableCell>
                              </TableRow>
                            ))
                          : null}
                      </TableBody>
                    </>
                  )}
                </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8} sm={12} sx={{ pl:4, pb:1}}>
          <Paper sx={{ borderRadius: "10px", boxShadow: 2, height: "auto" }}>
            <div className="pl-3 pt-3">
                <h3 style={{ fontWeight: 650 }}>PREDICTION REVIEW</h3>
                <div className="row">
                    <div className="col col-6">
                        <p>Elevation</p>
                    </div>
                    <div className="col col-6">
                        <p>Aspect</p>
                    </div>
                </div>
            </div>
              {[
                "image_1",
                "image_2",
                "image_3",
              ].map((content, i) => {
                return (
                  <div className="row pl-3 pr-3" key={i} >
                    <div className="col col-lg-6 col-md-12 p-3">
                      <img
                        src={dummyRect}
                        alt="elevation"
                        style={{ maxWidth: "100%", maxHeight:'100%', borderRadius:'10px' }}
                      />
                    </div>
                    <div className="col col-lg-6 col-md-12 col-sm-12 p-3">
                      <img
                        src={dummyRect}
                        alt="aspect"
                        style={{ maxWidth: "100%", maxHeight:'100%', borderRadius:'10px' }}
                      />
                    </div>
                  </div>
                );
              })}
              <Grid container sx={{ pl:4, pb:4 }}>
                  <Grid item lg={4} xs={12}>
                        <p>X Coordinate: {coord? coord.click[0].toFixed(2):null}</p>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                        <p>Y Coordinate: {coord? coord.click[1].toFixed(2):null}</p>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                        <p>XXXXXXXXXXXX</p>
                  </Grid>
              </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
