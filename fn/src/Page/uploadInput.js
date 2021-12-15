import React, { useRef } from "react";

//MUI assets
import { Grid, Paper, Icon, Button } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";

//Dummy data
const dummyFileName = [
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
];
const dummyFileName1 = [
  "HKI_landsileProject_MAY_idkwtimtyping_123.tiff",
  "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
  "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
  "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
  "HKI_landsileProject_MaY_idkwtimtyping_123.tiff",
];
const dummyFileName2 = [
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
  "HKI_landsileProject_MaY_idkwtimtyping_123.shp",
];

export default function UploadInput() {
  const hiddenModelInput = useRef();
  const hiddenOptModelInput = useRef();
  const hiddenTrainInput = useRef();

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

  const handleUpload = (e) => {};

  return (
    <>
      <Grid container sx={{ ml: 9, mr: 9 }}>
        <StepNavBtn title="Pre-Train Model" next="/validateInput" />
        <Grid
          container
          sx={{ mt: 3, minHeight: "60vh" }}
          justifyContent="center"
        >
          {["MODEL INPUT", "OPTIONAL MODEL INPUT", "TRAINING INPUT"].map(
            (txt) => {
              return (
                <Grid item xs={3}>
                  <Paper
                    sx={{ m: 1, mb: 1, boxShadow: 3, height: "auto" }}
                    className="d-flex flex-column justify-content-between"
                  >
                    <div>
                      <div className="pl-4 pt-4">
                        <h4 style={{ fontWeight: 650 }}>{txt}</h4>
                      </div>
                      <div className="d-flex pl-4">
                        {txt === "MODEL INPUT" ? (
                          <>
                            <Icon
                              color="primary"
                              id={txt}
                              sx={{ fontSize: 50 }}
                              onClick={handleClick}
                            >
                              add_circle
                            </Icon>
                            <input
                              type="file"
                              style={{ display: "none" }}
                              ref={hiddenModelInput}
                              onChange={handleUpload}
                              accept=".tif"
                            />
                            <div className="d-inline pl-1 pb-2">
                              <p className="d-inline text-primary ">Upload</p>
                              <br />
                              <p className="d-inline text-secondary">
                                <small>DEM file (.tiff) here | Max. 1GB</small>
                              </p>
                            </div>
                          </>
                        ) : txt === "OPTIONAL MODEL INPUT" ? (
                          <>
                            <Icon
                              color="primary"
                              id={txt}
                              sx={{ fontSize: 50 }}
                              onClick={handleClick}
                            >
                              add_circle
                            </Icon>
                            <input
                              type="file"
                              style={{ display: "none" }}
                              ref={hiddenOptModelInput}
                              onChange={handleUpload}
                              accept=".tif"
                            />
                            <div className="d-inline pl-1 pb-2">
                              <p className="d-inline text-primary">
                                Upload Additional File
                              </p>
                              <br />
                              <p className="d-inline text-secondary">
                                <small>
                                  Gridding must be the same as DEM | Max. 1GB
                                </small>
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Icon
                              color="primary"
                              id={txt}
                              sx={{ fontSize: 50 }}
                              onClick={handleClick}
                            >
                              add_circle
                            </Icon>
                            <input
                              type="file"
                              style={{ display: "none" }}
                              ref={hiddenTrainInput}
                              onChange={handleUpload}
                              accept=".shp"
                            />
                            <div className="d-inline pl-1 pb-2">
                              <p className="d-inline text-primary">Upload</p>
                              <br />
                              <p className="d-inline text-secondary">
                                <small>
                                  Landslide label here (.shp) | Max. 1GB
                                </small>
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="pt-3 pl-4 w-100">
                        <ul className="pl-1 w-100">
                          {txt === "MODEL INPUT"
                            ? dummyFileName.map((file) => {
                                return (
                                  <li className="list-unstyled text-truncate">
                                    <p className="d-inline">
                                      {file}
                                      <br />
                                      <small className="text-secondary">
                                        Uploaded
                                      </small>
                                    </p>
                                  </li>
                                );
                              })
                            : txt === "OPTIONAL MODEL INPUT" ? dummyFileName1.map((file) => {
                                return (
                                  <li className="list-unstyled text-truncate">
                                    <p className="d-inline">
                                      {file}
                                      <br />
                                      <small className="text-secondary">
                                        Uploaded
                                      </small>
                                    </p>
                                  </li>
                                );
                              })
                            :  dummyFileName2.map((file) => {
                                return (
                                  <li className="list-unstyled text-truncate">
                                    <p className="d-inline">
                                      {file}
                                      <br />
                                      <small className="text-secondary">
                                        Uploaded
                                      </small>
                                    </p>
                                  </li>
                                );
                              })}
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
        </Grid>
      </Grid>
    </>
  );
}
