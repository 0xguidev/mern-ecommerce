import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../components/Products';
import { asyncListProduct } from '../redux/reducers/ProductReducer';

const HomeScreen = () => {
  const products = useSelector((state) => state.productList.products);
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(asyncListProduct());

      setIsLoad(true);
    };
    fetchProducts();
    // eslint-disable-next-line
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
