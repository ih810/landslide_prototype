import React, { useState, useEffect } from "react";

//MUI assets
import { Grid } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";
import PretrainModelCard from "../Component/pretrainCard";

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
      <Grid container sx={{ ml: 12, mr: 4, mt: 1 }} spacing={3}>
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
