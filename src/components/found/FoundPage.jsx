import React, { useState, useEffect } from "react";
import { useDbData, useDbUpdate } from "../../utilities/firebase";
import { useParams } from "react-router-dom";  // <-- Import useParams
import "./FoundPage.css";

const FoundPage = () => {
  const [item, setItem] = useState(null);
  const { id: itemId } = useParams();  // <-- Use useParams to get the id

  // Use your defined hook to get item data
  const [dbItem] = useDbData(`registered_items/${itemId}`);

  useEffect(() => {
    setItem(dbItem);
  }, [dbItem]);

  // Use your defined hook to update item data
  const [updateData] = useDbUpdate(`registered_items/${itemId}`);

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateData({
            location: { latitude, longitude },
          });
          alert("Location updated successfully!");
        },
        () => {
          alert("Error in getting location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="activate-container">
      {item ? (
        <>
          <h2>You just found a {item.itemName}!</h2>
          <p>
            <strong>Brand:</strong> {item.brand}
          </p>
          <p>
            <strong>Color:</strong> {item.color}
          </p>
          <p>
            <strong>Type:</strong> {item.itemType}
          </p>
          {/* You can continue listing other details as you prefer */}
          <button onClick={updateLocation}>Update Location</button>
        </>
      ) : (
        <p>Loading item details...</p>
      )}
    </div>
  );
};

export default FoundPage;
