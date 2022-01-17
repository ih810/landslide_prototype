import React, { useRef, useEffect } from "react";

//OpenLayers
import "ol/ol.css";
import { Map, View } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";
import {register} from 'ol/proj/proj4';
import {get as getProjection, transformExtent} from 'ol/proj';
//proj4
import proj4 from "proj4";

// //define projection
// proj4.defs(
//   "EPSG:2326",
//   "+proj=tmerc +lat_0=22.31213333333334 +lon_0=114.1785555555556 +k=1 +x_0=836694.05 +y_0=819069.8 +ellps=intl +towgs84=-162.619,-276.959,-161.764,0.067753,-2.24365,-1.15883,-1.09425 +units=m +no_defs"
// );
// proj4.defs(
//   "EPSG:3857",
//   "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"
// );
// register(proj4)

// const proj2326 = getProjection('EPSG:2326');
// proj2326.setExtent([793259.70, 799130.01, 870525.78, 848940.16])
// const proj3857 = getProjection('EPSG:3857');
// proj3857.setExtent([-20026376.39, -20048966.10, 20026376.39, 20048966.10])

export default function OlMapView(props) {
  const olmap = useRef(null);
  let initMap;
  let coordGroup;

  //define resolution
  let layerRes = [ 32, 16, 8, 4, 2, 1, 0.5, 0.3, 0.1];

  useEffect(() => {
    initiateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.layersGroup]);
  
  const initiateMap = async () => {
    if (props.viewLayer) {
      //align view standard
      const viewSource = await props.viewLayer.getView();
      viewSource.resolutions = layerRes;

      console.log(viewSource)
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
            maxZoom: 18,
            minZoom: 1,
            constrainOnlyCenter: true,
          }),
        });
      }

      //remove static surplus from rerender
      if (olmap.current.childNodes.length > 1) {
        olmap.current.removeChild(olmap.current.childNodes[0]);
      }
      
      //handle click event
      initMap.on("click", function (e) {
        e.preventDefault();
        console.log(e)
        if(props.setCoord){
          
          // convert coordinate to EPSG-4326
          let clickCoordinate = proj4("EPSG:3857", "EPSG:2326", e.coordinate);

          let neExtent = proj4("EPSG:3857", "EPSG:2326", [e.frameState.extent[0],e.frameState.extent[1]]);
          let swExtent = proj4("EPSG:3857", "EPSG:2326", [e.frameState.extent[2],e.frameState.extent[3]]);
          //combine extent
          let extents = neExtent.concat(swExtent)

          coordGroup = {
            extent: extents,
            click: e.coordinate_
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
        style={{ width: "100%", height: props.height }}
      ></div>
    </>
  );
}
