import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../redux/reducers/cart';

function PaymentScreen() {
  const dispatch = useDispatch();
  const { shipping, paymentMethod } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (!shipping) {
    navigate('/shipping');
  }

  const [payment, setPayment] = useState(paymentMethod || 'PayPal');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate('/placeOrder');
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Form onSubmit={handleSubmit}>
        <Row className='justify-content-center'>
          <Col xs={6} md={3}>
            <h3>PaymentMethod</h3>
            <Form.Group>
              <Form.Label as='legend'>Select Method</Form.Label>
              <Col>
                <Form.Check
                  type='radio'
                  label='PayPal or Credit Card'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked={
                    payment === '' || payment === 'PayPal' ? true : false
                  }
                  onChange={(e) => setPayment(e.target.value)}
                ></Form.Check>
              </Col>

              <Col>
                <Form.Check
                  type='radio'
                  label='Stripe'
                  id='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  checked={payment === 'Stripe'}
                  onChange={(e) => setPayment(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default PaymentScreen;
