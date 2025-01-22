import { Customer } from '@/types';
import api from './api';

export enum Urls {
  CUSTOMER_URL = '/customer',
}

export const fetchCustomers = async (): Promise<Customer[]> => {
  return api.get<Customer[]>(Urls.CUSTOMER_URL).then(({ data }) => data);
};

export const createCustomer = async (customer: Customer) =>
  api
    .post<Customer>(Urls.CUSTOMER_URL, {
      ...customer,
    })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.response.data.message);
    });

export const updateCustomer = async (customer: Customer) =>
  api
    .put<Customer>(`${Urls.CUSTOMER_URL}/${customer.id}`, {
      ...customer,
    })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.response.data.message);
    });

export const deleteCustomer = async (id: number) =>
  api.delete<Customer>(`${Urls.CUSTOMER_URL}/${id}`).catch((error) => {
    throw new Error(error.response.data.message);
  });
