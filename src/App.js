import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import OthrComponent from './components/OthrComponent';
import MainComponent from './components/MainComponent';
import ScComponent from './components/ScComponent';
import MenuComponent from './components/MenuComponent';
import IsmsComponent from './components/IsmsComponent';
import LtComponent from './components/LtComponent';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/main" element={<MainComponent />} />
        <Route path="/sc" element={<ScComponent />} />
        <Route path="/menu" element={<MenuComponent />} />
        <Route path="/isms" element={<IsmsComponent />} />
        <Route path="/lt" element={<LtComponent />} />
        <Route path="/othr" element={<OthrComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
