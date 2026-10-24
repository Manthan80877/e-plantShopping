import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';

function App() {
  const [showShop, setShowShop] = useState(false);

  return (
    <div className="App">
      {!showShop ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-btn" onClick={() => setShowShop(true)}>
              Get Started
            </button>
            <div style={{ marginTop: '30px' }}>
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <div className="shop-page">
          <ProductList 
            onHomeClick={() => setShowShop(false)} 
            onCartClick={() => alert('Cart component coming in Task 7!')} 
          />
        </div>
      )}
    </div>
  );
}

export default App;