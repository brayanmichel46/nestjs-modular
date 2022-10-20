import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional, IsPositive, Min, IsArray, IsMongoId, IsDate } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'customer´s name'})
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}
//no actualizar products
export class UpdateOrderDto extends PartialType(
    OmitType(CreateOrderDto, ['products'])
) {}

export class FilterOrdersDto {
  @IsOptional()
  @IsPositive()
  limit: number;
  @IsOptional()
  @Min(0)
  offset: number;
}

export class AddProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
