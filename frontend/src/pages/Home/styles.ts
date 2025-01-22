import styled from 'styled-components';
import { Button } from '@/components/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  overflow-y: auto;
  height: 31.25rem;
  padding: 0 0.625rem;
`;

export const NewButton = styled(Button)`
  align-self: flex-end;
`;
