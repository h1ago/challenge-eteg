import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from '../customer.service';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { customerMockData } from '../__mocks__/customer.mock';

describe('CustomerService', () => {
  let service: CustomerService;
  let customerRepository: Repository<CustomerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<Repository<CustomerEntity>>(
      getRepositoryToken(CustomerEntity),
    );
  });

  describe('findAll', () => {
    it('should be defined', async () => {
      expect(service).toBeDefined();
      expect(customerRepository).toBeDefined();
    });

    it('should return an array of customers', async () => {
      jest
        .spyOn(customerRepository, 'find')
        .mockResolvedValue(customerMockData.allCustomers as CustomerEntity[]);

      const result = await service.findAll();
      expect(result).toEqual(customerMockData.allCustomers);
    });
  });

  describe('create', () => {
    it('should create a customer if cpf and email are unique', async () => {
      const createCustomerDto: CreateCustomerDto =
        customerMockData.createCustomerDto;
      jest.spyOn(customerRepository, 'findOneBy').mockResolvedValue(null);

      const customer = { ...createCustomerDto, id: 1 };
      jest.spyOn(customerRepository, 'create').mockReturnValue(customer as any);
      jest.spyOn(customerRepository, 'save').mockResolvedValue(customer as any);

      const result = await service.create(createCustomerDto);
      expect(result).toEqual(customer);
    });

    it('should throw ConflictException if cpf already exists', async () => {
      const createCustomerDto: CreateCustomerDto =
        customerMockData.createCustomerDto;
      jest
        .spyOn(customerRepository, 'findOneBy')
        .mockResolvedValueOnce({ cpf: '12345678900' } as any);

      await expect(service.create(createCustomerDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if email already exists', async () => {
      const createCustomerDto: CreateCustomerDto =
        customerMockData.createCustomerDto;
      jest
        .spyOn(customerRepository, 'findOneBy')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ email: 'test@example.com' } as any);

      await expect(service.create(createCustomerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('update', () => {
    it('should update a customer if cpf and email are unique', async () => {
      const updateCustomerDto: UpdateCustomerDto =
        customerMockData.updateCustomerDto;
      const existingCustomer = customerMockData.existingCustomer;
      jest
        .spyOn(customerRepository, 'findOneBy')
        .mockResolvedValue(existingCustomer as any);
      jest.spyOn(customerRepository, 'save').mockResolvedValue({
        ...existingCustomer,
        ...updateCustomerDto,
      } as any);

      const result = await service.update(1, updateCustomerDto);
      expect(result).toEqual({ ...existingCustomer, ...updateCustomerDto });
    });

    it('should throw NotFoundException if customer not found', async () => {
      const updateCustomerDto: UpdateCustomerDto =
        customerMockData.updateCustomerDto;
      jest.spyOn(customerRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.update(1, updateCustomerDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException if cpf already exists', async () => {
      const updateCustomerDto: UpdateCustomerDto =
        customerMockData.updateCustomerDto;
      const existingCustomer = customerMockData.existingCustomer;
      jest
        .spyOn(customerRepository, 'findOneBy')
        .mockResolvedValueOnce(existingCustomer as any);
      jest
        .spyOn(customerRepository, 'findOneBy')
        .mockResolvedValueOnce({ cpf: '12345678901' } as any);

      await expect(service.update(1, updateCustomerDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if email already exists', async () => {
      const updateCustomerDto: UpdateCustomerDto =
        customerMockData.updateCustomerDto;
      const existingCustomer = customerMockData.existingCustomer;
      jest
        .spyOn(customerRepository, 'findOneBy')
        .mockResolvedValueOnce(existingCustomer as any);
      jest
        .spyOn(customerRepository, 'findOneBy')
        .mockResolvedValueOnce({ email: 'updated@example.com' } as any);

      await expect(service.update(1, updateCustomerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a customer', async () => {
      const customer = customerMockData.existingCustomer;
      jest
        .spyOn(customerRepository, 'findOneBy')
        .mockResolvedValue(customer as any);
      jest.spyOn(customerRepository, 'remove').mockResolvedValue(undefined);

      await expect(service.delete(1)).resolves.not.toThrow();
    });

    it('should throw NotFoundException if customer not found', async () => {
      jest.spyOn(customerRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
