import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListUsers } from '../redux/reducers/userReducer';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function UserListScreen() {
  const dispatch = useDispatch();
  const { listUsers, loadingListUsers, errorListUsers } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getListUsers());
  }, [dispatch]);

  const deleteHandler = (id) => {
    console.log(id)
  }
  return (
    <>
      <h1>Users</h1>
      {!listUsers && loadingListUsers ? (
        <Loading />
      ) : errorListUsers ? (
        <Message variant='danger'>{errorListUsers}</Message>
      ) : (
        <Table stripped='true' bordered hover responsive  className='table-sm'>
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
            {listUsers.map( user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>{
                user.isAdmin ?
                  (<i className='fas fa-check' style={{ color: 'green' }}></i>) :
                  (<i className='fas fa-times' style={{ color: 'red '}}></i>)
              }</td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                </LinkContainer>
                <Button variant='danger' className='btn-sm' onClick={() => {deleteHandler(user._id)}}>
                  <i className='fas fa-trash'></i>
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
