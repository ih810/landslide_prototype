//React
import React, { useRef, useEffect, useState } from "react";

//Component
import BarChart from "./barChart";
import Table from "./table";
import OlMap from "../Component/map" 

//style
import "./mapbox.module.css";

import susceptibility_map from "../assets/susceptibility_map.tif";
import { fromArrayBuffer } from "geotiff";
import proj4 from "proj4";

require("dotenv").config();

export default function Map() {
  const map = useRef(null);
  const [childClick, setChildClick] = useState({
    lngLat: { lng: 114.1285, lat: 22.3151 },
  });

  const [selectFile, setSelectedFile] = useState();
  //View port XY
  const [viewChart, setViewChart] = useState();
  const [tableData, setTableData] = useState();
  const [lng, setLng] = useState(114.1385);
  const [lat, setLat] = useState(22.3751);
  const [zoom, setZoom] = useState(11);
  const [hk80Grid, setHk80Grid] = useState();
  const [currentCoor, setCurrentCoor] = useState(false);
  const [bounds, setBounds] = useState({
    _ne: {
      lng: 114.7556,
      lat: 22.6396,
    },
    _sw: {
      lng: 113.5196,
      lat: 22.0045,
    },
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng);
      setLat(map.current.getCenter().lat);
      setZoom(map.current.getZoom());
      setBounds(map.current.getBounds());
      console.log(map.current)
    });

  }, [map]);

  useEffect(() => {
    if (!map.current) return;
    map.current.on("mouseup", (e) => {
      setChildClick(e);
    });

  });

  const toggle = () => {
    setCurrentCoor(!currentCoor);
  };

  useEffect(() => {
    convertGeoFormat();
  }, [childClick]);

  const convertGeoFormat = async () => {
    //define convert algorithm
    proj4.defs(
      "EPSG:2326",
      "+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs"
    );
    proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");

    let neBounds = proj4("EPSG:4326", "EPSG:2326", [
      bounds._ne.lng,
      bounds._ne.lat,
    ]);
    let swBounds = proj4("EPSG:4326", "EPSG:2326", [
      bounds._sw.lng,
      bounds._sw.lat,
    ]);
    setHk80Grid({ne:neBounds, sw:swBounds})
    handleGeoTiff(neBounds, swBounds);
  };

  const handleGeoTiff = async (neBounds, swBounds) => {
    let final;

    //send an req to get the file
    var request = new XMLHttpRequest();

    request.open("GET", susceptibility_map, true);
    request.responseType = "blob";

    request.onload = function () {
      var reader = new FileReader();
      reader.readAsArrayBuffer(request.response);
      reader.onloadend = async (e) => {
        final = await fromArrayBuffer(e.target.result);
        setSelectedFile(final);
      };
    };

    request.send();

    if (selectFile !== undefined) {
      updateBounds(selectFile, neBounds, swBounds);
    }
  };

  const updateBounds = async (tiff, neBounds, swBounds) => {
    const rasterBounds = await tiff.readRasters({
      bbox: [swBounds[0], swBounds[1], neBounds[0], neBounds[1]],
      resX: 0.1,
      resY: 0.1,
    });
    setTableData(rasterBounds)
    const hashMap = {
      0.1: 0,
      0.2: 0,
      0.3: 0,
      0.4: 0,
      0.5: 0,
      0.6: 0,
      0.7: 0,
      0.8: 0,
      0.9: 0,
      len: 0,
    };

    for (let i = 0; i < rasterBounds[0].length; i++) {
      if (rasterBounds[0][i] < 0.1) continue;
      else if (rasterBounds[0][i] < 0.2 && rasterBounds[0][i] > 0.15) {
        hashMap["0.1"]++;
        hashMap["len"]++;
      } else if (rasterBounds[0][i] < 0.3 && rasterBounds[0][i] > 0.2) {
        hashMap["0.2"]++;
        hashMap["len"]++;
      } else if (rasterBounds[0][i] < 0.4 && rasterBounds[0][i] > 0.3) {
        hashMap["0.3"]++;
        hashMap["len"]++;
      } else if (rasterBounds[0][i] < 0.5 && rasterBounds[0][i] > 0.4) {
        hashMap["0.4"]++;
        hashMap["len"]++;
      } else if (rasterBounds[0][i] < 0.6 && rasterBounds[0][i] > 0.5) {
        hashMap["0.5"]++;
        hashMap["len"]++;
      } else if (rasterBounds[0][i] < 0.7 && rasterBounds[0][i] > 0.6) {
        hashMap["0.6"]++;
        hashMap["len"]++;
      } else if (rasterBounds[0][i] < 0.8 && rasterBounds[0][i] > 0.7) {
        hashMap["0.7"]++;
        hashMap["len"]++;
      } else if (rasterBounds[0][i] < 0.9 && rasterBounds[0][i] > 0.8) {
        hashMap["0.8"]++;
        hashMap["len"]++;
      } else if (rasterBounds[0][i] < 1 && rasterBounds[0][i] > 0.9) {
        hashMap["0.9"]++;
        hashMap["len"]++;
      }
    }

    setViewChart(hashMap);
  };
  return (
    <>
    <div className="col col-12 h-100 overflow-auto">
      <div className="row" style={{ height: "100vh" }}>
        <div className="row w-100">
          <div className="col col-6 p-4">
            <button
              className="btn btn-primary p-1"
              style={{ fontSize: "0.8rem" }}
            >
              Download Summary Sheet
            </button>
          </div>
          <div className="col col-6 d-flex justify-content-end align-items-center align-self-center pt-3 pr-5">
            <p className="p-2 font-weight-bold">
              <i className="fas fa-arrow-circle-left fa-md text-primary"></i>{" "}
              Back
            </p>
          </div>
        </div>
        <div className="row w-100" >
          <div className="col col-6 w-100">
            <div className="card h-100 border rounded shadow">
              <div className="card-title pl-3 pt-3 m-0">
                <h5
                  className="font-weight-bold m-0"
                  style={{ color: "#0C1991" }}
                >
                  SUSCEPTIBILITY MAP
                </h5>
                <p
                  className="text-secondary m-0"
                  style={{ fontSize: "0.7rem" }}
                >
                  Click on location area for prediction review
                </p>
              </div>
              <div className="card-body pl-3">
                <div>
                  {currentCoor ? (
                    <div className="border rounded bg bg-light pl-1">
                      <p className="m-0">
                        <i
                          onClick={toggle}
                          className="fas fa-map-marker-alt"
                        ></i>{" "}
                        Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)}{" "}
                        | Zoom: {zoom.toFixed(4)}
                      </p>
                    </div>
                  ) : (
                    <div onClick={setCurrentCoor} className="pl-1">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  )}
                </div>
                {/* <div
                  ref={mapContainer}
                  className="map-container"
                  style={{ maxWidth: "1080px", maxHeight: "900px", minWidth:"600px", minHeight:"600px" }}
                /> */}
                <OlMap/>
              </div>
            </div>
          </div>
          <div className="col col-6">
            <div className="card h-100 border rounded shadow">
              <div className="row card-title pl-3 pt-3 m-0">
                <div className="col col-8">
                  <h5
                    className="font-weight-bold m-0"
                    style={{ color: "#0C1991" }}
                  >
                    INTERACTIVE STATISTICS
                  </h5>
                  <p
                    className="text-secondary m-0"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Landslide Suspectibility, click on map to start
                  </p>
                </div>
                <div className="col col-4">
                  <button
                    className="btn btn-primary p-1"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Generate Table
                  </button>
                </div>
              </div>
              <div className="card-body">
                <BarChart chartMap={viewChart} />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3 h-75 w-100">
          <div className="col col-12">
            <div className="card border rounded shadow">
              <div className="card-title pl-3 pt-3 m-0">
                <h5
                  className="font-weight-bold m-0"
                  style={{ color: "#0C1991" }}
                >
                  SUSCEPTIBILITY
                </h5>
                <p
                  className="text-secondary m-0"
                  style={{ fontSize: "0.7rem" }}
                >
                  Click on location area for prediction review
                </p>
              </div>
              <div className="card-body pl-3 overflow-scroll">
                <Table tableData={tableData} hk80Grid={hk80Grid}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
