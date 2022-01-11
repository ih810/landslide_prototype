import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//component
import Table from "../Component/table";

//mui
import { Box } from '@mui/system';
import { Grid, Button } from '@mui/material';
import { InputLabel, MenuItem, FormControl, Select, Alert, Snackbar } from '@mui/material';
export default function HomePage(props) {
  const [projectInfo, setProjectInfo] = useState();
  const [sortType, setSort] = useState('');
  const history = useHistory();
  const [showError, setShowError] = useState(false);

  useEffect(()=>{
    let url = `${process.env.REACT_APP_BN}/homepage/user-dashboard?username=${props.userId.username}`

    fetch(url,{
      method: 'GET'
    })
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      setProjectInfo(result)
    },(error)=>{
      console.log(error)
    })
  },[])

  const navNewProject = () => {
    history.push('/new-project');
  }

  const navViewPorject = (e, project_name) => {
    for(let i = 0; i < projectInfo.length; i++){
      if(projectInfo[i]['proj_name'] === project_name){
        if(projectInfo[i]['progress'] === '100'){
          history.push(`/view-performance/${project_name}`);
        } else {
          setShowError(true)
        }
      }
    };
  }

  const handleChange = (e) =>{
    setSort(e.target.value);
  }
  
  return (
    <>
        <Grid container sx={{ m:4, ml:15 }}>
          <Button variant="contained" sx={{pl:5, pr:5, fontSize:18}} onClick={navNewProject}>New Project</Button>
        </Grid>
        <Grid container sx={{ pl:3, pr:8, mb:4 }}>
          <Grid item xs={10}/>
          <Grid item xs={2}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Sort By</InputLabel>
                <Select
                  labelId="select-label"
                  value={sortType}
                  label="Sort By"
                  onChange={handleChange}
                >
                  <MenuItem value={'Name'}>Name</MenuItem>
                  <MenuItem value={'time'}>Time</MenuItem>
                  <MenuItem value={'status'}>Status</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Snackbar open={showError}>
            <Alert sx={{ mb: 2 }} severity="error">
              Project in progress
            </Alert>
        </Snackbar>
      <Table username={props.userId.username} nav={navViewPorject} projectInfo={projectInfo}/>
    </>
  );
}
