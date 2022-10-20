import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './../entities/product.entity';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if(params){
      const filters:FilterQuery<Product> = {};
      const {limit, offset} = params;  
      const { minPrice, maxPrice } = params;
      if(minPrice && maxPrice ){
        filters.price = {$gte: minPrice, $lte: maxPrice};
      }
      return this.productModel.find(filters).populate('brand').skip(offset).limit(limit).exec();
    }
    return this.productModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto){
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  update(id:string, changes: UpdateProductDto){
    const product = this.productModel
    .findByIdAndUpdate(id,{$set: changes}, { new: true})
    .exec();
    
    if(!product){
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  remove(id: string){
    return this.productModel.findByIdAndDelete(id);
  }
  /*create(data: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, changes: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }*/
}
