import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerEntity } from '../entities/customer.entity';

export const customerMockData = {
  createCustomerDto: {
    name: 'John Doe',
    cpf: '12345678900',
    email: 'john@gmail.com',
    favoriteColor: 'blue',
    notes: 'Customer notes here',
  } as CreateCustomerDto,

  updateCustomerDto: {
    cpf: '12345678901',
    email: 'updated@gmail.com',
  } as UpdateCustomerDto,

  existingCustomer: {
    id: 1,
    name: 'John Doe',
    cpf: '12345678900',
    email: 'john@gmail.com',
    favoriteColor: 'blue',
    notes: 'Test notes',
  } as CustomerEntity,

  allCustomers: [
    {
      id: 1,
      name: 'John Doe',
      cpf: '12345678900',
      email: 'john@gmail.com',
      favoriteColor: 'blue',
      notes: 'Test notes',
    },
    {
      id: 2,
      name: 'Jane Doe',
      cpf: '98765432100',
      email: 'jane@gmail.com',
      favoriteColor: 'red',
      notes: 'Test notes',
    },
  ] as CustomerEntity[],
};
