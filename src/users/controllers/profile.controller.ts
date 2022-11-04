import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
    Req
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; 
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.model';
import { OrderService } from '../services/orders.service';
import { Request } from 'express';
import { PayloadToken } from 'src/auth/models/token.model';

@UseGuards(JwtAuthGuard,RolesGuard)
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
    constructor(private ordersService: OrderService) {}
    @Roles(Role.CUSTOMER)
    @Get('my-orders')
    getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    console.log("ordes",user.sub)
    return this.ordersService.ordersByCustomer(user.sub);
  }
}
