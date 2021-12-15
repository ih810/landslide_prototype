import React, { useRef, useEffect } from "react";

//OpenLayers
import "ol/ol.css";
import { Map, View } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";

//proj4
import proj4 from "proj4";

//environment variable
require("dotenv").config();

//define projection
proj4.defs(
  "EPSG:2326",
  "+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs"
);

export default function MapViewTest(props) {
  const olmap = useRef(null);
  let initMap;
  let coordGroup;

  //define resolution
  let layerRes = [16, 8, 4, 2, 1, 0.5, 0.3, 0.1];

  useEffect(() => {
    initiateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.layersGroup]);
  
  const initiateMap = async () => {
    if (props.viewLayer) {
      //align view standard
      const viewSource = await props.viewLayer.getView();
      viewSource.resolutions = layerRes;

      //initiate map only once
      if (!initMap) {
        initMap = new Map({
          target: olmap.current,
          renderer: "canvas",
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
            ...props.layersGroup,
          ],
          view: new View({
            ...viewSource,
            zoom: 1,
          }),
        });
      }

      //remove static surplus
      if (olmap.current.childNodes.length > 1) {
        olmap.current.removeChild(olmap.current.childNodes[0]);
      }

      //handle click event
      initMap.on("singleclick", function (e) {
        e.preventDefault();
        if(props.setCoord){
          
          // convert coordinate to EPSG-4326
          let clickCoordinate = proj4("EPSG:3857", "EPSG:2326", e.coordinate);

          let neExtent = proj4("EPSG:3857", "EPSG:2326", [e.frameState.extent[0],e.frameState.extent[1]]);
          let swExtent = proj4("EPSG:3857", "EPSG:2326", [e.frameState.extent[2],e.frameState.extent[3]]);

          let extents = neExtent.concat(swExtent)

          coordGroup = {
            extent: extents,
            click: clickCoordinate
          }
          
          props.setCoord(coordGroup)
        }
      });
    }
  };
  return (
    <>
      <div
        ref={olmap}
        id="map"
        className="map p-3"
        style={{ width: "100%", height: "700px" }}
      ></div>
    </>
  );
}
