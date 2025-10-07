// components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useState } from 'react';


// Component to handle map clicks
function ClickHandler({ setMarkerPosition, setMarkerList }) {
  useMapEvents({
    click(e) {
      const confirm = window.confirm(`Do you want to place a marker at\nLat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}?`);

      if (confirm) {
        setMarkerPosition(e.latlng);
        // append to the marker list stored in state
        setMarkerList(prev => [...prev, e.latlng]);
        console.log('Map clicked at:', e.latlng);
      } else {
        console.log('Marker placement canceled.');
      }
    },
  });
  return null;
}

function MarkerList({ markerList }) {
  return (
    <div className="marker-list">
      <h3>Current markers:</h3>
      <ul>
        {markerList.map((marker, index) => (
          <li key={index}>
            Lat: {marker.lat.toFixed(5)}, Lng: {marker.lng.toFixed(5)}
          </li>
        ))}
      </ul>
    </div>
  );
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
    const [markerList, setMarkerList] = useState([]);
    const [showList, setShowList] = useState(false);

  return (
    <>
        <MapContainer center={[43.1939, -71.5724]} zoom={13} scrollWheelZoom={true} style={{ height: '40vw', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Attach click handler */}
  <ClickHandler setMarkerPosition={setMarkerPosition} setMarkerList={setMarkerList} />

        {/* Conditionally render the single-click marker */}
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

        {/* Also render all persisted markers from state */}
        {markerList.map((pos, i) => (
          <Marker key={i} position={pos}>
            <Popup>
              Lat: {pos.lat.toFixed(4)}, Lng: {pos.lng.toFixed(4)}
            </Popup>
          </Marker>
        ))}

        </MapContainer>

        <button className='show-marker-list' onClick={() => setShowList(s => !s)}>{showList ? 'Hide' : 'Show'} Marker List</button>

        {showList && <MarkerList markerList={markerList} />}

    </>
  );
};

export default MapView;
