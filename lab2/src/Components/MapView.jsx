// components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useState } from 'react';


// Component to handle map clicks
function ClickHandler({ setMarkerPosition }) {
  useMapEvents({
    click(e) {
      const confirm = window.confirm(`Do you want to place a marker at\nLat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}?`);
      
      if (confirm) {
        setMarkerPosition(e.latlng);
        console.log('Map clicked at:', e.latlng);
      } else {
        console.log('Marker placement canceled.');
      }
    },
  });
  return null;
}

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
    const [markerPosition, setMarkerPosition] = useState(null);

  return (
    <MapContainer center={[43.1939, -71.5724]} zoom={13} scrollWheelZoom={true} style={{ height: '40vw', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}

      {/* Attach click handler */}
      <ClickHandler setMarkerPosition={setMarkerPosition} />

      {/* Conditionally render marker */}
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            <div>
                {/* What goes inside the marker popup when clicked */}
                <p className='marker-popup'>Do you want to place a marker here?</p>
                Lat: {markerPosition.lat.toFixed(4)}, Lng: {markerPosition.lng.toFixed(4)}
            </div>
          </Popup>   
        </Marker>
      )}

    </MapContainer>
  );
};

export default MapView;
