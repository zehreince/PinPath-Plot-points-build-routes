import React, { useState, useEffect } from 'react';

function SearchInput({ onLocationSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // DEBOUNCE MANTIĞI BURADA ÇALIŞIYOR
  useEffect(() => {
    // 2 harften azsa sonuçları temizle ve hiç istek atma
    if (query.length <= 2) {
      setResults([]);
      return;
    }

    // Kullanıcı yazmayı bıraktıktan 500 milisaniye sonra API'ye git
    const delayFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1&limit=5`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Arama hatası:", error);
      }
    }, 500);


    return () => clearTimeout(delayFn);
  }, [query]); 

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-[400px]">
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <input
          type="text"
          value={query}
      
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Konum ara..."
          className="w-full px-5 py-3.5 bg-transparent outline-none text-gray-800 text-sm font-medium"
        />
        
      
        {results.length > 0 && (
          <ul className="bg-white border-t border-gray-100 max-h-60 overflow-y-auto">
            {results.map((res) => (
              <li
                key={res.place_id}
               // SearchInput.jsx içindeki onClick kısmını bununla değiştir:
               onClick={() => {

            onLocationSelect({ 
             lng: parseFloat(res.lon), 
                   lat: parseFloat(res.lat) 
            });
           setResults([]); 
           setQuery(res.display_name); 
             }}
                className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-xs text-gray-600 border-b last:border-0 transition-colors"
              >
                {res.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchInput;