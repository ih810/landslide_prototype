import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//Open layers
import { GeoTIFF } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";

//MUI assets
import { Button, Grid, Paper } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";
import OlMap from "../Component/map";

import axios from 'axios';
//proj4
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { get as getProjection } from "ol/proj";

const azure = {
  accName: process.env.REACT_APP_STORAGE_ACC_NAME,
  folder: "home",
  file: "colorSus_map",
  sas: process.env.REACT_APP_STORAGE_SAS_TOKEN,
};

//define projection
proj4.defs(
  "EPSG:2326",
  "+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs"
);
proj4.defs(
  "EPSG:3857",
  "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
);
register(proj4);

getProjection("EPSG:2326");
getProjection("EPSG:3857");

export default function ValidateInput(props) {
  const [landSlideLocation, setLandSlideLocation] = useState(false);
  const [elevationModel, setElevationModel] = useState(false);
  const [streetMap, setStreetMap] = useState(false);
  const [terrain, setTerrain] = useState(false);
  const [satelite, setSatelite] = useState(false);
  const [layersGroup, setLayersGroup] = useState()
  const history = useHistory();
  //declare layer source
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
 
  const formGroupItems = [
    "Landslide Location",
    "Elevation Model",
    "Street Map",
    "Terrain",
    "Satelite",
  ];
  const elevationLayers = []
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BN}/validate-input/layers?project_id=${props.match.params.project_name}`)
    .then((response)=>{
      console.log(response)
      for(let i = 0; i < response.data.layers[0].length; i++){
        elevationLayers.push({
          url: response.data.layers[0][i].layer_url,
          overview: response.data.layers[0][i].ovr_url,
          nodata: 0,
          projection: "EPSG:3857",
        })
      }
    })
  .then(()=>{
    console.log('lg', elevationLayers)
    setLayersGroup([
      new TileLayer({
        className: "new",
        visible: true,
        opacity: 0.5,
        source: new GeoTIFF({
          sources: elevationLayers
        }),
      }),
    ])
  })
  },[])
  const handleClick = (e, item) => {
    if (item === "Landslide Location") {
      setLandSlideLocation(!landSlideLocation);
    } else if (item === "Elevation Model") {
      setElevationModel(!elevationModel);
    } else if (item === "Street Map") {
      setStreetMap(!streetMap);
    } else if (item === "Terrain") {
      setTerrain(!terrain);
    } else if (item === "Satelite") {
      setSatelite(!satelite);
    }
  };

  const runPorject = (e) => {
    //api here

    //
    history.push(`/view-performance/${props.match.params.project_name}`)
  }
  return (
    <>
      <StepNavBtn title="Validate Input" noForward={true} />
      <Grid
        container
        className="d-flex justify-content-between"
        sx={{ ml: 13, mr: 5, mb: 4 }}
      >
        <Grid item xs={12}>
          <Paper
            sx={{
              m: 1,
              boxShadow: 3,
              height: "100%",
              bgColor: "#FFFFF",
              borderRadius: "5px",
            }}
            className="d-flex flex-column justify-content-between"
          >
            <div className="pl-4 pt-3">
              <h2>DATA CHECKING</h2>
              <p className="font-weight-bold mb-0">
                Please check if the data is correctly located on the map
              </p>
            </div>
            <div className="d-flex h-100" id="mapContainer">
              <OlMap
                layersGroup={layersGroup}
                viewLayer={viewLayer}
                height={"700px"}
              />
              <div className="pt-4 d-flex flex-column justify-content-between">
                <FormGroup>
                  {formGroupItems.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={(e) => {
                              handleClick(e, item);
                            }}
                            sx={{ color: "#000" }}
                          />
                        }
                        label={item}
                      />
                    );
                  })}
                </FormGroup>
                <div>
                  <Button variant="contained" className="pl-5 pr-5 ml-2 mb-4" onClick={runPorject}>
                    Run
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
