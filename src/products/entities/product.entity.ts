import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Brand } from "./brand.entity";

@Schema()
export class Product extends Document {
  @Prop({ required: true})
  name: string;
  @Prop()
  description: string;
  @Prop({ type: Number, index: true })
  price: number;
  @Prop({ type: Number })
  stock: number;
  @Prop()
  image: string;
  //relacion 1 a 1 documento dentro de otro docuemnto sin relacionamiento por id ver en el Dto
  @Prop( raw({
    name: { type:String },
    image: { type: String},
  }))
  //relacion 1 a 1 con relacionamiento con id ver en el Dto
  category: Record<string,any>;
  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ price: 1, stock: -1})
