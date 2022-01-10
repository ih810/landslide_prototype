import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//MUI assets
import { Box, Paper, Button, Divider, Typography, Grid, Alert, Snackbar } from "@mui/material";

export default function NewProjectModal(props) {
  const fontSize = 18;
  const greyColor = "#C9C9C9";
  const history = useHistory();
  const [projectType, setProjectType] = useState();
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_BN}/new-project`;
    let submitData = {
      project_name: e.target.projName.value,
      start_date: e.target.startD.value,
      end_date: e.target.endD.value,
      resolution: e.target.resolution.value,
      username: props.userId.username
    };
    if(submitData.project_name){
      fetch(url,{
          method:'POST',
          headers:{ 'Content-Type': 'application/json'},
          body: JSON.stringify(submitData)
      })
      .then((res)=>{
        return res.json();
      })
      .then((result)=>{
        if(result.data !== 'resource already exist' && result.data !== ''){
          if (projectType === "prediction") history.push(`/pre-train-model/${result.data}`);
          else history.push(`/train-new-model/${result.data}`);
        } else {
          setErrorMsg('Project name already taken')
          setShowError(true)
        }
      })
      .catch((err)=>{
        console.log(err)
      });
    } else {
      setErrorMsg('Please fill in the required information')
      setShowError(true)
    }
  };

  return (
    <>
    
      <Box
        sx={{
          mt: 5,
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          width: "100%",
          height: "100%",
        }}
      >
      <Snackbar open={showError}>
        <Alert sx={{ mb: 2 }} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
        <Paper
          elevation={24}
          sx={{
            width: 900,
            height: 740,
            bgcolor: "#393939",
            color: "#FFF",
            borderRadius: "20px",
            boxShadow: 2,
          }}
        >
          <Typography variant="h4" sx={{ ml: 7, mt: 7, fontWeight: 1000 }}>
            BASIC INFORMATION
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ ml: 7, mt: 7, color: greyColor }}>
              <label htmlFor="projName">Project Name </label>
            </Box>

            <Box component="div" sx={{ ml: 7, mr: 7, width: "88%" }}>
              {showError?
                <input type="text" id="projName" className="p-2 w-100 border border-5 border-danger bg-danger" onChange={(e)=>{setShowError(false)}}/>
                :
                <input type="text" id="projName" className="p-2 w-100" />
              }
            </Box>

            <Divider
              variant="middle"
              sx={{ ml: 7, mr: 7, mt: 5, bgcolor: "#FFFFFF" }}
            />

            <Typography sx={{ ml: 7, mt: 5, fontWeight: 1000 }} variant="h4">
              LiDAR Data SETTING
            </Typography>

            <Grid container sx={{ ml: 7, mr: 7, mt: 3, color: greyColor }}>
              <Grid item xs={6}>
                <label htmlFor="startD">Start Date </label>
                <br />
                <input type="date" id="startD" className="p-2 w-75" />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="endD">End Date </label>
                <br />
                <input type="date" id="endD" className="p-2 w-75" />
              </Grid>
            </Grid>

            <Box sx={{ ml: 7, mt: 5, color: greyColor }}>
              <label htmlFor="resolution">Required resolution (m) </label>
              <br />
              <input
                type="number"
                id="resolution"
                className="p-2"
                style={{ width: "339px" }}
              />
            </Box>

            <Grid container sx={{ mt: 7, color: greyColor }}>
              <Grid item xs={6} className="d-flex justify-content-center">
                <Button
                  variant="contained"
                  sx={{ pl: 8, pr: 8, fontSize: fontSize }}
                  type="submit"
                  onClick={() => setProjectType("prediction")}
                >
                  Prediction
                </Button>
              </Grid>

              <Grid item xs={6} className="d-flex justify-content-center">
                <Button
                  variant="contained"
                  sx={{ pl: 11, pr: 11, fontSize: fontSize }}
                  type="submit"
                  onClick={() => setProjectType("train")}
                >
                  Train
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
}
