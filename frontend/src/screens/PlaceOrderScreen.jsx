import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { asyncCreateOrder } from '../redux/reducers/order';

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { order } = useSelector((state) => state.orders);
  const [orderStatus, setOrderStatus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const placeOrderHandle = () => {
    dispatch(
      asyncCreateOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shipping,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.checkout.itemsPrice,
        shippingPrice: cart.checkout.shippingPrice,
        taxPrice: cart.checkout.taxPrice,
        totalPrice: cart.checkout.totalPrice,
      })
    );

    setOrderStatus(true);
  };

  useEffect(() => {
    const verifyStatus = () => {
      if (order._id) {
        navigate(`/order/${order._id}`);
        setOrderStatus(false);
      }
    };
    verifyStatus();
  }, [order, navigate]);

  return orderStatus ? (
    <Loading />
  ) : (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shipping.address},{' '}
                {cart.shipping.city}, {cart.shipping.postalCode},{' '}
                {cart.shipping.country}
              </p>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message> Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
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
                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.checkout.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.checkout.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.checkout.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.checkout.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandle}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
