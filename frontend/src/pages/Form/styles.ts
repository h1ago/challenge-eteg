import styled from 'styled-components';
import { Button } from '@/components/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
`;

export const Title = styled.h1`
  text-align: center;
  color: var(--gray-700);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--gray-700);
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

export const Textarea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
  resize: none;
  &:focus {
    border-color: #007bff;
  }
`;

export const SubmitButton = styled(Button)`
  background-color: var(--blue-400);
`;

export const CancelButton = styled(Button)`
  background-color: var(--gray-400);
`;

export const DeleteButton = styled(Button)`
  background-color: var(--red-400);
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1.25rem;
`;

export const Message = styled.p`
  color: var(--red-400);
  font-size: 0.875rem;
  margin-top: -0.75rem;
  margin-bottom: 1rem;
`;
