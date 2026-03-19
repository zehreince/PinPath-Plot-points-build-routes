import React, { useState } from 'react';

function Sidebar({ points, onRemovePoint, targetLocation, onAddSearchedLocation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedPointIndex, setExpandedPointIndex] = useState(null);

  return (
    /* 1. Ana Kutu: Haritaya tıklamayı engellememesi için pointer-events-none */
    <div
      className={`fixed bottom-0 left-0 right-0 z-20 transition-all duration-300 ease-in-out flex flex-col pointer-events-none
        ${isExpanded ? 'h-[70vh]' : 'h-[120px]'} 
        md:h-full md:w-80 md:left-0 md:right-auto`}
    >
      {/* 2. İçerik Kutusu: Butonların çalışması için pointer-events-auto */}
      <div className="flex flex-col h-full bg-white shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] rounded-t-[32px] md:rounded-none md:rounded-r-3xl pointer-events-auto overflow-hidden">
        
        {/* Mobil Çekme Çubuğu */}
        <div
          className="w-full flex justify-center py-3 md:hidden cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <div className="px-6 pb-6 flex flex-col h-full overflow-hidden">
          {/* Logo ve Mesafe */}
          <div className="flex justify-between items-center mb-4 md:flex-col md:items-start md:mb-8 shrink-0">
            <h1 className="text-xl font-extrabold text-gray-900">
              <span className="text-blue-600">📍</span> PINPATH
            </h1>
            <div className="bg-blue-50 px-3 py-1 rounded-full md:w-full md:mt-4 md:rounded-xl md:p-4 text-center">
              <span className="text-blue-600 font-bold">0.00 km</span>
            </div>
          </div>

          {/* Arama Sonucu (Varsa görünür) */}
          {targetLocation && (
            <div className="bg-blue-600 rounded-2xl p-4 mb-4 text-white shadow-lg flex items-center justify-between shrink-0">
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">📍 Bulunan Konum</h3>
                <p className="text-blue-100 text-[11px] font-mono opacity-90">
                  {targetLocation.lat?.toFixed(4)}, {targetLocation.lng?.toFixed(4)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddSearchedLocation();
                }}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl shadow-md active:scale-95 transition-all font-bold text-xs uppercase"
              >
                Ekle
              </button>
            </div>
          )}

          {/* Koordinat Listesi */}
          <div className={`flex-1 overflow-hidden flex flex-col bg-gray-50 rounded-2xl p-4 mb-4 
            ${!isExpanded ? 'hidden md:flex' : 'flex'}`}>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 shrink-0">
              Noktalar ({points.length})
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-1 space-y-2">
              {points.map((p, i) => (
                <div
                  key={p.id || i}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <div
                    className="p-3.5 flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedPointIndex(expandedPointIndex === i ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {i + 1}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        Konum
                        <div className="text-[10px] text-gray-400 font-mono">
                          {p.lat.toFixed(3)}, {p.lng.toFixed(3)}
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedPointIndex === i ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {expandedPointIndex === i && (
                    <div className="px-3 pb-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemovePoint(i);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-2 rounded-lg transition-all text-xs font-bold"
                      >
                        Sil
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all mt-auto shrink-0">
            Rotayı Çiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;