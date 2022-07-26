import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const { id } = useParams();
  const [prod, setProd] = useState({});
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchProd = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/products/${id}`
      );

      setProd(data);
      setIsLoad(true);
    };
    fetchProd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !isLoad ? (
    <div className="text-center">
      <div className="spinner-grow m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={prod.image} alt={prod.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{prod.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={prod.rating} text={`${prod.numReviews}`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${prod.price}</ListGroup.Item>
            <ListGroup.Item>Description: {prod.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${prod.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {prod.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="d-grid gap-2">
                <Button
                  className="btn btn-lg btn-primary"
                  type="button"
                  disabled={prod.countInStock === 0}
                >
                  {' '}
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
