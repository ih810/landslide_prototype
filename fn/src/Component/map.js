import React, { useRef, useEffect } from "react";

//OpenLayers
import "ol/ol.css";
import { Map, View } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/WebGLTile";

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
          coordGroup = {
            extent: e.frameState.extent,
            click: e.coordinate
          }
          console.log(coordGroup)
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
