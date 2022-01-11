import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//MUI assets
import { Grid, Paper } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";
import CircleChart from "../Component/circleChrat";

const gridSpacing = { mt: 2, maxWidth: "120vh" };
const spacebw = "d-flex justify-content-between pb-4";

export default function NewModelSetting(props) {
  const history = useHistory();
  const [samplingData, setsamplingData] = useState([
    { value: 2000000, fill: "#76DCD6", name: "Sample Height" },
    { value: 2000000, fill: "#9daba9", name: "Sample Width" },
    { value: 50, fill: "#db74d4", name: "Negative Samples Ratio" },
    { value: 0, fill: "#637cf7", name: "Low Contrast Samples Ratio" },
  ]);
  const [pieChartData, setPieChartData] = useState([
    {name: 'Negative Sample Ratio', value: 50, fill: "#db74d4"},
    {name: 'Negative Low Contrast', value: 0, fill: "#9daba9"},
    {name: 'Positive Sample Ratio', value: 50, fill: "#76DCD6"},
  ]);
  const [trainData, setTrainData] = useState([
    { value: 80, fill: "#76DCD6", name: "Training" },
    { value: 10, fill: "#9daba9", name: "Validation" },
    { value: 10, fill: "#db74d4", name: "Testing" },
  ]);
  const [optionConfig, setOptionConfig] = useState([
    {label:"Convolutional-Layers", value:""},
    {label:"Dense Layers", value:""},
    {label:"Convolutional Kernel Size", value:""},
    {label:"Max Pooling Layer Size", value:""},
    {label:"Drop Out Rate", value:""},
  ]);

  const handlePieChange = (e) => {
    if(e.target.value === ''){
      return
    } else {
      //format data
      let pieChart = [...pieChartData];
      let display = [...samplingData]
      let inputValue = parseInt(e.target.value);
  
      //seperate value for display/submit purpose
      let negativeSample = pieChart[0];
      let lowContrastNegative = pieChart[1];
      let positiveSample = pieChart[2];
      
      let negativeDisplay = display[2];
      let lowContrastDisplay = display[3];
      
      if(e.target.attributes["id"].value === "Negative Samples Ratio") {
        negativeSample.value = inputValue - lowContrastNegative.value;
        positiveSample.value = 100 - (negativeSample.value + lowContrastNegative.value);
  
        negativeDisplay.value = inputValue;
      } else if (e.target.attributes["id"].value === "Low Contrast Samples Ratio"){
        negativeSample.value = negativeSample.value + (lowContrastNegative.value - inputValue);
        lowContrastNegative.value = inputValue;
  
        lowContrastDisplay.value = inputValue;
      }
      setPieChartData(pieChart)
      setsamplingData(display)
    }
  }
  const handleSampleChange = (e) => {
    let newArr = [...samplingData];
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
    setsamplingData(newArr);
  };

  const handleTrainChange = (e) => {
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
  
  const handleOptionConfig = (e, config_label) => {
    let temp = optionConfig
    for(let item in temp){
      if(temp[item].label === config_label){
        temp[item].value = e.target.value
        setOptionConfig([...temp])
      }
  }  
  }

  const handleSubmit = () => {
    let url = `${process.env.REACT_APP_BN}/new-model-config?project_name=${props.match.params.project_name}`;
    const submitData = {
      sampleHeight: samplingData[0].value,
      sampleWidth: samplingData[1].value,
      negativeSampleRatio: samplingData[2].value,
      lowContrastNegativeRatio: samplingData[3].value,
      trainingSampleRatio: trainData[0].value,
      validateSampleRatio: trainData[1].value,
      testSampleRatio: trainData[2].value,
      convolutionalLayers: optionConfig[0].value,
      denseLayers: optionConfig[1].value,
      convolutionalKernelSize: optionConfig[2].value,
      maxPoolingLayerSize: optionConfig[3].value,
      dropOutRate: optionConfig[4].value
    }
    fetch(url,{
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(submitData)
    })
    .then((res)=>{
      console.log(res.body);
      return res.json();
    })
    .then((result)=>{
      console.log(result)
      return result
    })
  }
  return (
    <>
      <StepNavBtn title="Train New Model" next={`/upload-files/${props.match.params.project_name}`} nextApi={handleSubmit}/>
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
                ].map((txt, i) => {
                  return (
                    <div className={spacebw} key={i}>
                      <label htmlFor={txt}>{txt}</label>
                      <input
                        style={{
                          minWidth: "0px",
                        }}
                        type="number"
                        value={samplingData[i].value}
                        id={txt}
                        onChange={handleSampleChange}
                      />
                    </div>
                  );
                })}
                <div className={spacebw}>
                  <label htmlFor={samplingData[2].name}>{samplingData[2].name}</label>
                  <input
                    max='100'
                    min='0'
                    style={{
                      minWidth: "0px",
                    }}
                    type="number"
                    value={samplingData[2].value}
                    id={samplingData[2].name}
                    
                    onChange={handlePieChange}
                  />
                </div>
                <div className={spacebw}>
                  <label htmlFor={samplingData[3].name}>{samplingData[3].name}</label>
                  <input
                    max='100'
                    min='0'
                    style={{
                      minWidth: "0px",
                    }}
                    type="number"
                    value={samplingData[3].value}
                    id={samplingData[3].name}
                    
                    onChange={handlePieChange}
                  />
                </div>
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
              <CircleChart data={pieChartData} />
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
            {optionConfig.map((txt, i) => {
              return (
                <div className='d-flex flex-column p-3' key={i}>
                    <label htmlFor={txt.label}>{txt.label}</label>
                    <input
                      style={{
                        minWidth: "0px",
                      }}
                      type="number"
                      id={txt.label}
                      onChange={(e)=>handleOptionConfig(e, txt.label)}
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
