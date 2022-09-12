import logo from './logo.svg';
import React from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import Persons from './components/Persons'
import BuscarPersona from './components/BuscarPersona';
import { Routes, Route } from 'react-router-dom'
import AgregarPersona from './components/AgregarPersona';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className="App">
      <Navbar/>
      <h1>Personas</h1><hr/>
      <Routes>
        <Route path="/buscar-persona" element={<BuscarPersona/>}/>
        <Route path='/agregar-persona' element={<AgregarPersona/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
