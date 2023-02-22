import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { asyncAddProduct } from '../redux/reducers/cart';
import { asyncSingleProduct } from '../redux/reducers/product/ProductDetails';

const ProductScreen = () => {
  const { id } = useParams();
  const { product, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncSingleProduct(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if(product){
      setIsLoad(true);
    }
  }, [product])

  const addtoCartHandler = () => {
    dispatch(asyncAddProduct(id, qty));
    navigate(`../cart/${id}?qty=${qty}`);
  };

  return !isLoad ? (
    <Loading />
  ) : error.length > 0 ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container>
      <BackButton />
      <Row className='row-product-details'>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews}`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item className='d-grid gap-2'>
                <Button
                  onClick={addtoCartHandler}
                  className='btn btn-lg btn-primary'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  {' '}
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;
