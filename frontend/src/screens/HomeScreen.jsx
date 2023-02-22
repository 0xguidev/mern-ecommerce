import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Products from '../components/Products';
import { asyncListProduct } from '../redux/reducers/product/ListProduct';

const HomeScreen = () => {
  const { products, error } = useSelector((state) => state.listProduct);
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    dispatch(asyncListProduct());
    setIsLoad(true);
  }, [dispatch]);

  return (
    <>
      {!isLoad ? (
        <Loading />
      ) : error.length > 0 ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Products product={product}>{product.name}</Products>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomeScreen;
