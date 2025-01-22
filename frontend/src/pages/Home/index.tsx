import type { Customer } from '@/types';
import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { Empty, ListItem, Loading } from '@/components';
import { fetchCustomers } from '@/services/customerServices';
import i18n from 'i18next';

interface Props {
  onOpenForm: (customer?: Customer) => void;
}

const Home = ({ onOpenForm }: Props) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCustomers = async () => {
      setIsLoading(true);

      const items = await fetchCustomers();

      setCustomers(items);
      setIsLoading(false);
    };

    void getCustomers();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <S.Container>
      <S.NewButton onClick={() => onOpenForm()}>
        {i18n.t('home.newCustomer')}
      </S.NewButton>

      {customers.length ? (
        <S.Wrapper>
          {customers.map((customer, i) => (
            <ListItem
              key={i}
              name={customer.name}
              email={customer.email}
              cpf={customer.cpf}
              onClick={() => onOpenForm(customer)}
            />
          ))}
        </S.Wrapper>
      ) : (
        <Empty />
      )}
    </S.Container>
  );
};

export default Home;
