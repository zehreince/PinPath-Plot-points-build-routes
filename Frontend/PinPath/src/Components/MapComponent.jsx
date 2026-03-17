import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";
import pinIcon from "../assets/icon.svg";

function MapComponent({ onAddPoint }) {

  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(null);

  useEffect(() => {

    if (!mapElement.current || mapRef.current) return;

    const source = new VectorSource();
    vectorSourceRef.current = source;

    const vectorLayer = new VectorLayer({
      source: source
    });

    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([27.9700, 40.3522]),
        zoom: 13
      })
    });

    map.on("singleclick", (event) => {

      const coords = toLonLat(event.coordinate);

      const feature = new Feature({
        geometry: new Point(event.coordinate)
      });

      source.addFeature(feature);

      // animasyon
      let scale = 0;

      const animate = () => {

        scale += 0.08;

        feature.setStyle(
          new Style({
            image: new Icon({
              src: pinIcon,
              anchor: [0.5, 1],
              scale: scale
            })
          })
        );

        if (scale < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();

      onAddPoint({
        lat: coords[1],
        lng: coords[0]
      });

    });

    mapRef.current = map;

    return () => {
      map.setTarget(null);
      mapRef.current = null;
    };

  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapElement} className="absolute inset-0"></div>
    </div>
  );
}

export default MapComponent;