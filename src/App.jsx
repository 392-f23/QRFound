import { useState } from 'react';
import logo from './logo.svg';
import Header from './components/header/Header';
import ActivatePage from './ActivatePage';
import './App.css';
import Map from './components/map/Map';
import Items from './components/items/Items';

const App = () => {
  const items = [
    { id: 1, name: 'iPhone 13' },
    { id: 2, name: 'iPad Pro' },
    { id: 3, name: 'MacBook Pro' },
    { id: 4, name: 'Water Bottle' },
    { id: 5, name: 'Backpack' },
    // Add more devices here...
  ];
  return (
    <div className="App">
      {/* <Header></Header>
      <ActivatePage></ActivatePage> */}

      <div>
      <Map className="map"></Map>
      </div>

      <div className="items">
      <Items items={items}></Items>
      </div>

    </div>
  );
};

export default App;
