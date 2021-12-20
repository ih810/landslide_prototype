import React, { useState } from "react";

//MUI assets
import { Grid, Paper } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";
import CircleChart from "../Component/circleChrat";

const gridSpacing = { mt: 2, maxWidth: "120vh" };
const spacebw = "d-flex justify-content-between pb-4";

export default function NewModelSetting() {
  const [sampleData, setSampleData] = useState([
    { value: 2000000, fill: "#76DCD6", name: "Sample Height" },
    { value: 2000000, fill: "#9daba9", name: "Sample Width" },
    { value: 2000000, fill: "#db74d4", name: "Negative Samples Ratio" },
    { value: 2000000, fill: "#637cf7", name: "Low Contrast Ratio" },
  ]);
  const [trainData, setTrainData] = useState([
    { value: 80, fill: "#76DCD6", name: "Training" },
    { value: 10, fill: "#9daba9", name: "Validation" },
    { value: 10, fill: "#db74d4", name: "Testing" },
  ]);

  const handleSampleChange = (e) => {
    let newArr = [...sampleData];
    let value = parseInt(e.target.value);
    if (e.target.attributes["id"].value === "Sample Height") {
      newArr[0].value = value;
    } else if (e.target.attributes["id"].value === "Sample Width") {
      newArr[1].value = value;
    } else if (e.target.attributes["id"].value === "Negative Samples Ratio") {
      newArr[2].value = value;
    } else {
      newArr[3].value = value;
    }
    setSampleData(newArr);
  };

  const handleTrainChange = (e) => {
    console.log("change");
    console.log(e.target.attributes["id"]);
    let newArr = [...trainData];
    let value = parseInt(e.target.value);
    if (e.target.attributes["id"].value === "Training Samples Ratio") {
      newArr[0].value = value;
    } else if (e.target.attributes["id"].value === "Validate Samples Ratio") {
      newArr[1].value = value;
    } else if (e.target.attributes["id"].value === "Test Sample Ratio") {
      newArr[2].value = value;
    }
    setTrainData(newArr);
  };

  return (
    <>
      <StepNavBtn title="Train New Model" next="/upload-files" />
      <Grid container sx={{ ml: 15, mr: 9, mb:4 }}>
        <Grid item xs={8} sx={{ pb: 0, pr: 3 }}>
          <Grid container sx={gridSpacing} className="sampling-container">
            <Grid
              item
              xs={8}
              sx={{ pl: 5, pr: 5 }}
              className="sampling-input h-100"
            >
              <Paper sx={{ p: 2, pl: 5 }}>
                <h3 className="pb-5" style={{ fontWeight: 650 }}>
                  SAMPLING
                </h3>
                {[
                  "Sample Height",
                  "Sample Width",
                  "Negative Samples Ratio",
                  "Low Contrast samples ratio",
                ].map((txt, i) => {
                  return (
                    <div className={spacebw} key={i}>
                      <label htmlFor={txt}>{txt}</label>
                      <input
                        style={{
                          minWidth: "0px",
                        }}
                        type="number"
                        value={sampleData[i].value}
                        id={txt}
                        onChange={handleSampleChange}
                      />
                    </div>
                  );
                })}
              </Paper>
            </Grid>
            <Grid
              item
              xs={4}
              className="sampling-pie d-flex flex-column justify-content-center align-items-center"
              sx={{ bgcolor: "#393939", borderRadius: "10px", minHeight: "350px", maxHeight:'400px'}}
            >
              <div className="pt-3">
                <p style={{ color: "#FFF" }}>SAMPLING</p>
              </div>
              <CircleChart data={sampleData} />
            </Grid>
          </Grid>
          <Grid container sx={gridSpacing} className="train-container">
            <Grid item xs={8} sx={{ pl: 5, pr: 5 }} className="train-input ">
              <Paper sx={{ p: 2, pl: 5, height: "auto" }}>
                <h3 className="pb-5" style={{ fontWeight: 650 }}>
                  Train
                </h3>
                {[
                  "Training Samples Ratio",
                  "Validate Samples Ratio",
                  "Test Sample Ratio",
                ].map((txt, i) => {
                  return (
                    <div className={spacebw} key={i}>
                      <label htmlFor={txt}>{txt}</label>
                      <input
                        style={{
                          minWidth: "0px",
                        }}
                        type="number"
                        value={trainData[i].value}
                        id={txt}
                        onChange={handleTrainChange}
                      />
                    </div>
                  );
                })}
              </Paper>
            </Grid>
            <Grid
              item
              xs={4}
              className="train-pie d-flex flex-column justify-content-center align-items-center"
              sx={{
                bgcolor: "#393939",
                borderRadius: "10px",
                minHeight: '350px',
                maxHeight: '390px'
              }}
            >
              <div className="pt-3">
                <p style={{ color: "#FFF" }}>TRAIN</p>
              </div>
              <CircleChart data={trainData} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{ mt: 2 }}>
          <Paper sx={{ p: 3, height: "auto", pb:4 }}>
            {[
              "Convolutional-Layers",
              "Dense Layers",
              "Convolutional Kernel Size",
              "Max Pooling Layer Size",
              "Drop Out Rate",
            ].map((txt, i) => {
              return (
                <div className='d-flex flex-column p-3' key={i}>
                    <label htmlFor={txt}>{txt}</label>
                    <input
                      style={{
                        minWidth: "0px",
                      }}
                      type="number"
                      id={txt}
                      onChange={handleSampleChange}
                    />
                </div>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
