import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Catalog from './components/Catalog/Catalog';
import PerfumeDetails from './components/PerfumeDetails/PerfumeDetails';
import {PerfumeProvider} from './context/PerfumeContext';
import Footer from './components/Footer/Footer';

function App() {
  return (
      <Router>
          <div className="App">
              <Navbar/>
              <PerfumeProvider>
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/public" element={<HomePage/>} />
                  <Route path="/catalog" element={<Catalog/>} />
                  <Route path="/perfume/:id" element={<PerfumeDetails/>} />
                  <Route path="/contact" element={<HomePage/>} />
              </Routes>
              </PerfumeProvider>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;