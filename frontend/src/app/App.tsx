import type { Customer } from '@/types';
import React, { useState } from 'react';
import * as S from './styles';
import { Header } from '@/components';
import Home from '@/pages/Home';
import Form from '@/pages/Form';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState<Customer | undefined>(
    undefined,
  );

  const handleOpenForm = (customer?: Customer) => {
    setCustomerToEdit(customer);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setCustomerToEdit(undefined);
  };

  return (
    <>
      <S.GlobalStyle />
      <S.Container>
        <Header />
        <S.Box>
          {isFormOpen ? (
            <Form record={customerToEdit} onClose={handleCloseForm} />
          ) : (
            <Home onOpenForm={handleOpenForm} />
          )}
        </S.Box>
        <ToastContainer />
      </S.Container>
    </>
  );
};

export default App;
