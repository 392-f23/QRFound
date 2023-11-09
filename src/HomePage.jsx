import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useDbData } from "./utilities/firebase";
import "./HomePage.css";

function HomePage({ user }) {
  const navigate = useNavigate();
  const mapRef = useRef();
  const [items, setItems] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data] = useDbData("registered_items"); // Assuming useDbData returns an array with data at index 0.

  // Update items when data changes
  useEffect(() => {
    if (data) {
      const userItems = Object.entries(data)
        .filter(([_, value]) => value.userId === user?.uid)
        .map(([id, value]) => ({ id, ...value }));
      setItems(userItems);
    }
  }, [data, user?.uid]);

  // Get and set current location
  useEffect(() => {
    const geoSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      const newLocation = [latitude, longitude];
      setCurrentLocation(newLocation);
      mapRef.current?.flyTo(newLocation, 13);
    };

    const geoError = (error) => console.error(error);

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, []);

  const handleItemClick = (item) => {
    const itemLocation = [item.location[0], item.location[1]];
    setCurrentLocation(itemLocation);
    mapRef.current?.flyTo(itemLocation, 13);
    setSelectedItem(item.id);
  };

  const haversine_distance = (mk1, mk2) => {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1[1] * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2[1] * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2[0]-mk1[0]) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  };

  return user ? (
    <div className="home-container">
      <MapContainer
        center={currentLocation}
        zoom={13}
        className="map-container"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {items.map((item, index) => {
          const pinNumber = (index % 9) + 1;
          const customIcon = new L.Icon({
            iconUrl: `/pin-${pinNumber}.png`,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });
          return (
            <Marker key={item.id} position={item.location} icon={customIcon}>
              <Popup>
                {item.color} {item.brand} {item.itemName}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="items-panel">
        <ul className="items-list">
          <p className="my-items-p">{user.displayName}'s Items</p>
          {items.map((item, index) => {
            const pinNumber = (index % 9) + 1;
            return (
              <li
                key={item.id}
                className="item-entry"
                onClick={() => handleItemClick(item)}
              >
                <div className="pin-and-name">
                  <img
                    className="pin-image"
                    src={`/pin-${pinNumber}.png`}
                  ></img>
                  <p>{item.color} {item.brand} {item.itemName} <span style={{color:'skyblue'}}>{haversine_distance(currentLocation, item.location).toFixed(2)} miles</span> </p>
                </div>
                {selectedItem === item.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/myqr/${item.id}`);
                    }}
                  >
                    Get My QR
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  ) : (
    <p className="no-account-text">Please Sign In To Continue Using QRFound</p>
  );
}

export default HomePage;
