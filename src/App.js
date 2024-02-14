import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FileProvider } from './context/FileContext';
import OthrComponent from './components/OthrComponent';
import MainComponent from './components/MainComponent';
import ScComponent from './components/ScComponent';
import ScDetail from './components/Scdetail';
import MenuComponent from './components/MenuComponent';
import IsmsComponent from './components/IsmsComponent';
import LtComponent from './components/LtComponent';
import FileInputScreen from './components/FileInputScreen';
import ResetComponent from './components/ResetComponent';
import './App.css';

function App() {
  return (
    <Router>
      <FileProvider>
        <Routes>
          <Route path="/" element={<FileInputScreen />} />
          <Route path="/main" element={<MainComponent />} />
          <Route path="/sc" element={<ScComponent />} /> {/* 詳細表示が必要 */}
            <Route path="/sc/:id" element={<ScDetail />} />
          <Route path="/menu" element={<MenuComponent />} /> {/* 詳細表示が必要 */} 
            <Route path="/menu/:id" element={<ScComponent />} />
          <Route path="/isms" element={<IsmsComponent />} />
          <Route path="/lt" element={<LtComponent />} /> {/* 詳細表示が必要 */}
            <Route path="/lt/:id" element={<ScComponent />} />
          <Route path="/othr" element={<OthrComponent />} />
          <Route path="/reset" element={<ResetComponent />} />
        </Routes>
      </FileProvider>
    </Router>
  );
}

export default App;