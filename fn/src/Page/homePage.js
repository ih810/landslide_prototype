import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//component
import Table from "../Component/table";

//mui
import { Box } from '@mui/system';
import { Grid, Button } from '@mui/material';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function HomePage(props) {
  const [sortType, setSort] = useState('');
  const history = useHistory();

  const navNewProject = () => {
    history.push('/new-project');
  }

  const navViewPorject = () => {
    console.log('click')
    history.push('/view-performance')
  }

  const handleChange = (e) =>{
    setSort(e.target.value)
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
      <Table username={props.userId.username} nav={navViewPorject}/>
    </>
  );
}
