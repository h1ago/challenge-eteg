import styled from 'styled-components';

export const Button = styled.button`
  width: 10.8125rem;
  height: 2.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: var(--blue-800);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--white);
  text-transform: uppercase;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
