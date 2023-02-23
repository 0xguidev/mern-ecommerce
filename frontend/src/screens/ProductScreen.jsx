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
  const { detailSuccess, detailError } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncSingleProduct(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (detailSuccess) {
      setIsLoad(true);
    }
  }, [detailSuccess]);

  const addtoCartHandler = () => {
    dispatch(asyncAddProduct(id, qty));
    navigate(`../cart/${id}?qty=${qty}`);
  };

  return !isLoad ? (
    <Loading />
  ) : detailError.length > 0 ? (
    <Message variant='danger'>{detailError}</Message>
  ) : (
    <Container>
      <BackButton />
      <Row className='row-product-details'>
        <Col md={6}>
          <Image src={detailSuccess.image} alt={detailSuccess.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{detailSuccess.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={detailSuccess.rating}
                text={`${detailSuccess.numReviews}`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${detailSuccess.price}</ListGroup.Item>
            <ListGroup.Item>
              Description: {detailSuccess.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${detailSuccess.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {detailSuccess.countInStock > 0
                      ? 'In Stock'
                      : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {detailSuccess.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(detailSuccess.countInStock).keys()].map(
                          (x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
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
                  disabled={detailSuccess.countInStock === 0}
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
