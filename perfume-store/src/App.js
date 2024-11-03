import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Catalog from './components/Catalog/Catalog';
import Footer from './components/Footer/Footer';

function App() {
  return (
      <Router>
          <div className="App">
              <Navbar/>
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/public" element={<HomePage/>} />
                  <Route path="/catalog" element={<Catalog/>} />
              </Routes>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;