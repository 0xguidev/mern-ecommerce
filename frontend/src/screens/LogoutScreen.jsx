import React, { useEffect } from 'react';
import { logoutUser } from '../redux/reducers/userLoginReducer';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';

const LogoutScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser());
    navigate('/login');
  }, []);
  return <Loading />;
};

export default LogoutScreen;
