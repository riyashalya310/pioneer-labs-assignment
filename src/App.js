import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Wallet from './pages/wallet.jsx';
import PopulationData from './pages/Population/PopulationData.js';
import CryptoPrices from './pages/CryptoPrices/CryptoPrices.js';
import MetaMaskIntegration from './pages/MetaMaskIntegration/MetaMaskIntegration.jsx';
import History from './pages/History.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/population-data" element={<PopulationData />} />
          <Route path="/crypto-prices" element={<CryptoPrices />} />
          <Route path="/meta-mask-integration" element={<MetaMaskIntegration />} />
          <Route path="/history" element={<History />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;