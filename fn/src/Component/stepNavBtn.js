import React from 'react';
import { Grid, Box } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function StepNavBtn(props){
  const history = useHistory();

  const navNext = () => {
    console.log(props)
    if(props.nextApi){
      props.nextApi();
    }
    history.push(props.next);
  };

  const navBack = () => {
    console.log('click')
    history.goBack();
  };

  return (
  <Grid container className="d-flex justify-content-between" sx={{ ml: 9, mr: 9 }}>
    <Grid item xs={12}>
      <Box sx={{ pl: 6, pt: 3, display: "flex" }}>
        <div className="ml-auto" onClick={navBack}>
          <h4 className="p-2 font-weight-bold">
            <i className="fas fa-arrow-circle-left fa-md text-primary"></i>{" "}
            Back
          </h4>
        </div>
        {props.noForward ?  null :
        <div onClick={navNext}>
          <h4 className="p-2 font-weight-bold">
            <i className="fas fa-arrow-circle-right fa-md text-primary"></i>{" "}
            Next
          </h4>
        </div>}
      </Box>
    </Grid>
  </Grid>
    )
}