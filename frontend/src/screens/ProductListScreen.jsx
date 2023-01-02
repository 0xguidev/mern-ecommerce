/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Button, Container, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { asyncListProduct, deleteProduct } from '../redux/reducers/productReducer';

export default function ProductListScreen() {
  const dispatch = useDispatch();
  const { products, error, successDelete } = useSelector((state) => state.product);
  const {
    loginState,
    user: { isAdmin }
  } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState && isAdmin) {
      dispatch(asyncListProduct());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      return dispatch(deleteProduct(id));
    }
  };

  return (
    <Container>
      <h1>PRODUCTS</h1>
      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : !products ? (
        <Loading />
      ) : (
        <Table stripped='true' bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>PRICE</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
