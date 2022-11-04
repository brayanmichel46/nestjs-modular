import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, FilterOrdersDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  findAll(params?: FilterOrdersDto) {
    if(params){
      const filters:FilterQuery<Order> = {};
      const {limit, offset} = params;        
      return this.orderModel.find().populate('customer').populate('products').skip(offset).limit(limit).exec();
    }
    return this.orderModel.find().populate('customer').populate('products').exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  ordersByCustomer(customerId: string) {
    return this.orderModel.find({customer:customerId}).populate('customer').populate('products').exec();
  }

  create(data: CreateOrderDto) {    
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, { $set: changes},{ new: true})
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string){
    const order = await this.orderModel.findById(id);
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(id: string, productIds: string[]){
    const order = await this.orderModel.findById(id);
    productIds.forEach((pid) => order.products.push(pid));
    return order.save();    
  }
}
