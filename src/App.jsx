import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Favorites from './pages/Favorites';
import './index.css';

function App() {
  return (
    <Router>
      <header>
        <nav className="navbar">
          <Link to="/">Главная</Link>
          <Link to="/favorites">Избранное</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
