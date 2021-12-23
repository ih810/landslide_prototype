import React, { useState } from "react";

//MUI assets
import { Grid, Paper } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";

import dummymap from "../assets/dumbmymap.png";

const dummyModal = [
  {name: 'Hong_Kong_2021', default:12},
  {name: 'Hong_Kong_2022', default:24},
  {name: 'Hong_Kong_2023', default:32},
  {name: 'Hong_Kong_2024', default:48},
  {name: 'Hong_Kong_2025', default:60},
  {name: 'Hong_Kong_2026', default:72},
  {name: 'Hong_Kong_2027', default:84},
  {name: 'Hong_Kong_2028', default:96},
]

export default function PreTrainList() {
  const [selected, setSelected] = useState()
  const handleClick = (e, i) => {
    setSelected(i)
  }
  return (
    <>
      <StepNavBtn title="Pre-Train Model" next="/upload-files" />
      <Grid container sx={{ ml: 9, mr: 4, mt: 1 }} spacing={3}>
        {dummyModal.map((model, i) => {
          return (
            <Grid item xs={3}>
              {selected === i?
              <Paper sx={{ borderRadius: "10px", boxShadow: 1, height: "auto", bgcolor:"#ECECEC" }} onClick={(e)=>{handleClick(e,i)}}>
                <img
                  src={dummymap}
                  alt="dafaq"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: "10px",
                    padding: '32px',
                  }}
                />
                <div className="pb-2 pl-4 pr-4 d-flex justify-content-between">
                  <p>Location Name: {model.name}</p>
                  <p>Percentage: {model.default}</p>
                </div>
              </Paper>
            :
            <Paper sx={{ borderRadius: "10px", boxShadow: 3, height: "auto" }}  onClick={(e)=>{handleClick(e,i)}}>
              <img
                src={dummymap}
                alt="dafaq"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  borderRadius: "10px",
                  padding: '32px',
                }}
              />
              <div className="pb-2 pl-4 pr-4 d-flex justify-content-between">
                <p>Location Name: {model.name}</p>
                <p>Percentage: {model.default}</p>
              </div>
          </Paper>
            }
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

// <Grid item xs={6}>
//                     <Paper sx={{ m:1, width:'100%', boxShadow: 3, bgcolor:'#393939', color:'#FFF' }}>
//                         <div className="pt-4 pl-5 pb-4">
//                             <h3>TRAINED MODEL INFORMATION</h3>
//                         </div>
//                         <VirtualizedList data={modelInfo} height="60vh" onClick={handleClick}/>
//                     </Paper>
//                 </Grid>
