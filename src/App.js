// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FileProvider } from './context/FileContext'; // Import FileProvider
import OthrComponent from './components/OthrComponent';
import MainComponent from './components/MainComponent';
import ScComponent from './components/ScComponent';
import MenuComponent from './components/MenuComponent';
import IsmsComponent from './components/IsmsComponent';
import LtComponent from './components/LtComponent';
import FileInputScreen from './components/FileInputScreen'; // Fix import path
import './App.css';

function App() {
  return (
    <Router>
      <FileProvider> {/* Wrap your application with FileProvider */}
        <Routes>
          <Route path="/" element={<FileInputScreen />} /> {/* Fix component name */}
          <Route path="/main" element={<MainComponent />} />
          <Route path="/sc" element={<ScComponent />} />
          <Route path="/menu" element={<MenuComponent />} />
          <Route path="/isms" element={<IsmsComponent />} />
          <Route path="/lt" element={<LtComponent />} />
          <Route path="/othr" element={<OthrComponent />} />
        </Routes>
      </FileProvider>
    </Router>
  );
}

export default App;
