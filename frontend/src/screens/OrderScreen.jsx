import React from 'react';
import { useEffect } from 'react';
import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { asyncGetOrderById } from '../redux/reducers/ordersReducer';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const { order, load, error } = useSelector((state) => state.orders);
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();

  useEffect(() => {
    const getOrderById = async () => {
      await dispatch(asyncGetOrderById(id, token));
    };
    getOrderById();
  }, [id, token, dispatch]);

  return load === 'true' ? (
    <Loading />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container>
      <h1>Order Details</h1>
      <Row>
        <Col md={8}>
          <ListGroupItem>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong>
              {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message variant='success'>
                Delivered on {order.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
          </ListGroupItem>
          <ListGroupItem>
            <h2>Payment Method</h2>
            <span>Method: {order.paymentMethod ? 'PayPal' : 'Cash'}</span>
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.PaidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </ListGroupItem>
          <ListGroupItem>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message> No Orders</Message>
            ) : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
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
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    $
                    {order.orderItems
                      .reduce((total, item) => total + item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
