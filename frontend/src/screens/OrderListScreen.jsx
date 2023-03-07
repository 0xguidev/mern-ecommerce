/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { deleteUser, getListUsers } from '../redux/reducers/user';

export default function UserListScreen() {
  const dispatch = useDispatch();
  const {
    listUsers,
    loadingList,
    errorList,
    loginState,
    user: { isAdmin },
    deleteSuccess,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState && isAdmin) {
      dispatch(getListUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, deleteSuccess]);

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure?')){
      return dispatch(deleteUser(id));
    }
  };

  return (
    <Container>
      <h1>Users</h1>
      {!listUsers && loadingList ? (
        <Loading />
      ) : errorList ? (
        <Message variant='danger'>{errorList}</Message>
      ) : (
        <Table stripped='true' bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red ' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
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
