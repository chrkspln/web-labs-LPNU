import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Catalog from './components/Catalog/Catalog';
import PerfumeDetails from './components/PerfumeDetails/PerfumeDetails';
import {PerfumeProvider} from './context/PerfumeContext';
import Footer from './components/Footer/Footer';
import {loadCartFromLocalStorage} from './redux/cartActions';
import {useDispatch} from 'react-redux';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Success from './components/Success/Success';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCartFromLocalStorage());
    }, [dispatch]);

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
                  <Route path="/cart" element={<Cart/>} />
                    <Route path="/checkout" element={<Checkout/>} />
                    <Route path="/success" element={<Success/>} />
                  <Route path="/contact" element={<HomePage/>} />
              </Routes>
              </PerfumeProvider>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;