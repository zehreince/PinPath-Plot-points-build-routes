import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import MapComponent from './Components/MapComponent';
import './index.css';

function App() {
  const [points, setPoints] = useState([]);

  const handleAddPoint = (newPoint) => {
    setPoints((prev) => [...prev, newPoint]);
  };

return (
  <div className="relative h-screen w-full bg-gray-50 overflow-hidden">
    
    {/* HARİTA: Her zaman arka planda ve tam ekran */}
    <div className="absolute inset-0 z-0">
      <MapComponent onAddPoint={handleAddPoint} />
    </div>

    {/* SIDEBAR: Artık bir "Bottom Sheet" gibi davranıyor */}
    <Sidebar points={points} />

  </div>
);
}

export default App;