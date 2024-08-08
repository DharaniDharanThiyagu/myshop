import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductDetail = ({ setCartItems, cartItems }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProduct(response.data.data);
        // Check if the product is already in the cart
        const existingItem = cartItems.find(item => item._id === id);
        if (existingItem) {
          setQuantity(existingItem.quantity);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details.');
      }
    };
    fetchData();
  }, [id, cartItems]);

  const handleAddToCart = () => {
    if (product) {
      const productWithQuantity = { ...product, quantity };
      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter(item => item._id !== product._id); 
        return [...updatedItems, productWithQuantity];
      });
      toast.success('Product added to cart!');
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = Math.max(1, parseInt(event.target.value, 10) || 1);
    setQuantity(newQuantity);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container container-fluid">
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <img src={product.images[0]?.image || '/images/products/default.jpg'} alt={product.name} height="500" width="500" />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>
          <p id="product_id">Product # {product._id}</p>

          <hr />

          <div className="rating-outer">
            <div className="rating-inner" style={{ width: `${(product.rating / 5) * 100}%` }}></div>
          </div>

          <hr />

          <p id="product_price">${product.price}</p>
          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={() => setQuantity(quantity - 1)} aria-label="Decrease quantity">-</span>
            <input 
              type="number" 
              className="form-control count d-inline" 
              value={quantity} 
              onChange={handleQuantityChange} 
              aria-label="Product quantity"
            />
            <span className="btn btn-primary plus" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</span>
          </div>
          <button 
            type="button" 
            id="cart_btn" 
            className="btn btn-primary d-inline ml-4" 
            onClick={handleAddToCart}
            aria-label="Add product to cart"
          >
            Add to Cart
          </button>

          <hr />

          <p>Status: <span id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>

          <hr />
          <p id="product_seller" className="mb-3">Sold by: <strong>{product.seller}</strong></p>

          <div className="rating w-50"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
