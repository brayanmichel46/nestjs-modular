import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { OrderService } from './services/orders.service';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersController } from './controllers/orders.controller';
import { User, UserSchema } from './entities/user.entity';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema
      }
    ])
  ],
  controllers: [CustomerController, UsersController, OrdersController, ProfileController],
  providers: [CustomersService, UsersService, OrderService],
  exports: [UsersService]
})
export class UsersModule {}
