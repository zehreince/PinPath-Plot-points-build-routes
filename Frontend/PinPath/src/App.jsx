import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import MapComponent from './Components/MapComponent';
import SearchInput from './Components/SearchInput'; 
import './index.css';

function App() {
  const [points, setPoints] = useState([]);
  const [targetLocation, setTargetLocation] = useState(null); 

  const handleAddPoint = (newPoint) => {
    setPoints((prev) => [...prev, { ...newPoint, id: Date.now() + Math.random() }]);
  };

  const handleRemovePoint = (indexToRemove) => {
    setPoints((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleAddSearchedLocation = () => {
    if (targetLocation) {
      handleAddPoint(targetLocation);
      setTargetLocation(null); 
    }
  };

  return (
    <div className="relative h-screen w-full bg-gray-50 overflow-hidden">
      {/* 1. Üst Katman: Arama */}
      <SearchInput onLocationSelect={(coords) => setTargetLocation(coords)} />
      
      {/* 2. Arka Katman: Harita */}
      <div className="absolute inset-0 z-0">
        <MapComponent 
          points={points} 
          onAddPoint={handleAddPoint} 
          targetLocation={targetLocation} 
        />
      </div>

      {/* 3. Yan/Alt Katman: Sidebar */}
      <Sidebar 
        points={points} 
        onRemovePoint={handleRemovePoint} 
        targetLocation={targetLocation}
        onAddSearchedLocation={handleAddSearchedLocation}
      />
    </div>
  );
}

export default App;