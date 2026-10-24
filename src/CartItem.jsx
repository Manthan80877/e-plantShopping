import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import PropTypes from 'prop-types';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Helper function to safely parse the cost whether it's a string with '$' or a number
  const parseCost = (cost) => {
    if (typeof cost === 'number') return cost;
    if (typeof cost === 'string') return parseFloat(cost.replace(/[^0-9.-]+/g, "")) || 0;
    return 0;
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseCost(item.cost) * item.quantity);
    }, 0);
  };

  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity;
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

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your Shopping Cart is Empty</h2>
        <button 
          onClick={onContinueShopping} 
          aria-label="Continue Shopping"
          className="action-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartItems.map(item => (
          <div key={item.name} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div>Unit Price: {typeof item.cost === 'number' ? `$${item.cost}` : item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  onClick={() => handleDecrement(item)} 
                  aria-label={`Decrease quantity of ${item.name}`}
                  className="cart-item-button">
                  -
                </button>
                <span className="cart-item-quantity-value" aria-label={`Quantity of ${item.name}`}>
                  {item.quantity}
                </span>
                <button 
                  onClick={() => handleIncrement(item)} 
                  aria-label={`Increase quantity of ${item.name}`}
                  className="cart-item-button">
                  +
                </button>
              </div>
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              <button 
                onClick={() => handleRemove(item)} 
                aria-label={`Remove ${item.name} from cart`}
                className="cart-item-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-actions">
        <button 
          onClick={onContinueShopping} 
          aria-label="Continue Shopping"
          className="action-btn">
          Continue Shopping
        </button>
        <button 
          onClick={() => alert('Checkout functionality coming soon!')} 
          aria-label="Checkout"
          className="action-btn">
          Checkout
        </button>
      </div>
    </div>
  );
};

// PropTypes for best practices type-checking
CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;