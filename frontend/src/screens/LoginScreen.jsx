import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {asyncUserLoginRequest} from "../redux/reducers/userLoginReducer";
import { useNavigate } from "react-router-dom"


function LoginScreen() {
    const [userData, setUserData] = useState({ email: '', pass: '' });
    const [isError, setIsError] = useState('');

    const dispatch = useDispatch();
    const error = useSelector((state) => state.userLogin.error)
    const loginState = useSelector((state) => state.userLogin.loginState)
    const navigate = useNavigate()

    useEffect(
        () => {
            if(error) {
                setIsError(error)
            }
            if(loginState) {
               navigate('/')
            }
        }, [error, loginState]
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncUserLoginRequest(userData.email, userData.pass))
    };

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setUserData({...userData, pass: e.target.value})}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out"/>
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
            >
                Submit
            </Button>
            {
                (isError) ??
                <div>
                    <Form.Text  muted>
                        {error}
                    </Form.Text>
                </div>
            }
        </Form>
    );
}

export default LoginScreen;