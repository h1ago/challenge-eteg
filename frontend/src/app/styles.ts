import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --blue-400: #0d6efd;
    --blue-800: #3F3D56; 
    --gray-400: #999999;
    --gray-700: #2F2E41;
    --red-400: #E53E3E;
    --text: #2F2E41;
    --white: #FFF;
  }

  .root {
    display: flex;
    justify-content: center;
  }

  * {
  box-sizing: border-box;
  }

  body {
    font-size: 1rem;
    font-family: "Open Sans";
    font-style: normal;
    box-sizing: border-box;
    margin: 0;
    line-height: 1;
    background-color: var(--gray-700);
    color: var(--text);
  }

  h1, p {
    margin: 0;
  }
`;

export const Container = styled.main`
  width: 100%;
  max-width: 67.5rem;
  padding: 3.125rem 1rem;
`;

export const Box = styled.div`
  width: 100%;
  min-height: 37.5rem;
  background-color: #fff;
  padding: 1.875rem;
  border-radius: 0.625rem;
  margin-top: 3.125rem;
`;
