import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
export default function DashboardTable(props) {
  const [undoModal, setUndoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [interactTarget, setInteractTarget]= useState();
  const history = useHistory();

  const triggerRemoveAPI = (projectName) => {
    //api
    fetch(`${process.env.REACT_APP_BN}/homepage/delete-project?project_name=${interactTarget}`,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username:props.username})
    })
    .then((res)=>{
      return res.json()
    })
    .then((result)=>{
      setDeleteModal(false)
      window.location.reload()
    })
  }
  const triggerUndoAPI = () => {
    //api
    console.log('undo')
  }
  const triggerModal = (e, projectName, type) => {
    if(type === 'undo'){
      setUndoModal(true)
    } else {
      setDeleteModal(true)
    }
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
            {props.projectInfo?props.projectInfo.map((project, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
                onClick={(e)=>{props.nav(e, project.proj_name)}}
                onMouseEnter={()=>{setInteractTarget(project.proj_name)}}
              >
                <TableCell
                  component="th"
                  className={'text-truncate ' + project.proj_name}
                  sx={{ fontSize: 20, maxnWidth: 400 }}
                
                >
                  {project.proj_name}
                </TableCell>
                {props.admin ? (
                  <TableCell align="right" className={'text-truncate ' + project.proj_name} >
                    <Avatar sx={{ float: "left" }} src={profile} alt="avatar" />
                    <div className="d-flex justify-content-start">
                      <h4 className="mt-2">{project.owner}</h4>
                    </div>
                  </TableCell>
                ) : (
                  <TableCell className={'text-truncate ' + project.proj_name} sx={{ fontSize: 20 }}>
                    {project.start_date}
                  </TableCell>
                )}
                <TableCell component="th" className={project.proj_name} sx={{ fontSize: 20, minWidth: 400 }} >
                  <ProgressBar
                    progress={parseInt(project.progress)}
                    className={project.proj_name}
                    color={
                      parseInt(project.progress) === 100
                        ? "success"
                        :  parseInt(project.progress) < 0
                        ? "error"
                        : "primary"
                    }
                  />
                </TableCell>
                <TableCell component="th" className={project.proj_name} sx={{ fontSize: 20, minWidth: 400 }}>
                  <div className="d-flex justify-content-end">
                    { parseInt(project.progress) < 0 ? (
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
                    ) : parseInt(project.progress) === 100 ? (
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
                        <Button size="small" color='inherit' onClick={(e)=>{triggerModal(e, project.proj_name,'undo')}}>Undo</Button>
                    </div>
                    <div style={{ color: "#A4A4A4"}}>
                        <DeleteOutlineIcon color='inherit' onClick={(e)=>{triggerModal(e, project.proj_name,'delete')}}/>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )):null}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentModal control={undoModal} name={interactTarget} toggle={(e)=>{setUndoModal(!undoModal)}} confirm={()=>triggerUndoAPI(interactTarget)} type={'Undo'}/>
      <ComponentModal control={deleteModal} name={interactTarget} toggle={(e)=>{setDeleteModal(!deleteModal)}} confirm={()=>triggerRemoveAPI(interactTarget)} type={'Remove'}/>
    </>
  );
}
