import React, { useEffect, useState } from "react";

import ProgressBar from "../Component/progressBar";
import ComponentModal from "./modal";

//mui
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Avatar } from "@mui/material";

//icon assets
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import profile from "../assets/dummy.png";

const cellStyle = { color: "white", fontSize: 20 };

require("dotenv").config();
export default function DashboardTable(props) {
  const [projectInfo, setProjectInfo] = useState()
  const [undoModal, setUndoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  useEffect(()=>{
    let url
    if(props.admin) url = `${process.env.REACT_APP_BN}/homepage/admin-dashboard`
    else url = `${process.env.REACT_APP_BN}/homepage/user-dashboard?username=${props.username}`

    fetch(url,{
      method: 'GET'
    })
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      console.log(result)
      setProjectInfo(result)
    },(error)=>{
      console.log(error)
    })
  },[])
  const triggerRemoveAPI = () => {
    //api
    console.log('remove')
  }
  const triggerUndoAPI = () => {
    //api
    console.log('undo')
  }
  return (
    <>
      <TableContainer sx={{ pr: 4, ml: 15 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#3F3F3F" }}>
              <TableCell sx={cellStyle} width={'20%'}>
                Project
              </TableCell>
              {props.admin ? (
                <TableCell sx={cellStyle} width={'20%'}>
                  Users
                </TableCell>
              ) : (
                <TableCell sx={cellStyle} width={'20%'}>
                  Start Date
                </TableCell>
              )}
              <TableCell sx={cellStyle} width={'60%'}>
                Status
              </TableCell>
              <TableCell sx={cellStyle} size="small"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: "#FFFFFF" }}>
            {projectInfo?projectInfo.map((project, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
              >
                <TableCell
                  component="th"
                  className="text-truncate"
                  sx={{ fontSize: 20, maxnWidth: 400 }}
                >
                  {project.proj_name}
                </TableCell>
                {props.admin ? (
                  <TableCell align="right" className="text-truncate">
                    <Avatar sx={{ float: "left" }} src={profile} alt="avatar" />
                    <div className="d-flex justify-content-start">
                      <h4 className="mt-2">{project.owner}</h4>
                    </div>
                  </TableCell>
                ) : (
                  <TableCell className="text-truncate" sx={{ fontSize: 20 }}>
                    {project.start_date}
                  </TableCell>
                )}
                <TableCell component="th" sx={{ fontSize: 20, minWidth: 400 }}>
                  <ProgressBar
                    progress={project.progress}
                    color={
                      project.progress === 100
                        ? "success"
                        : project.progress < 0
                        ? "error"
                        : "primary"
                    }
                  />
                </TableCell>
                <TableCell component="th" sx={{ fontSize: 20, minWidth: 400 }}>
                  <div className="d-flex justify-content-end">
                    {project.progress < 0 ? (
                      <div
                        className="border rounded-pill "
                        style={{
                          width: 200,
                          height: 30,
                          backgroundColor: "#FF8BCA",
                          color: "#FF0044",
                          textAlign: "center",
                        }}
                      >
                        Failed
                      </div>
                    ) : project.progress === 100 ? (
                      <div
                        className="border rounded-pill pl-5 pr-5"
                        style={{
                          width: 200,
                          height: 30,
                          backgroundColor: "#B3E8BF",
                          color: "#178B32",
                          textAlign: "center",
                        }}
                      >
                        Complete
                      </div>
                    ) : (
                      <div
                        className="border rounded-pill pl-5 pr-5"
                        style={{
                          width: 200,
                          height: 30,
                          backgroundColor: "#ABC9F2",
                          color: "#498CE4",
                          textAlign: "center",
                        }}
                      >
                        Processing
                      </div>
                    )}
                    <div style={{ color: "#A4A4A4"}}>
                        <Button size="small" color='inherit' onClick={()=>{setUndoModal(!undoModal)}}>Undo</Button>
                    </div>
                    <div style={{ color: "#A4A4A4"}}>
                        <DeleteOutlineIcon color='inherit' onClick={()=>{setDeleteModal(!deleteModal)}}/>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )):null}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentModal control={undoModal} toggle={()=>{setUndoModal(!undoModal)}} remove={triggerUndoAPI} type={'Undo'}/>
      <ComponentModal control={deleteModal} toggle={()=>{setDeleteModal(!deleteModal)}} remove={triggerRemoveAPI} type={'Remove'}/>
    </>
  );
}
