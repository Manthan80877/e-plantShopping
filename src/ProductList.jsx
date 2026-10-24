import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plantsArray = [
    {
        category: "Air Purifying Plants",
        plants: [
            { name: "Snake Plant", image: "https://images.unsplash.com/photo-1628170341772-4375b481ceec?q=80&w=200&auto=format&fit=crop", cost: "$15" },
            { name: "Spider Plant", image: "https://images.unsplash.com/photo-1616781296068-07de49266159?q=80&w=200&auto=format&fit=crop", cost: "$12" },
            { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593696954577-ab8d2a6a1170?q=80&w=200&auto=format&fit=crop", cost: "$18" },
            { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=200&auto=format&fit=crop", cost: "$14" },
            { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1614594805320-e696bc28bc8c?q=80&w=200&auto=format&fit=crop", cost: "$20" },
            { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cb5b8d27a42?q=80&w=200&auto=format&fit=crop", cost: "$10" }
        ]
    },
    {
        category: "Aromatic Plants",
        plants: [
            { name: "Lavender", image: "https://images.unsplash.com/photo-1606041011872-5965904ef248?q=80&w=200&auto=format&fit=crop", cost: "$20" },
            { name: "Jasmine", image: "https://images.unsplash.com/photo-1590455581223-5e72d627c2b3?q=80&w=200&auto=format&fit=crop", cost: "$18" },
            { name: "Rosemary", image: "https://images.unsplash.com/photo-1595180053912-70b5514f77c3?q=80&w=200&auto=format&fit=crop", cost: "$15" },
            { name: "Mint", image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=200&auto=format&fit=crop", cost: "$12" },
            { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1634509748695-1bcbbcb3b5bc?q=80&w=200&auto=format&fit=crop", cost: "$14" },
            { name: "Basil", image: "https://images.unsplash.com/photo-1615486511484-c5a477382219?q=80&w=200&auto=format&fit=crop", cost: "$10" }
        ]
    },
    {
        category: "Succulents",
        plants: [
            { name: "Echeveria", image: "https://images.unsplash.com/photo-1510842278401-44754a652a92?q=80&w=200&auto=format&fit=crop", cost: "$8" },
            { name: "Jade Plant", image: "https://images.unsplash.com/photo-1595304910386-db8a2bf753fb?q=80&w=200&auto=format&fit=crop", cost: "$12" },
            { name: "Zebra Plant", image: "https://images.unsplash.com/photo-1598105741639-65e10e6e7655?q=80&w=200&auto=format&fit=crop", cost: "$10" },
            { name: "String of Pearls", image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?q=80&w=200&auto=format&fit=crop", cost: "$15" },
            { name: "Haworthia", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=200&auto=format&fit=crop", cost: "$9" },
            { name: "Burro's Tail", image: "https://images.unsplash.com/photo-1618335086884-601e3ee8f6e8?q=80&w=200&auto=format&fit=crop", cost: "$14" }
        ]
    }
];

const ProductList = ({ onCartClick, onHomeClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#4CAF50', color: 'white' }}>
        <div style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '20px' }} onClick={onHomeClick}>
          Paradise Nursery
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer' }} onClick={onHomeClick}>Home</span>
          <span style={{ cursor: 'pointer' }}>Plants</span>
          <span style={{ cursor: 'pointer', fontSize: '20px' }} onClick={onCartClick}>
            🛒 <span style={{ backgroundColor: 'red', borderRadius: '50%', padding: '2px 6px', fontSize: '14px' }}>{getTotalItems()}</span>
          </span>
        </div>
      </nav>

      {/* Product Grid */}
      <div style={{ padding: '20px' }}>
        {plantsArray.map((category, index) => (
          <div key={index}>
            <h2 style={{ textAlign: 'center', marginTop: '30px' }}>{category.category}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {category.plants.map((plant, plantIndex) => {
                const isAdded = cartItems.some(item => item.name === plant.name);
                return (
                  <div key={plantIndex} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button 
                      onClick={() => handleAddToCart(plant)} 
                      disabled={isAdded}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: isAdded ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isAdded ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {isAdded ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;