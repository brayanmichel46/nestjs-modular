import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from './customer.entity';
import { User } from './user.entity';

@Schema()
export class Order {
  @Prop({ type: Date})
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true})
  customer: Customer | Types.ObjectId;

  @Prop({ type: [{type: Types.ObjectId, ref: Product.name, require: true}]})
  products: Types.Array<Product>
}

export const OrderSchema = SchemaFactory.createForClass(Order);
