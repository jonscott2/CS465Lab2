import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';
import MapView from './Components/MapView';
import './Components/MapView.css';

function App() {
  return (
    <div className="App">
      <h1>CS 465 Lab2</h1> 
      <div className='MapView'>
        <MapView />
      </div>
    </div>
  );
}

export default App;
