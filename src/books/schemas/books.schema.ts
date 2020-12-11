import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: String, required: true })
    author: string;

    @Prop({ type: Number, required: true })
    page_num: number;
    
    @Prop({ type: [String], required: true })
    tags: string[];
    
    @Prop({ type: Date })
    readonly createdAt: Date;
    
    @Prop({ type: Date })
    readonly updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);