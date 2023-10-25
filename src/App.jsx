import { useState } from 'react';
import logo from './logo.svg';
import Header from './components/header/Header';
import ActivatePage from './ActivatePage';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <ActivatePage></ActivatePage>
    </div>
  );
};

export default App;
