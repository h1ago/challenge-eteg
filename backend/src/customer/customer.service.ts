import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async findAll(): Promise<CustomerEntity[]> {
    return await this.customerRepository.find();
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const { cpf, email } = createCustomerDto;

    const existingCustomerByCpf = await this.customerRepository.findOneBy({
      cpf,
    });
    if (existingCustomerByCpf) {
      throw new ConflictException('cpf_already_exists');
    }

    const existingCustomerByEmail = await this.customerRepository.findOneBy({
      email,
    });
    if (existingCustomerByEmail) {
      throw new ConflictException('email_already_exists');
    }

    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found.`);
    }

    const { cpf, email } = updateCustomerDto;

    const existingCustomerByCpf = await this.customerRepository.findOneBy({
      cpf,
    });

    if (existingCustomerByCpf && existingCustomerByCpf.id != id) {
      throw new ConflictException('cpf_already_exists');
    }

    const existingCustomerByEmail = await this.customerRepository.findOneBy({
      email,
    });
    if (existingCustomerByEmail && existingCustomerByEmail.id != id) {
      throw new ConflictException('email_already_exists');
    }

    return await this.customerRepository.save({
      ...customer,
      ...updateCustomerDto,
    });
  }

  async delete(id: number): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found.`);
    }

    await this.customerRepository.remove(customer);
  }
}
