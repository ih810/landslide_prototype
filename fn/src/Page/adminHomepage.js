import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//component
import Table from "../Component/table";

//icon assets
import runningpj from "../assets/runpj.png";
import totalpj from "../assets/totalpj.png";
import totalu from "../assets/totalu.png";

//mui
import { Box } from "@mui/system";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const flexTheme = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const data = [
  { title: "Total Project", icon: totalpj, data: 8520 },
  { title: "Running Project", icon: runningpj, data: 20000 },
  { title: "Total Users", icon: totalu, data: 3000 },
];
export default function AdminHomePage(props) {
  const [projectInfo, setProjectInfo] = useState();
  const history = useHistory();

  useEffect(()=>{
    let url = `${process.env.REACT_APP_BN}/homepage/admin-dashboard`

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
  },[]);

  const navViewPorject = (e, project_name) => {
    for(let i = 0; i < projectInfo.length; i++){
      if(projectInfo[i]['proj_name'] === project_name){
        if(projectInfo[i]['progress'] === "100"){
          history.push(`/view-performance/${project_name}`);
        } else if (projectInfo[i]['status']){
          console.log('project not ready')
        } else {
          console.log('restart project?')
        }
      }
    };
  };

  return (
    <>
      <Grid container spacing={1} sx={{ ml: 15, mt: 1, mb: 4, mr: 5 }}>
        {data.map((d, i) => {
          return (
            <Grid key={i} item xs={12} md={12} lg={4}>
              <Card sx={{ maxWidth: "100%", maxHeight: 100, boxShadow: 3 }}>
                <CardContent sx={{ padding: 0 }}>
                  <Grid container>
                    <Grid item xs={3} sx={flexTheme}>
                      <Box sx={{ padding: 2 }}>
                        <img src={d.icon} alt={d.title} width="60px" />
                      </Box>
                    </Grid>
                    <Grid item xs={4} sx={flexTheme}>
                      <Typography
                        sx={{ fontWeight: 400 }}
                        variant="h5"
                        color="text.secondary"
                      >
                        {d.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sx={flexTheme}>
                      <Typography variant="h4" sx={{ textAlign: "center" }}>
                        {d.data}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Table admin={true} username={props.userId.username} nav={navViewPorject} projectInfo={projectInfo}/>
    </>
  );
}
