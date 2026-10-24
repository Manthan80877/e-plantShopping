import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      // Remove the '$' sign and convert to number for calculation
      const cost = parseFloat(item.cost.substring(1));
      return total + (cost * item.quantity);
    }, 0);
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return cost * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartItems.map(item => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '15px 0' }}>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
            <div style={{ flex: 1, marginLeft: '20px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{item.name}</div>
              <div>Unit Price: {item.cost}</div>
              <div style={{ margin: '10px 0', display: 'flex', alignItems: 'center' }}>
                <button onClick={() => handleDecrement(item)} style={{ padding: '5px 15px', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>-</button>
                <span style={{ margin: '0 15px', fontSize: '1.2rem', fontWeight: 'bold' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{ padding: '5px 15px', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>+</button>
              </div>
              <div style={{ fontWeight: 'bold', color: '#333' }}>Subtotal: ${calculateTotalCost(item)}</div>
              <button onClick={() => handleRemove(item)} style={{ marginTop: '10px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={onContinueShopping} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}>Continue Shopping</button>
        <button onClick={() => alert('Checkout functionality coming soon!')} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '12px 25px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '1rem' }}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;