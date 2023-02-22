import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../redux/reducers/cart';

function ShippingScreen() {
  const dispatch = useDispatch();
  const { shipping } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [address, setAdress] = useState(shipping.address);
  const [city, setCity] = useState(shipping.city);
  const [country, setCountry] = useState(shipping.country);
  const [postalCode, setPostaCode] = useState(shipping.postalCode);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, country, postalCode }));
    navigate('/payment');
  };

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Form onSubmit={handleSubmit}>
        <Row className='justify-content-center'>
          <Col xs={6} md={3}>
            <h3>Shipping</h3>
            <Form.Group className='mb-3' controlId='formControlAddress'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Address'
                value={address}
                onChange={(e) => setAdress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formControlCity'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formControlCountry'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formControlPostalCode'>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type='text'
                placeholder='Postal Code'
                value={postalCode}
                onChange={(e) => setPostaCode(e.target.value)}
              />
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

export default ShippingScreen;
