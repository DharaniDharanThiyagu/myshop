import React, { useEffect, useState } from 'react';
import ProductCart from './ProductCart';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const[searchParams,setSearchParms]=useSearchParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/products?'+searchParams);
        setProducts(response.data.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, [searchParams]);
  return (
    <>
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCart key={product._id} product={product} />
            ))
          ) : (
           <center>
            <h1>No Products Available</h1></center>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
