import styled from 'styled-components';
import LoadSpinner from '@/assets/images/load-spinner.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33.75rem;

  @media only screen and (max-width: 360px) {
    margin-top: 0;
  }
`;

export const Spinner = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-image: url(${LoadSpinner});
  animation: spin 1s infinite linear;

  width: 3.875rem;
  height: 3.875rem;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
