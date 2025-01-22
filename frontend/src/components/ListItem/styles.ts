import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  width: 100%;
  min-height: 7.5rem;
  height: 7.5rem;
  color: var(--blue-800);
  border-radius: 0.625rem;
  align-items: center;
  gap: 0.625rem;
  border: 1px solid var(--blue-800);
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const IconTextWrapper = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: center;
`;

export const VerticalBar = styled.div`
  width: 1.25rem;
  height: 100%;
  border-bottom-left-radius: 0.625rem;
  background-color: var(--blue-800);
  border-top-left-radius: 0.625rem;
`;

export const Text = styled.h1`
  font-size: 1rem;
  font-weight: 700;
`;
