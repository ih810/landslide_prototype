import React from 'react';
import { Paper, Divider } from "@mui/material";
import dummymap from "../assets/dumbmymap.png";

export default function PretrainModelCard(props){
    return(
        <Paper sx={{ borderRadius: "10px", boxShadow: 1, height: "auto", bgcolor:props.bg }} onClick={(e)=>{props.handleClick(e, props.index)}}>
            <div className="pt-3 pl-3 pb-0">
                <p style={{width: '98%', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom:'12px', fontWeight: 600, color:"#797979"}}>{props.model_info['model_name']}</p>
            </div>
                <Divider
                    variant="middle"
                    sx={ {ml: 2, mr: 2, bgcolor: "#E2E2E2" }}
                />
                    <div style={{ borderRadius: "10px" }}>
                        <img
                        src={dummymap}
                        alt="dafaq"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            borderRadius: "10px",
                            padding: '0 14px 12px 14px',
                            margin: '12px 0 0 0'
                        }}
                        />
                    </div>
                <Divider
                    variant="middle"
                    sx={{ ml: 2, mr: 2, bgcolor: "#E2E2E2" }}
                />
            <div className="pb-2 pl-4 pr-4 d-flex justify-content-between"  >
                <p style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>Accuracy Percentage: {parseFloat(props.model_info.percentage) * 100}%</p>
            </div>
        </Paper>
    )
}