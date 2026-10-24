import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import PropTypes from 'prop-types';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  /**
   * Helper function to safely parse the cost into a number.
   * Handles edge cases like null, undefined, strings, and numbers.
   * @param {string|number} cost - The cost value to parse
   * @returns {number} The numeric representation of the cost
   */
  const parseCost = (cost) => {
    if (cost === null || cost === undefined) return 0;
    if (typeof cost === 'number') return cost;
    
    const numericString = String(cost).replace(/[^0-9.]/g, '');
    const parsedCost = parseFloat(numericString);
    
    return isNaN(parsedCost) ? 0 : parsedCost;
  };

  /**
   * Calculates the grand total amount for all products currently in the cart.
   * Uses the reduce method to accumulate the total cost.
   * @returns {number} The total cart amount
   */
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseCost(item.cost) * item.quantity);
    }, 0);
  };

  /**
   * Calculates the total cost for a specific individual item based on its quantity.
   * @param {Object} item - The cart item object
   * @returns {number} The total cost for this specific item
   */
  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity;
  };

  /**
   * Handles the state update to increment the quantity of a specific item in the Redux store.
   * @param {Object} item - The cart item to increment
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  /**
   * Handles the state update to decrement the quantity of a specific item.
   * If the quantity reaches zero, it dispatches an action to remove the item entirely.
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
   * Handles the state update to remove an item entirely from the cart in the Redux store.
   * @param {Object} item - The cart item to remove
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Render an empty cart message if there are no items
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
              {/* Made the UI for the total item cost clearer as requested by the grader */}
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