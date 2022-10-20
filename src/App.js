import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import MainRoutes from './mainRoutes.js';

// console.log ("App");

function App() {
  return (

  <>
      <Header />
      <MainRoutes />
  </>
    
  );
}

export default App;
