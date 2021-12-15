import React from "react";
import { useHistory } from "react-router-dom";

//MUI assets
import { Box, Paper, Button, Divider, Typography, Grid } from "@mui/material";

export default function NewProjectModal() {
    const fontSize = 18;
    const greyColor = "#C9C9C9"
    const history = useHistory();

    const navTrainNewModel = () => {
      history.push('/trainnewmodel');
    }

    const navPreTrainModel = () => {
      history.push('/pretrainmodel');
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.projName.value);
    console.log(e.target.startD.value);
    console.log(e.target.endD.value);
    console.log(e.target.resolution.value);
  };

  return (
    <>
      <Box
        sx={{
          mt:5, 
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            width: 900,
            height: 800,
            bgcolor: "#393939",
            color: "#FFF",
            borderRadius: "20px",
            boxShadow: 2,
          }}
        >
        <Typography variant="h4" sx={{ ml: 7, mt: 7, fontWeight:1000}}>BASIC INFORMATION</Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ ml: 7, mt: 7, color: greyColor }}>
              <label htmlFor="projName">Project Name </label>
            </Box>

            <Box component="div" sx={{ ml: 7, mr: 7, width: "88%" }}>
              <input type="text" id="projName" className="p-2 w-100" />
            </Box>

            <Divider
              variant="middle"
              sx={{ ml: 7, mr: 7, mt: 5, bgcolor: "#FFFFFF" }}
            />

            <Typography sx={{ ml: 7, mt: 5, fontWeight:1000 }} variant="h4">
              ADVANCED SETTING
            </Typography>

            <Box sx={{ ml: 7, mt: 3,  color: greyColor }}>
              <Typography variant="p">LiDAR</Typography>
            </Box>

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
              <label htmlFor="resolution">Required resolution </label>
              <br />
              <input
                type="number"
                id="resolution"
                className="p-2"
                style={{ width: "339px" }}
              />
            </Box>

            <Grid container sx={{ ml: 7, mr: 7, mt: 7, color: greyColor }}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  sx={{ pl: 11, pr: 11, fontSize: fontSize }}
                  type="submit"
                  onClick={navPreTrainModel}
                >
                  Pre-Train Model
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  sx={{ pl: 11, pr: 11, fontSize: fontSize }}
                  type="submit"
                  onClick={navTrainNewModel}
                >
                  Train New Model
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ ml: 7 }}></Box>
          </form>
        </Paper>
      </Box>
    </>
  );
}
