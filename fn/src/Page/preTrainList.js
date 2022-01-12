import React, { useState, useEffect } from "react";

//MUI assets
import { Grid } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";
import PretrainModelCard from "../Component/pretrainCard";

export default function PreTrainList(props) {
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

  const selectModel = () => {
    let url = `${process.env.REACT_APP_BN}/pre-train-list/select-model?project_id=${props.match.params.project_name}&model_id=${modelList[selected]['model_name']}`;
    fetch(url, {
      method: 'POST',
    })
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      console.log(result)
    })
  }

  const handleClick = (e, i) => {
    setSelectColor('#ECECEC')
    setSelected(i)
  }
  return (
    <>
      <StepNavBtn title="Pre-Train Model" next={`/upload-files/${props.match.params.project_name}`} nextApi={selectModel}/>
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
