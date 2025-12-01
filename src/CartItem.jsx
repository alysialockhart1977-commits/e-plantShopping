import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total cart amount
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  // Increase quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({
      name: item.name,
      quantity: item.quantity + 1
    }));
  };

  // Decrease or remove item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity - 1
      }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate item subtotal
  const calculateTotalCost = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.map(item => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />

          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">${item.price}</div>

           <div className="cart-item-quantity">
  <button className="qty-btn" onClick={() => handleDecrement(item)}>-</button>
  <span className="qty-number">{item.quantity}</span>
  <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
</div>


            <div className="cart-item-total">
              Total: ${calculateTotalCost(item)}
            </div>

            <button
              className="cart-item-delete"
              onClick={() => handleRemove(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

     <div className="cart-buttons">
  <button className="product-button" onClick={onContinueShopping}>
    Continue Shopping
  </button>

  <button className="product-button">
    Checkout
  </button>
</div> 
    </div>
  );
};

export default CartItem;
