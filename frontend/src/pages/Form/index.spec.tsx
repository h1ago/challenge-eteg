import type { Customer } from '@/types';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from './index';
import { toast } from 'react-toastify';
import i18n from '@/translations';
import { createCustomer, updateCustomer } from '@/services/customerServices';

jest.mock('@/services/customerServices', () => ({
  createCustomer: jest.fn(),
  updateCustomer: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    update: jest.fn(),
    loading: jest.fn(),
  },
}));

describe('Form - Customer Creation', () => {
  it('should call createCustomer function and show success message', async () => {
    render(<Form onClose={jest.fn()} />);

    const nameInput = screen.getByTestId('name');
    const cpfInput = screen.getByTestId('cpf');
    const emailInput = screen.getByTestId('email');
    const favoriteColorSelect = screen.getByTestId('favoriteColor');
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(cpfInput, { target: { value: '123.456.789-00' } });
    fireEvent.change(emailInput, { target: { value: 'joao@exemplo.com' } });
    fireEvent.change(favoriteColorSelect, { target: { value: 'blue' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createCustomer).toHaveBeenCalledWith({
        name: 'João Silva',
        cpf: '12345678900',
        email: 'joao@exemplo.com',
        favoriteColor: 'blue',
        notes: '',
      });
      expect(toast.update).toHaveBeenCalled();
    });
  });
});

describe('Form - Customer Editing', () => {
  const mockRecord: Customer = {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao@exemplo.com',
    favoriteColor: 'blue',
    notes: '',
  };

  it('should call updateCustomer function and show success message', async () => {
    render(<Form onClose={jest.fn()} record={mockRecord} />);

    const nameInput = screen.getByTestId('name');
    const cpfInput = screen.getByTestId('cpf');
    const emailInput = screen.getByTestId('email');
    const favoriteColorSelect = screen.getByTestId('favoriteColor');
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(nameInput, { target: { value: 'João Silva Editado' } });
    fireEvent.change(cpfInput, { target: { value: '987.654.321-00' } });
    fireEvent.change(emailInput, {
      target: { value: 'joao.editado@exemplo.com' },
    });
    fireEvent.change(favoriteColorSelect, { target: { value: 'red' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(updateCustomer).toHaveBeenCalledWith({
        id: 1,
        name: 'João Silva Editado',
        cpf: '98765432100',
        email: 'joao.editado@exemplo.com',
        favoriteColor: 'red',
        notes: '',
      });
      expect(toast.update).toHaveBeenCalled();
    });
  });
});

describe('Form - Required Field Validation', () => {
  it('should show error messages if required fields are not filled out', async () => {
    render(<Form onClose={jest.fn()} />);

    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorNameMessage = screen.getByText(
        i18n.t('form.validation.fullnameRequired'),
      );
      const errorSocialNumberMessage = screen.getByText(
        i18n.t('form.validation.socialNumberRequired'),
      );
      const errorEmailMessage = screen.getByText(
        i18n.t('form.validation.emailRequired'),
      );

      expect(errorNameMessage).toBeInTheDocument();
      expect(errorSocialNumberMessage).toBeInTheDocument();
      expect(errorEmailMessage).toBeInTheDocument();
    });
  });
});
