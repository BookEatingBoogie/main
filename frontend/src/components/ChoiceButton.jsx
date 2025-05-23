import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 10px;
  background-image: url(${props => props.imageSrc});
  background-size: cover;
  background-position: center;
  color: #000;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0.7rem;
  cursor: pointer;
`;

const ChoiceButton = ({ text, imageSrc, onClick }) => {
  return (
    <Button imageSrc={imageSrc} onClick={onClick}>
      {text}
    </Button>
  );
};

export default ChoiceButton;