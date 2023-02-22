import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { logoutUser } from '../redux/reducers/user';

const LogoutScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser());
    navigate('/login');
  }, [dispatch, navigate]);
  return <Loading />;
};

export default LogoutScreen;
