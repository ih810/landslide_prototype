import React, { useState, useEffect } from "react";

//MUI assets
import { Grid, Paper, Divider } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";
import PretrainModelCard from "../Component/pretrainCard";
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
  const [modelList, setModelList] = useState();
  const [selected, setSelected] = useState();
  const [selectColor, setSelectColor] = useState();

  useEffect(()=>{
    let url = `${process.env.REACT_APP_BN}/pre-train-list/model-info`
    fetch(url, {
      method: 'GET',
    })
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      console.log(result)
      setModelList(result.data)
    })
  },[])

  const handleClick = (e, i) => {
    setSelectColor('#ECECEC')
    setSelected(i)
  }
  return (
    <>
      <StepNavBtn title="Pre-Train Model" next="/upload-files" />
      <Grid container sx={{ ml: 9, mr: 4, mt: 1 }} spacing={3}>
        {modelList?
        modelList.map((model, i) => {
          return (
            <Grid key={i} item xs={3}>
              {selected === i?
              <PretrainModelCard handleClick={handleClick} index={i} model_info={model} bg={selectColor}/>
            :
              <PretrainModelCard handleClick={handleClick} index={i} model_info={model} bg='#FFFFFF'/>
            }
            </Grid>
          );
        })
        :null
      }
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
