import React, { useState } from "react";

//MUI assets
import { Grid, Paper } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";
import VirtualizedList from "../Component/virtualizedList";
import CircleChart from "../Component/circleChrat";

import dummymap from '../assets/dumbmymap.png'

const fillRed = { fill: "#76DCD6" };
const fillBlue = { fill: "#9daba9" };
const fillGreen = { fill: "#db74d4" };

//Dummy data
const modelInfo = [
  {
    id: 1,
    default: "A",
    name: "A1",
    data: [
      { value: 20, name: "dataA", ...fillRed },
      { value: 30, name: "dataB", ...fillBlue },
      { value: 50, name: "dataC", ...fillGreen },
    ],
  },
  {
    id: 2,
    default: "B",
    name: "B2",
    data: [
      { value: 24, name: "dataA", ...fillRed },
      { value: 30, name: "dataB", ...fillBlue },
      { value: 50, name: "dataC", ...fillGreen },
    ],
  },
  {
    id: 3,
    default: "C",
    name: "C3",
    data: [
      { value: 25, name: "dataA", ...fillRed },
      { value: 30, name: "dataB", ...fillBlue },
      { value: 50, name: "dataC", ...fillGreen },
    ],
  },
  {
    id: 4,
    default: "D",
    name: "D4",
    data: [
      { value: 28, name: "dataA", ...fillRed },
      { value: 30, name: "dataB", ...fillBlue },
      { value: 50, name: "dataC", ...fillGreen },
    ],
  },
  {
    id: 5,
    default: "E",
    name: "E5",
    data: [
      { value: 24, name: "dataA", ...fillRed },
      { value: 30, name: "dataB", ...fillBlue },
      { value: 50, name: "dataC", ...fillGreen },
    ],
  },
  {
    id: 6,
    default: "E",
    name: "E5",
    data: [
      { value: 22, name: "dataA", ...fillRed },
      { value: 30, name: "dataB", ...fillBlue },
      { value: 50, name: "dataC", ...fillGreen },
    ],
  },
  {
    id: 7,
    default: "E",
    name: "E5",
    data: [
      { value: 27, name: "dataA", ...fillRed },
      { value: 30, name: "dataB", ...fillBlue },
      { value: 50, name: "dataC", ...fillGreen },
    ],
  },
  {
    id: 8,
    default: "E",
    name: "E5",
    data: [
      { value: 12, name: "dataA", ...fillRed },
      { value: 30, name: "dataB", ...fillBlue },
      { value: 50, name: "dataC", ...fillGreen },
    ],
  },
];

export default function PreTrainList() {
  const [selectedPie, setSelectedPie] = useState(0);

  const handleClick = (e) => {
    console.log(e);
    if (e.target.attributes["id"] === undefined) {
      setSelectedPie(
        parseInt(e.target.parentElement.attributes["id"].value) - 1
      );
    } else {
      setSelectedPie(parseInt(e.target.attributes["id"].value) - 1);
    }
  };
  return (
    <>
      <StepNavBtn title="Pre-Train Model" next="/uploadFiles" />
      <Grid container sx={{ ml: 9, mr: 9, mt: 1 }} spacing={3}>
        {modelInfo.map((model) => {
          return (
            <Grid item xs={3}>
              <Paper>
                <p>fuck</p>
              </Paper>
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
