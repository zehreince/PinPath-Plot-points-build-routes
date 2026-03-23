# PinPath- Plot points build routes.

PinPath, kullanıcıların harita üzerinde özgürce noktalar işaretleyerek gerçek karayolu rotaları oluşturabildiği ve toplam mesafeyi hesaplayabilen tam yığın (full-stack) bir web uygulamasıdır. 

## Özellikler

- **İnteraktif Harita:** OpenLayers altyapısı ile akıcı ve detaylı harita deneyimi.
- **Akıllı Konum Arama:** Nominatim API entegrasyonu sayesinde dünya genelinde adres ve mekan arama.
- **Gerçekçi Rota Çizimi:** OSRM (Open Source Routing Machine) API kullanılarak kuş uçuşu değil, gerçek sokakları ve caddeleri takip eden rota hesaplama.
- **Dinamik Mesafe Ölçümü:** İşaretlenen noktalar arasındaki toplam sürüş mesafesinin (km) anlık olarak hesaplanması.
- **Gelişmiş Coğrafi İşlemler:** Backend tarafında NetTopologySuite kullanılarak koordinat verilerinin GeoJSON formatında profesyonelce işlenmesi.

## Kullanılan Teknolojiler

**Frontend:**
- React (Vite)
- Tailwind CSS
- OpenLayers (Harita Render Motoru)

**Backend:**
- C# .NET Web API
- NetTopologySuite (NTS)
- GeoJSON4STJ

**Harici API'ler:**
- Nominatim API (Geocoding / Arama)
- OSRM API (Routing / Rota Çizimi)

##  Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

### Backend'i (C#) Çalıştırma
Backend, coğrafi verileri işlemek için `http://localhost:5256` portunda çalışmalıdır.
```bash
cd Backend/PinPathAPI
dotnet restore
dotnet run# 📍 PinPath

