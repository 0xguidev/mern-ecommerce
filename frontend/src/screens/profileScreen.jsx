import {Col, Container, Row} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Message from "../components/Message";
import {useNavigate} from "react-router-dom";
import {asyncUserUpdateRequest} from "../redux/reducers/userUpdateReducer";

function ProfileScreen() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassord: '',
        isDisabled: true
    })
    const [isError, setIsError] = useState('');

    const dispatch = useDispatch()
    const loginState = useSelector((state) => state.userLogin.loginState)
    const error = useSelector((state) => state.registerUser.error)
    const user = useSelector((state) => state.userLogin.user)
    const token = useSelector((state) => state.userLogin.token)
    const navigate = useNavigate()

    useEffect(
        () => {
            if (error) {
                setIsError(error)
            }
            if(!loginState) {
                navigate('/')
            }
        }, [error, loginState]
    )

    useEffect(
        () => {
            if(typeof userData.password === 'string') {
                if (userData.password !== '') {
                    if (userData.password.length >= 8) {
                        if (userData.password === userData.confirmPassord) {
                            setUserData({...userData, isDisabled: false})
                        } else {
                            setUserData({...userData, isDisabled: true})
                        }
                    }
                }
            }
        }, [userData]
    )

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(asyncUserUpdateRequest(userData.password, token))
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row className='justify-content-center'>
                    <Col xs={6} md={3}>
                        <h2>Edit Profile</h2>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={user.name}
                                disabled={true}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={user.email}
                                disabled={true}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setUserData({...userData, password: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                onChange={(e) => setUserData({...userData, confirmPassord: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out"/>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={userData.isDisabled}
                        >
                            Update
                        </Button>
                        {
                            (isError) ?? <Message varaiant={'danger'}>{error}</Message>
                        }
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default ProfileScreen;