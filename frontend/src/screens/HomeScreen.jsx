import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Products from '../components/Products';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('http://localhost:3001/api/products');
      
      setProducts(data);
      setIsLoad(true);
    };
    fetchProducts();
  }, []);

  return !isLoad ? (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Products product={product}>{product.name}</Products>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
