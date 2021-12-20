import React, { useRef, useEffect } from "react";

//MUI assets
import { Grid, Paper, Icon, Button } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";

const dummyData = [{
  title:"MODEL INPUT", 
  description: 'DEM file (.tiff) here | Max. 1GB',
  dummyFileName:[
    "HKI_landsileProject_MAY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
    "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
  ]
},
{
  title:"OPTIONAL MODEL INPUT", 
  description: 'Gridding must be the same as DEM | Max. 1GB',
  dummyFileName:[
  "HKI_landsileProject_MAY_idkwtimtyping_123.tiff",
  "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
  "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
  "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
  "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
]
}, 
{
  title:"TRAINING INPUT", 
  description: 'Landslide label here (.shp) | Max. 1GB',
  dummyFileName:[
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
    "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
]}
]

export default function UploadInput() {
  const hiddenModelInput = useRef();
  const hiddenOptModelInput = useRef();
  const hiddenTrainInput = useRef();

  useEffect(()=>{
    //api to get list of files from azure
    //model input
    //optional model input
    //training input
    console.log('ficl', dummyData)
  },[])

  const handleClick = (e) => {
    let eventTarget = e.target.attributes["id"].value;
    if (eventTarget === "MODEL INPUT") {
      hiddenModelInput.current.click();
    } else if (eventTarget === "OPTIONAL MODEL INPUT") {
      hiddenOptModelInput.current.click();
    } else if (eventTarget === "TRAINING INPUT") {
      hiddenTrainInput.current.click();
    }
  };

  const handleUpload = (e) => {
    console.log(e.target.files[0])
    //post request to upload to azure
  };

  return (
    <>
        <StepNavBtn title="Pre-Train Model" next="/validate-input" />
        <Grid
          container
          sx={{ mt: 3, minHeight: "60vh" }}
          justifyContent="center"
        >
          {dummyData.map(
            (txt,i) => {
              return (
                <Grid key={i} item xs={3}>
                  <Paper
                    sx={{ m: 1, mb: 1, boxShadow: 3, height: "auto" }}
                    className="d-flex flex-column justify-content-between"
                  >
                    <div>
                      <div className="pl-4 pt-4">
                        <h4 style={{ fontWeight: 650 }}>{txt.title}</h4>
                      </div>
                      <div className="d-flex pl-4">
                            <Icon
                              color="primary"
                              id={txt.title}
                              sx={{ fontSize: 50 }}
                              onClick={handleClick}
                            >
                              add_circle
                            </Icon>
                            
                        <div className="d-inline pl-1 pb-2">
                          <p className="d-inline text-primary ">Upload</p>
                          <br />
                          <p className="d-inline text-secondary">
                            <small>{txt.description}</small>
                          </p>
                        </div>
                      </div>
                      <div className="pt-3 pl-4 w-100">
                        <ul className="pl-1 w-100">
                            {txt.dummyFileName.map((file, j) => {
                                return (
                                  <li key={j} className="list-unstyled text-truncate">
                                    <p className="d-inline">
                                      {file}
                                      <br />
                                      <small className="text-secondary">
                                        Uploaded
                                      </small>
                                    </p>
                                  </li>
                                )})}
                        </ul>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center pb-4">
                      <Button variant="contained" sx={{ pl: 5, pr: 5 }}>
                        Download Sample file
                      </Button>
                    </div>
                  </Paper>
                </Grid>
              );
            }
          )}
          <input
            type="file"
            style={{ display: "none" }}
            ref={hiddenModelInput}
            onChange={handleUpload}
            accept=".tif"
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={hiddenOptModelInput}
            onChange={handleUpload}
            accept=".tif"
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={hiddenTrainInput}
            onChange={handleUpload}
            accept=".tif"
          />
        </Grid>
    </>
  );
}
