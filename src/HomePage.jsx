import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom'; // Importing this hook for navigation
import 'leaflet/dist/leaflet.css';
import { useDbData } from './utilities/firebase'; 
import React, { useRef, useState, useEffect } from 'react';
import './HomePage.css'; 
import L from 'leaflet';


function HomePage({ user }) {
  const [items, setItems] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]); // Default to some location

  const [data, error] = useDbData('registered_items');

  console.log('User:', user);
  console.log('Items:', items);
  console.log('Current Location:', currentLocation);

  useEffect(() => {
    if (data) {
      const userItems = Object.entries(data)
        .filter(([_, value]) => value.userId === user?.uid)
        .map(([id, value]) => ({ id, ...value }));
  
      setItems(userItems);
    }
  }, [data, user?.uid]);
  

  const mapRef = useRef(); // Reference to the Leaflet map

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newLocation = [position.coords.latitude, position.coords.longitude];
      setCurrentLocation(newLocation);
      if (mapRef.current) {
        mapRef.current.flyTo(newLocation, 13);
      }
    }, (err) => {
      console.error(err);
    });
  }, []);

  const navigate = useNavigate();  // Initialize the useNavigate hook

  const [selectedItem, setSelectedItem] = useState(null);


  const handleItemClick = (item) => {
    setCurrentLocation([item.location[0], item.location[1]]);
    mapRef.current.flyTo([item.location[0], item.location[1]], 13);
    setSelectedItem(item.id);
  };
  

  const customIcon = new L.Icon({
    iconUrl: '/item.png',
    iconSize: [50, 50],
    iconAnchor: [50, 50],
    popupAnchor: [-3, -76]
  });

  return (
    <div>
      <MapContainer center={currentLocation} zoom={13} style={{ height: "400px", width: "100%" }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {items.map(item => (
          <Marker key={item.id} position={[item.location[0], item.location[1]]} icon={customIcon}>
            <Popup>
              {item.itemName}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
  
      <ul className="items-list">
          {items.map(item => (
            <li key={item.id}>
              <span onClick={() => handleItemClick(item)}>{item.itemName}</span>
              {selectedItem === item.id && <button onClick={() => navigate(`/myqr/${item.id}`)}>Go to myqr</button>}
            </li>
          ))}
      </ul>



    </div>
  );
}

export default HomePage;
