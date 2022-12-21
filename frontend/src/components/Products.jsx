import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Products = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as='div' className='text-secondary'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as='h3' className='text-secondary'>
            ${product.price}
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Products;
