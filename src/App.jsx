import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showShop, setShowShop] = useState(false);

  const handleGetStarted = () => {
    setShowShop(true);
  };

  return (
    <div className="App">
      {!showShop ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
            {/* Displaying the AboutUs component we created in Task 2 */}
            <div style={{ marginTop: '40px' }}>
              <AboutUs />
            </div>
          </div>
        </div>
      ) : (
        <div className="shop-page">
          {/* This is where the product list will go in Task 6 */}
          <h2>Welcome to the Shop! (Products Coming Soon)</h2>
        </div>
      )}
    </div>
  );
}

export default App;