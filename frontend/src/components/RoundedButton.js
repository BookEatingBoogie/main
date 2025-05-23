import styled from 'styled-components';

const RoundedButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1.25rem;           /* 12px → 0.75rem, 20px → 1.25rem */
  border: 0.125rem solid ${({ borderColor }) => borderColor || '#fff'}; /* 2px → 0.125rem */
  border-radius: 1.875rem;            /* 30px → 1.875rem */
  background-color: ${({ bgColor }) => bgColor || '#fff'};
  color: ${({ fontColor }) => fontColor || 'black'};
  font-weight: bold;
  cursor: pointer;
  max-width: 35rem;
  margin: 0  auto 0.625rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(4px);
    opacity: 0.8;
  }
`;

export default RoundedButton;