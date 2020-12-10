import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI, { useFindAndModify: false }), BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
