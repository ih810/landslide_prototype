import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

//MUI assets
import { Grid, Paper, Icon, Button, Backdrop, CircularProgress } from "@mui/material";

//Component
import StepNavBtn from "../Component/stepNavBtn";

export default function UploadInput(props) {
  const hiddenModelInput = useRef();
  const hiddenModelForm = useRef();
  const hiddenOptModelInput = useRef();
  const hiddenOptForm = useRef();
  const hiddenTrainInput = useRef();
  const hiddenTrainForm = useRef();
  const [listData, setListData] = useState([
    {
      title: "MODEL INPUT",
      description: "DEM file (.tiff) here | Max. 1GB",
      fileList: [],
    },
    {
      title: "OPTIONAL MODEL INPUT",
      description: "Gridding must be the same as DEM | Max. 1GB",
      fileList: [],
    },
    {
      title: "TRAINING INPUT",
      description: "Landslide label here (.shp) | Max. 1GB",
      fileList: [],
    },
  ]);
  const [flip, setFlip] = useState(true);
  const [backDrop, setBackDrop] = useState(false);


  useEffect(() => {
    // set temp for state modification
    let tempList = listData;

    //api to get list of files from azure
    axios
      .get(
        `${process.env.REACT_APP_BN}/upload-input/list?project_id=${props.match.params.project_name}`
      )
      .then((response) => {
        tempList[0]["fileList"] = response.data["elevation"];
        tempList[1]["fileList"] = response.data["shp"];
        tempList[2]["fileList"] = response.data["traning"];

        setListData(tempList);
      })
      .then(() => {
        //rerender issue
        setFlip(!flip);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backDrop]);

  const handleClick = (e) => {
    let eventTarget = e.target.attributes["id"].value;
    if (eventTarget === "MODEL INPUT") {
      hiddenModelInput.current.click();
    } else if (eventTarget === "OPTIONAL MODEL INPUT") {
      hiddenOptModelInput.current.click();
    } else if (eventTarget === "TRAINING INPUT") {
      hiddenTrainInput.current.click();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setBackDrop(true)
    fetch(
      `${process.env.REACT_APP_BN}/upload-input/upload?`+ new URLSearchParams({
        project_id: props.match.params.project_name,
        input_type: e.target.id,
        file_name: e.target[0].files[0].name
      }),
      {
        method: "POST",
        body: e.target[0].files[0],
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        setBackDrop(false);
        console.log(result);
      })
      .catch((err)=>{
        setBackDrop(false);
        console.log(err);
      })
  }

  return (
    <>
      <StepNavBtn
        title="Pre-Train Model"
        next={`/validate-input/${props.match.params.project_name}`}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: 999999999}}
        open={backDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container sx={{ mt: 3, minHeight: "60vh" }} justifyContent="center">
        {listData.map((txt, i) => {
          return (
            <Grid key={i} item xs={3}>
              <Paper
                sx={{ m: 1, mb: 1, boxShadow: 3, height: "auto" }}
                className="d-flex flex-column justify-content-between"
              >
                <div>
                  <div className="pl-4 pt-4">
                    <h4 style={{ fontWeight: 650 }}>{txt.title}</h4>
                  </div>
                  <div className="d-flex pl-4">
                    <Icon
                      color="primary"
                      id={txt.title}
                      sx={{ fontSize: 50 }}
                      onClick={handleClick}
                    >
                      add_circle
                    </Icon>

                    <div className="d-inline pl-1 pb-2">
                      <p className="d-inline text-primary ">Upload</p>
                      <br />
                      <p className="d-inline text-secondary">
                        <small>{txt.description}</small>
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 pl-4 w-100">
                    <ul className="pl-1 w-100">
                      {txt["fileList"].map((file, j) => {
                        return (
                          <li key={j} className="list-unstyled text-truncate">
                            <p className="d-inline">
                              {file}
                              <br />
                              <small className="text-secondary">Uploaded</small>
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="d-flex justify-content-center pb-4">
                  <Button variant="contained" sx={{ pl: 5, pr: 5 }}>
                    Download Sample file
                  </Button>
                </div>
              </Paper>
            </Grid>
          );
        })}
        <form onSubmit={(e)=>handleSubmit(e)} id="model">
          <input
            type="file"
            name="data"
            style={{ display: "none" }}
            ref={hiddenModelInput}
            onChange={() => {
              hiddenModelForm.current.click()
            }}
            accept=".tif"
          />
          <button type="submit" ref={hiddenModelForm} style={{display: "none"}}/>
        </form>
        <form onSubmit={(e)=>handleSubmit(e)} id="optional">
        <input
          type="file"
          style={{ display: "none" }}
          ref={hiddenOptModelInput}
          onChange={() => {
            hiddenOptForm.current.click()
          }}
          accept=".tif"
        /><button type="submit" ref={hiddenOptForm} style={{display: "none"}}/>
        </form>
        <form onSubmit={(e)=>handleSubmit(e)} id="training">
        <input
          type="file"
          style={{ display: "none" }}
          ref={hiddenTrainInput}
          onChange={() => {
            hiddenTrainForm.current.click()
          }}
          accept=".tif"
        /><button type="submit" ref={hiddenTrainForm} style={{display: "none"}}/>
        </form>
      </Grid>
    </>
  );
}
