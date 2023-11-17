import React from 'react';

const DirectionButton = ({ startLocation, endLocation }) => {
  const openDirections = () => {
    // const googleMapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(startLocation)}/${encodeURIComponent(endLocation)}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLocation[0]}%2c${startLocation[1]}&destination=${endLocation[0]}%2c${endLocation[1]}&travelmode=walking`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <button onClick={openDirections}>
      Direction
    </button>
  );
};

export default DirectionButton;
