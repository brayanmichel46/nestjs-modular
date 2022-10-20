import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private productModel: Model<Customer>,
  ) {}

  findAll() {
    //return this.customers;
  }

  findOne(id: number) {
    /*const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;*/
  }

  create(data: CreateCustomerDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  update(id: number, changes: UpdateCustomerDto) {
    /*const customer = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = {
      ...customer,
      ...changes,
    };
    return this.customers[index];*/
  }

  remove(id: number) {
    /*const index = this.customers.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;*/
  }
}
