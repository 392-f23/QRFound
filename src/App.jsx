import { useState } from 'react';
import logo from './logo.svg';
import Header from './components/header/Header';
import ActivatePage from './ActivatePage';
import './App.css';
import Map from './components/map/Map';
import Items from './components/items/Items';

const App = () => {
  return (
    <div className="App">
      {/* <Header></Header>
      <ActivatePage></ActivatePage> */}
      <Map></Map>
      <Items></Items>
    </div>
  );
};

export default App;
