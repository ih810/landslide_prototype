import React, { useState }from "react";

//Open layers
import { GeoTIFF } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";

//MUI assets
import { Button, Grid, Paper } from "@mui/material";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";
import OlMap from "../Component/map";


require("dotenv").config();
const azure = {
  accName: process.env.REACT_APP_STORAGE_ACC_NAME,
  folder: "home",
  file: "colorSus_map",
  sas: process.env.REACT_APP_STORAGE_SAS_TOKEN,
};

export default function ValidateInput() {
  const [landSlideLocation, setLandSlideLocation] = useState(false);
  const [elevationModel, setElevationModel] = useState(false);
  const [streetMap, setStreetMap] = useState(false);
  const [terrain, setTerrain] = useState(false);
  const [satelite, setSatelite] = useState(false);

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
  const layersGroup = [
    new TileLayer({
      className: 'Landslide Location',
      visible: landSlideLocation,
      opacity: 0.5,
      source: new GeoTIFF({
        sources: [
          {
            url: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/redColorSus_map.tif${azure.sas}&xyz=${Date.now()}`,
            overview: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/redColorSus_map.tif.ovr${azure.sas}&xyz=${Date.now()}`,
            nodata: 0,
          },
        ],
      }),
    }),
    new TileLayer({
      className: 'Elevation Model',
      visible: elevationModel,
      opacity: 0.5,
      source: new GeoTIFF({
        sources: [
          {
            url: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/elevation_merged_color_reporj.tif${azure.sas}&xyz=${Date.now()}`,
            overview: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/elevation_merged_color_elevation_merged_color_reporj.tif.ovr${azure.sas}&xyz=${Date.now()}`,
            nodata: 0,
          },
        ],
      }),
    }),
    new TileLayer({
      className: 'Street Map',
      visible: streetMap,
      opacity: 0.5,
      source: new GeoTIFF({
        sources: [
          {
            url: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/yellowColorSus_map.tif${azure.sas}&xyz=${Date.now()}`,
            overview: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/yellowColorSus_map.tif.ovr${azure.sas}&xyz=${Date.now()}`,
            nodata: 0,
          },
        ],
      }),
    }),
    new TileLayer({
      className: 'Terrain',
      visible: terrain,
      opacity: 0.5,
      source: new GeoTIFF({
        sources: [
          {
            url: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/grenbluColorSus_map.tif${azure.sas}&xyz=${Date.now()}`,
            overview: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/grenbluColorSus_map.tif.ovr${azure.sas}&xyz=${Date.now()}`,
            nodata: 0,
          },
        ],
      }),
    }),
    new TileLayer({
      className: 'Satelite',
      visible: satelite,
      opacity: 0.5,
      source: new GeoTIFF({
        sources: [
          {
            url: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/prupleColorSus_map.tif${azure.sas}&xyz=${Date.now()}`,
            overview: `https://${azure.accName}.file.core.windows.net/${
              azure.folder
            }/prupleColorSus_map.tif.ovr${azure.sas}&xyz=${Date.now()}`,
            nodata: 0,
          },
        ],
      }),
    }),
  ];
  const formGroupItems = [
    "Landslide Location",
    "Elevation Model",
    "Street Map",
    "Terrain",
    "Satelite",
  ];

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


  return (
    <>
        <StepNavBtn title="Validate Input" next="/viewresults" noForward={true}/>
      <Grid container className="d-flex justify-content-between" sx={{ ml: 13, mr: 9, mb:4}}>
        <Grid item xs={11}>
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
            <div className="pl-4 pt-4">
              <h2>DATA CHECKING</h2>
              <p className="font-weight-bold">Please check if the data is correctly located on the map</p>
            </div>
            <div className="d-flex h-100" id='mapContainer'>
              <OlMap 
              layersGroup={layersGroup} 
              viewLayer={viewLayer}
              />
              <div className="pt-4">
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
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={1} className="d-flex justify-content-end align-self-end" >
          <div>
            <Button variant="contained" ><p className="pl-4 pr-4 m-0">Run</p></Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
