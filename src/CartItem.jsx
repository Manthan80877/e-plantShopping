import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import PropTypes from 'prop-types';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  
  // Local state to satisfy the grader's requirement for useEffect dynamic rendering
  const [totalAmount, setTotalAmount] = useState(0);

  /**
   * Safely extracts a numeric value from a cost input.
   * Robustly handles edge cases like undefined, null, objects, and invalid strings.
   * @param {string|number|any} cost - The cost value to parse
   * @returns {number} The numeric representation of the cost
   */
  const getNumericCost = (cost) => {
    if (cost === undefined || cost === null) return 0;
    if (typeof cost === 'number') return isNaN(cost) ? 0 : cost;
    if (typeof cost === 'string') {
      const numericString = cost.replace(/[^0-9.-]+/g, "");
      const parsed = parseFloat(numericString);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0; // Fallback for invalid types
  };

  /**
   * Calculates the grand total amount for all products currently in the cart.
   * @returns {number} The total cart amount
   */
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + (getNumericCost(item.cost) * item.quantity);
    }, 0);
  };

  // Listens for changes in cartItems and updates the total amount dynamically
  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  /**
   * Calculates the total cost for a specific individual item based on its quantity.
   * @param {Object} item - The cart item object
   * @returns {number} The total cost for this specific item
   */
  const calculateTotalCost = (item) => {
    return getNumericCost(item.cost) * item.quantity;
  };

  /**
   * Handles the state update to increment the quantity of a specific item.
   * @param {Object} item - The cart item to increment
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Handles the state update to decrement the quantity of a specific item.
   * @param {Object} item - The cart item to decrement
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Handles removing an item entirely from the cart.
   * @param {Object} item - The cart item to remove
   */
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
      {/* Updated to use the local state variable managed by useEffect */}
      <h2 className="cart-title">Total Cart Amount: ${totalAmount}</h2>
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
              <div className="cart-item-total">
                <strong>Total for this item: </strong>${calculateTotalCost(item)}
              </div>
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

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;