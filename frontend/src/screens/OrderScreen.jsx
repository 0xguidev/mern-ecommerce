import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { asyncOrderDetails } from '../redux/reducers/order/OrderDetailsSlice';
import {
  asyncPayOrder,
  orderPayReset,
} from '../redux/reducers/order/PayOrderSlice';


const OrderScreen = () => {
  const dispatch = useDispatch();
  const { orderDetails, errorOrderDetails } = useSelector(
    (state) => state.orderDetails
  );
  const { orderPay, loadingOrderPay } = useSelector((state) => state.payOrder);
  const { id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios({
        method: 'get',
        url: 'http://localhost:3001/api/config/paypal',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    addPayPalScript();
    if (!orderDetails || orderPay) {
      dispatch(orderPayReset())
      dispatch(asyncOrderDetails(id));
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successPaymentHandler = (paymentResult) => {
    dispatch(asyncPayOrder(id, paymentResult));
  };

  return !orderDetails ? (
    <Loading />
  ) : errorOrderDetails ? (
    <Message variant='danger'>{errorOrderDetails}</Message>
  ) : (
    <Container>
      <h1>orderDetails Details</h1>
      <Row>
        <Col md={8}>
          <ListGroupItem>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {orderDetails.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              <a href={`mailto:${orderDetails.user.email}`}>
                {orderDetails.user.email}
              </a>
            </p>
            <p>
              <strong>Address:</strong> {orderDetails.shippingAddress.address},{' '}
              {orderDetails.shippingAddress.city},{' '}
              {orderDetails.shippingAddress.postalCode},{' '}
              {orderDetails.shippingAddress.country}
            </p>
            {orderDetails.isDelivered ? (
              <Message variant='success'>
                Delivered on {orderDetails.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
          </ListGroupItem>
          <ListGroupItem>
            <h2>Payment Method</h2>
            <span>
              Method: {orderDetails.paymentMethod ? 'PayPal' : 'Cash'}
            </span>
            {orderDetails.isPaid ? (
              <Message variant='success'>Paid on {orderDetails.PaidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </ListGroupItem>
          <ListGroupItem>
            <h2>orderDetails Items</h2>
            {orderDetails.orderItems.length === 0 ? (
              <Message> No Orders</Message>
            ) : (
              <ListGroup variant='flush'>
                {orderDetails.orderItems.map((item, index) => (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>orderDetails Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    $
                    {orderDetails.orderItems
                      .reduce((total, item) => total + item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetails.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetails.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              {!orderDetails.isPaid && (
                <ListGroupItem>
                  {loadingOrderPay === 'pending' && <Loading />}
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <PayPalButton
                      amount={orderDetails.totalPrice.toFixed(2)}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
