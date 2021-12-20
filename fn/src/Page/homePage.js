import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//component
import Table from "../Component/table";

//icon assets
import runningpj from '../assets/runpj.png'
import totalpj from '../assets/totalpj.png'
import totalu from '../assets/totalu.png'

//mui
import { Box } from '@mui/system';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function HomePage() {
  const[admin, setAdmin]= useState(true)
  const [sortType, setSort] = useState('');
  const history = useHistory();

  const navNewProject = () => {
    history.push('/new-project');
  }

  const flexTheme = { display:'flex', justifyContent: 'center', alignItems: 'center' }
  const data = [
    {title: 'Total Project', icon:totalpj, data:8520}, 
    {title: 'Running Project', icon:runningpj, data:20000}, 
    {title: 'Total Users', icon:totalu, data:3000}
  ]
  
  const handleChange = (e) =>{
    setSort(e.target.value)
  }

  const flip = () => {
    setAdmin(!admin)
  }
  
  return (
    <>
      {admin?<Grid container spacing={1} sx={{ ml:15, mt:1, mb:4, mr:5}}>
        {data.map((d, i)=>{
          return (
          <Grid key={i} item xs={12} md={12} lg={3}>
            <Card sx={{ maxWidth: '100%', maxHeight:100, boxShadow:3 }}>
              <CardContent sx={{padding:0}}>
                <Grid container>
                  <Grid item xs={3} sx={flexTheme}>
                  <Box sx={{padding:2}}>
                    <img src={d.icon} alt={d.title} width="60px"/>
                  </Box>
                  </Grid>
                  <Grid item xs={4} sx={flexTheme}>
                    <Typography sx={{ fontWeight:400 }} variant="h5" color="text.secondary">
                    {d.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} sx={flexTheme}>
                    <Typography variant="h4" sx={{ textAlign:"center" }}>
                    {d.data}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          )
        })
        }
        <Grid item md={12} lg={3} sx={flexTheme}>
          <Box>
            <Button variant="contained" sx={{pl:5, pr:5, fontSize:18}} onClick={flip}>Generate Reports</Button>
          </Box>
        </Grid>
      </Grid>
      :
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
                  <MenuItem value={'month'}>Last month</MenuItem>
                  <MenuItem value={'week'}>Last Week</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </>
      }
      <Table admin={admin}/>

    </>
  );
}
