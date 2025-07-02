import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowPage from './pages/ShowPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people/:id" element={<ShowPage />} />
      </Routes>
    </Router>
  );
}

export default App;