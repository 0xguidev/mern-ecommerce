import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { getUserDetails, updateUser } from '../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import BackButton from '../components/BackButton';

const UserEditSreen = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    isAdmin: '',
  });
  const [isShowMsg, setIsShowMsg] = useState(false)
  const { userDetails, errorDetails, stateUpdateUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userDetails) {
      setUserData({
        ...userData,
        name: userDetails.name,
        email: userDetails.email,
        isAdmin: userDetails.isAdmin,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  useEffect(() => {
    if(stateUpdateUser){
      showSuccessMsg()
    }
  }, [stateUpdateUser])
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, userData));
  };

  const showSuccessMsg = () => {
    setIsShowMsg(true)
    setTimeout(() => {
      setIsShowMsg(false)
    }, 5000)
  }

  return (
    <Container>
      <Row className='align-items-start'>
        <Col md={3} className='h-100'>
          <BackButton />
        </Col>
        <Col md={6}>
          <h1>Edit user</h1>
          {!userDetails ? (
            <Loading />
          ) : errorDetails ? (
            <Message variant={'danger'}>{errorDetails}</Message>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className='mb-3' controlId='formBasicName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      value={userData.name}
                      minLength={4}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type='email'
                      value={userData.email}
                      minLength={5}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='isAdmin'>
                    <Form.Check
                      type='checkbox'
                      label='Is admin'
                      checked={userData.isAdmin}
                      onChange={(e) =>
                        setUserData({ ...userData, isAdmin: e.target.checked })
                      }
                    />
                  </Form.Group>

                  <Button variant='primary' type='submit' className='w-100'>
                    Update
                  </Button>
                  {isShowMsg ? <Message variant={'success'}>User updated success</Message> : null}
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserEditSreen;
