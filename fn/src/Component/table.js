import React, { useState } from "react";

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
const data = [
  {
    uname: "test1ac",
    uuid: "1",
    projName: "test1Proj20211124",
    projId: "1",
    projStartDat: "1Nov2021",
    status: true,
    progress: 100,
  },
  {
    uname: "test2ac",
    uuid: "2",
    projName: "test2Proj20211124",
    projId: "2",
    projStartDat: "2Nov2021",
    status: true,
    progress: 100,
  },
  {
    uname: "test3ac",
    uuid: "3",
    projName: "test3Proj20211124",
    projId: "3",
    projStartDat: "3Nov2021",
    status: true,
    progress: 100,
  },
  {
    uname: "test4ac",
    uuid: "4",
    projName: "test4Proj20211124",
    projId: "4",
    projStartDat: "4Nov2021",
    status: false,
    progress: 70,
  },
  {
    uname: "test5ac",
    uuid: "5",
    projName: "test5Proj20211124",
    projId: "5",
    projStartDat: "5Nov2021",
    status: false,
    progress: 70,
  },
  {
    uname: "test6ac",
    uuid: "6",
    projName: "test6Proj20211124",
    projId: "6",
    projStartDat: "6Nov2021",
    status: false,
    progress: 60,
  },
  {
    uname: "test7ac",
    uuid: "6",
    projName: "test7Proj20211124",
    projId: "7",
    projStartDat: "6Nov2021",
    status: false,
    progress: 60,
  },
  {
    uname: "test8ac",
    uuid: "6",
    projName: "test8Proj20211124",
    projId: "8",
    projStartDat: "6Nov2021",
    status: false,
    progress: 50,
  },
  {
    uname: "test9ac",
    uuid: "6",
    projName: "test9Proj20211124",
    projId: "9",
    projStartDat: "6Nov2021",
    status: false,
    progress: 50,
  },
  {
    uname: "test10ac",
    uuid: "6",
    projName: "test10Proj20211124",
    projId: "10",
    projStartDat: "6Nov2021",
    status: false,
    progress: 20,
  },
  {
    uname: "test11ac",
    uuid: "6",
    projName: "test11Proj20211124",
    projId: "11",
    projStartDat: "6Nov2021",
    status: false,
    progress: "error",
  },
  {
    uname: "test12ac",
    uuid: "6",
    projName: "test21Proj20211124",
    projId: "12",
    projStartDat: "6Nov2021",
    status: false,
    progress: 10,
  },
];

export default function DashboardTable(props) {
  const [undoModal, setUndoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
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
            {data.map((project) => (
              <TableRow
                key={project.projId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
              >
                <TableCell
                  component="th"
                  className="text-truncate"
                  sx={{ fontSize: 20, maxnWidth: 400 }}
                >
                  {project.projName}
                </TableCell>
                {props.admin ? (
                  <TableCell align="right" className="text-truncate">
                    <Avatar sx={{ float: "left" }} src={profile} alt="avatar" />
                    <div className="d-flex justify-content-start">
                      <h4 className="mt-2">{project.uname}</h4>
                    </div>
                  </TableCell>
                ) : (
                  <TableCell className="text-truncate" sx={{ fontSize: 20 }}>
                    {project.projStartDat}
                  </TableCell>
                )}
                <TableCell component="th" sx={{ fontSize: 20, minWidth: 400 }}>
                  <ProgressBar
                    progress={project.progress}
                    color={
                      project.progress === 100
                        ? "success"
                        : isNaN(project.progress)
                        ? "error"
                        : "primary"
                    }
                  />
                </TableCell>
                <TableCell component="th" sx={{ fontSize: 20, minWidth: 400 }}>
                  <div className="d-flex justify-content-end">
                    {isNaN(project.progress) ? (
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
                    ) : project.status ? (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentModal control={undoModal} toggle={()=>{setUndoModal(!undoModal)}} remove={triggerUndoAPI} type={'Undo'}/>
      <ComponentModal control={deleteModal} toggle={()=>{setDeleteModal(!deleteModal)}} remove={triggerRemoveAPI} type={'Remove'}/>
    </>
  );
}
