import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Cart = ({ cartItems, setCartItems }) => {
  // Remove item from cart
  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    toast.success('Item removed from cart', { autoClose: 10000 }); // Show success message for 5 seconds
  };

  // Increase quantity of item
  const increaseQty = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
  };

  // Decrease quantity of item
  const decreaseQty = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  // Update quantity directly
  const handleQuantityChange = (index, event) => {
    const newQuantity = Math.max(1, parseInt(event.target.value, 10) || 1);
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
  };

  // Calculate total price
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Calculate total number of items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Handle empty cart
  if (cartItems.length === 0) {
    return (
      <div className="container container-fluid">
        <h2 className="mt-5">Your Cart is Empty</h2>
      </div>
    );
  }

  // Handle order submission
  const orderHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/orders`, {
        cartItems: cartItems,
        amount: getTotal()
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Order Response:', response); // Log response for debugging

      if (response.status === 201) { // Expecting status 201 for successful order creation
        toast.success('Order placed successfully!', { autoClose: 5000 }); // Show success message for 5 seconds
        setCartItems([]); // Clear cart after successful order
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error('Error placing order:', error.response || error.message);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          <hr />
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="row">
                <div className="col-4 col-lg-3">
                  <img src={item.image} alt={item.name} height="90" width="115" />
                </div>
                <div className="col-5 col-lg-3">
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </div>
                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p id="card_item_price">${Number(item.price).toFixed(2)}</p>
                </div>
                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <div className="stockCounter d-inline">
                    <span
                      className="btn btn-danger minus"
                      onClick={() => decreaseQty(index)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </span>
                    <input
                      type="number"
                      className="form-control count d-inline"
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(index, event)}
                      aria-label="Item quantity"
                    />
                    <span
                      className="btn btn-primary plus"
                      onClick={() => increaseQty(index)}
                      aria-label="Increase quantity"
                    >
                      +
                    </span>
                  </div>
                </div>
                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                  <i
                    id="delete_cart_item"
                    className="fa fa-trash btn btn-danger"
                    onClick={() => removeItem(index)}
                    aria-label="Remove item from cart"
                  ></i>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>Subtotal:  <span className="order-summary-values">{getTotalItems()} (Units)</span></p>
            <p>Est. total: <span className="order-summary-values">${getTotal()}</span></p>
            <hr />
            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={orderHandler}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
