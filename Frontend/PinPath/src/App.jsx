import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import MapComponent from './Components/MapComponent';
import SearchInput from './Components/SearchInput'; 
import './index.css';

function App() {
  const [points, setPoints] = useState([]);
  const [targetLocation, setTargetLocation] = useState(null); 
  const [totalDistance, setTotalDistance] = useState(0);
  const [routeGeoJson, setRouteGeoJson] = useState(null);

  const handleAddPoint = (newPoint) => {
    setPoints((prev) => [...prev, { ...newPoint, id: Date.now() + Math.random() }]);
  };

  const handleRemovePoint = (indexToRemove) => {
    setPoints((prev) => prev.filter((_, index) => index !== indexToRemove));
    setRouteGeoJson(null);
    setTotalDistance(0);
  };

  const handleAddSearchedLocation = () => {
    if (targetLocation) {
      handleAddPoint(targetLocation);
      setTargetLocation(null); 
    }
  };

  // Gerçek yolları (OSRM) hesaplayan fonksiyon
  const handleCalculateRoute = async () => {
    if (points.length < 2) return;

    const coordinatesString = points.map(p => `${p.lng},${p.lat}`).join(';');

    try {
      const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=full&geometries=geojson`);
      const data = await response.json();

      if (data.code === 'Ok' && data.routes.length > 0) {
        const route = data.routes[0];
        setTotalDistance(route.distance / 1000);
        setRouteGeoJson(route.geometry);
      }
    } catch (error) {
      console.error("Rota alınamadı:", error);
    }
  };

  return (
    <div className="relative h-screen w-full bg-gray-50 overflow-hidden">
      <SearchInput onLocationSelect={(coords) => setTargetLocation(coords)} />
      
      <div className="absolute inset-0 z-0">
        <MapComponent 
          points={points} 
          onAddPoint={handleAddPoint} 
          targetLocation={targetLocation} 
          routeGeoJson={routeGeoJson} 
        />
      </div>

      <Sidebar 
        points={points} 
        onRemovePoint={handleRemovePoint} 
        targetLocation={targetLocation}
        onAddSearchedLocation={handleAddSearchedLocation}
        totalDistance={totalDistance}
        onCalculateRoute={handleCalculateRoute} 
      />
    </div>
  );
}

export default App;