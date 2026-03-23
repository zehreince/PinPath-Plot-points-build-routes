import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Icon, Stroke } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';

function MapComponent({ points, onAddPoint, targetLocation, routeGeoJson }) {
  const mapRef = useRef();
  const mapInstance = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());

  const onAddPointRef = useRef(onAddPoint);
  useEffect(() => {
    onAddPointRef.current = onAddPoint;
  }, [onAddPoint]);

  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return;

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          scale: 0.06,
        }),
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({ 
        center: fromLonLat([34.0, 39.0]),
        zoom: 6 
      }),
    });

    map.on('click', (event) => {
      const lonLat = toLonLat(event.coordinate);
      onAddPointRef.current({ lat: lonLat[1], lng: lonLat[0] });
    });

    mapInstance.current = map;
    
    setTimeout(() => {
      map.updateSize();
    }, 100);

    return () => {
      map.setTarget(null);
      mapInstance.current = null;
    }
  }, []); 

  useEffect(() => {
    if (vectorSourceRef.current) {
      vectorSourceRef.current.clear(); 

      // OSRM'den gelen rota verisini çizgiye dönüştürüyoruz
      if (routeGeoJson) {
        const geojsonFormat = new GeoJSON();
        const routeGeometry = geojsonFormat.readGeometry(routeGeoJson, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });

        const routeFeature = new Feature({
          geometry: routeGeometry
        });

        routeFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: '#2563eb', 
              width: 5, 
            }),
          })
        );
        
        vectorSourceRef.current.addFeature(routeFeature);
      }

      points.forEach((p) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([p.lng, p.lat])),
        });
        vectorSourceRef.current.addFeature(feature);
      });
    }
  }, [points, routeGeoJson]); 

  useEffect(() => {
    if (targetLocation && mapInstance.current) {
      const view = mapInstance.current.getView();
      view.animate({
        center: fromLonLat([targetLocation.lng, targetLocation.lat]),
        zoom: 12,
        duration: 1000
      });
    }
  }, [targetLocation]);

  return <div ref={mapRef} className="w-full h-full bg-gray-200" style={{ minHeight: '100vh' }} />;
}

export default MapComponent;