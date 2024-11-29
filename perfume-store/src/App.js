import React, {useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Catalog from './components/Catalog/Catalog';
import PerfumeDetails from './components/PerfumeDetails/PerfumeDetails';
import {PerfumeProvider} from './context/PerfumeContext';
import Footer from './components/Footer/Footer';
import {loadCartFromLocalStorage} from './redux/cartActions';
import {useDispatch, useSelector} from 'react-redux';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Success from './components/Success/Success';
import Login from './components/Login/Login';
import Signup from "./components/Signup/Signup";
import {LOGIN_SUCCESS} from "./redux/actionTypes";

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(loadCartFromLocalStorage());
        const token = localStorage.getItem('token');
        if (token) {
            dispatch({ type: LOGIN_SUCCESS, payload: { token } });
        }
    }, [dispatch]);

  return (
      <Router>
          <div className="App">
              <Navbar/>
              <PerfumeProvider>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/public" element={<HomePage/>} />
                  <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                  <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
                    <Route path="/catalog" element=<Catalog /> />
                    <Route path="/perfume/:id" element={isAuthenticated ? <PerfumeDetails /> : <Navigate to="/signup" />} />
                    <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/signup" />} />
                    <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/signup" />} />
                    <Route path="/success" element={isAuthenticated ? <Success /> : <Navigate to="/signup" />} />
                    <Route path="/contact" element={<HomePage/>} />
              </Routes>
              </PerfumeProvider>
              <Footer/>
          </div>
      </Router>
  );
}

export default App;