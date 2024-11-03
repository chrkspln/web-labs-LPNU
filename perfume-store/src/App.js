import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import AboutUs from './components/AboutUs/AboutUs';
import AboutPerfumes from "./components/AboutPerfumes/AboutPerfumes";
import Footer from './components/Footer/Footer';

function App() {
  return (
      <div className="App">
        <Navbar/>
        <Header/>
        <AboutUs/>
        <AboutPerfumes/>
        <Footer/>
      </div>
  );
}

export default App;