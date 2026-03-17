import React, { useState } from 'react';

function Sidebar({ points }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-20 bg-white shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out rounded-t-[32px] flex flex-col
        ${isExpanded ? 'h-[70vh]' : 'h-[120px]'} md:h-full md:w-80 md:left-0 md:right-auto md:rounded-none md:rounded-r-3xl`}
    >
      {/* MOBİL İÇİN ÇEKME TUTAMACI (Handle) */}
      <div 
        className="w-full flex justify-center py-3 md:hidden cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>

      <div className="px-6 pb-6 flex flex-col h-full">
        {/* BAŞLIK VE MESAFE YAN YANA (Mobilde yer kazanmak için) */}
        <div className="flex justify-between items-center mb-4 md:flex-col md:items-start md:mb-8">
          <h1 className="text-xl font-extrabold text-gray-900">
            <span className="text-blue-600">📍</span> PINPATH
          </h1>
          <div className="bg-blue-50 px-3 py-1 rounded-full md:w-full md:mt-4 md:rounded-xl md:p-4">
             <span className="text-blue-600 font-bold">0.00 km</span>
          </div>
        </div>

        {/* LİSTE ALANI: Sadece panel açıkken veya PC'deyken görünür */}
        <div className={`flex-1 overflow-hidden flex flex-col bg-gray-50 rounded-2xl p-4 mb-4 
          ${!isExpanded ? 'hidden md:flex' : 'flex'}`}>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Koordinatlar</h3>
          <div className="flex-1 overflow-y-auto pr-1">
            <ul className="space-y-2">
              {points.map((p, i) => (
                <li key={i} className="text-xs text-gray-600 border-b pb-1">
                  <strong>{i+1}.</strong> {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BUTON: Her zaman en altta çakılı */}
        <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all">
          Rotayı Çiz
        </button>
      </div>
    </div>
  );
}
export default Sidebar;