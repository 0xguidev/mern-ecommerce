import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loading from '../components/Loading';
import Products from '../components/Products';
import { asyncListProduct } from '../redux/reducers/ProductReducer';

const HomeScreen = () => {
  const products = useSelector((state) => state.productList.products);
  const error = useSelector((state) => state.productList.error);
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(asyncListProduct());

      setIsLoad(true);
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {!isLoad ? (
        <Loading />
      ) : error.length > 0 ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Products product={product}>{product.name}</Products>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
