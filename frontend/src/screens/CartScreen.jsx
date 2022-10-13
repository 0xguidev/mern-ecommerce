import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  asyncAddProduct,
  removeProductFromCart,
} from '../redux/reducers/cartReducer';
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
import Message from '../components/Message';
import Loading from '../components/Loading';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { id } = useParams();
  const search = useLocation().search;
  const qty = new URLSearchParams(search).get('qty');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id && qty) {
        await dispatch(asyncAddProduct(id, qty));
      }
      setIsLoad(true);
    };
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFromCartHandler = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <>
      {!isLoad ? (
        <Loading />
      ) : (
        <Container className="main_container">
          <h1>Shopping Cart</h1>
          <Row>
            <Col md={8}>
              {cartItems.length === 0 ? (
                <>
                  <Message>Your cart is empty Go Back</Message>
                  <button type="button" onClick={() => navigate(-1)}>
                    Go Back
                  </button>
                </>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>${item.price}</Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                asyncAddProduct(
                                  item.product,
                                  Number(e.target.value)
                                )
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      items
                    </h2>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      onClick={checkoutHandler}
                    >
                      CHECKOUT
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default CartScreen;
