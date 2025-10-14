// components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { useState } from 'react';


// Component to handle map clicks
function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      // delegate handling to parent so it can open a modal and collect info
      onMapClick(e.latlng);
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
            {marker.title && <strong> - {marker.title}</strong>}
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
    // pending marker info shown in modal before confirmation
    const [pending, setPending] = useState(null); // { latlng, title, description }

    function handleMapClick(latlng) {
      // open modal to collect title/description
      setPending({ latlng, title: '', description: '' });
    }

    function confirmPending() {
      if (!pending) return;
      const pos = pending.latlng;
      const markerData = { ...pos, title: pending.title, description: pending.description };
      setMarkerPosition(pos);
      setMarkerList(prev => [...prev, markerData]);
      console.log('Marker confirmed at:', pos, markerData);
      setPending(null);
    }

    function cancelPending() {
      console.log('Marker placement canceled.');
      setPending(null);
    }

  return (
    <>
        <MapContainer center={[43.1939, -71.5724]} zoom={13} scrollWheelZoom={true} style={{ height: '40vw', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

    {/* Attach click handler */}
  <ClickHandler onMapClick={handleMapClick} />

    {/* Conditionally render the single-click marker */}
    {markerPosition && (
      <Marker position={markerPosition}>
      <Popup>
        <div>
          {/* What goes inside the marker popup when clicked */}
          <p className='marker-popup'>Latest marker</p>
          Lat: {markerPosition.lat.toFixed(4)}, Lng: {markerPosition.lng.toFixed(4)}
        </div>
      </Popup>   
      </Marker>
    )}

        {/* Also render all persisted markers from state */}
        {markerList.map((pos, i) => (
          <Marker key={i} position={pos}>
            <Popup>
              <div>
                <strong>{pos.title}</strong>
                <div>Lat: {pos.lat.toFixed(4)}, Lng: {pos.lng.toFixed(4)}</div>
                {pos.description && <div>{pos.description}</div>}
              </div>
            </Popup>
          </Marker>
        ))}

        </MapContainer>

        <button className='show-marker-list' onClick={() => setShowList(s => !s)}>{showList ? 'Hide' : 'Show'} Marker List</button>
        <button className='clear-marker-list' onClick={() => { setMarkerList([]); setMarkerPosition(null); }}>Clear All Markers</button>

        {showList && <MarkerList markerList={markerList} />}

        {/* Modal to collect marker info before confirming */}
        {pending && (
          <div className="marker-modal-backdrop">
            <div className="marker-modal">
              <h3>Add marker</h3>
              <div>Lat: {pending.latlng.lat.toFixed(5)}, Lng: {pending.latlng.lng.toFixed(5)}</div>
              <label>
                Title:
                <input value={pending.title} onChange={e => setPending(p => ({ ...p, title: e.target.value }))} />
              </label>
              <label>
                Description:
                <textarea value={pending.description} onChange={e => setPending(p => ({ ...p, description: e.target.value }))} />
              </label>
              <div className="modal-actions">
                <button onClick={confirmPending}>Confirm</button>
                <button onClick={cancelPending}>Cancel</button>
              </div>
            </div>
          </div>
        )}

    </>
  );
};

export default MapView;
