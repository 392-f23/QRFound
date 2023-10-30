import { useState } from 'react';
import logo from './logo.svg';
import Header from './components/header/Header';
import ActivatePage from './ActivatePage';
import './App.css';
import Map from './components/map/Map';
import Items from './components/items/Items';
import {useDbData} from './utilities/firebase.js'
import { useEffect } from 'react';

const App = () => {

  const items = useDbData(`/registered_items`)


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
