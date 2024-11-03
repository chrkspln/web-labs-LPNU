import React from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import AboutUs from "../AboutUs/AboutUs";
import AboutPerfumes from "../AboutPerfumes/AboutPerfumes";
import Footer from "../Footer/Footer";

const HomePage = () => {
    return (
        <div className="App">
            <Header/>
            <AboutUs/>
            <AboutPerfumes/>
        </div>
    );
}

export default HomePage;