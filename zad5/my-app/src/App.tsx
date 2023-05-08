import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Welcome from './components/Welcome';
import { Products } from './components/Products';
import {ShopContextProvider} from "./contexts/ShopContext";
import Payments from './components/Payments';
import { Basket } from './components/Basket';

function App() {
  return (
    <div className="App">
      <div>
        <ShopContextProvider>
          <BrowserRouter>
          <ul className="top-bar-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/basket">Basket</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/payments">Płatnosci</Link></li>
          </ul>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/products" element={<Products />} />
              <Route path="/basket" element={<Basket />} />
            </Routes>
          </BrowserRouter>
        </ShopContextProvider>
      </div>
    </div>
  );
}

export default App;