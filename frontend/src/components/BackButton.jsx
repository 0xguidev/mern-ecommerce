import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function BackButton() {
  const navigate = useNavigate();
  function handleClick() {
    navigate(-1)
  }

  return (
    <Button onClick={handleClick}>Go Back</Button>
  );
}

export default BackButton;