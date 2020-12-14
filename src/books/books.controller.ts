import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDocument } from './schemas/books.schema';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService){}

    @Post()
    createBook(@Body() createBookDto: CreateBookDto): Promise<BookDocument> {
        return this.booksService.createBook(createBookDto);    
    }
    
    @Get()
    findAll(): Promise<BookDocument[]> {
        return this.booksService.findAll();    
    }
    
    @Get('/search')
    searchBooksByKeyword(@Query('keyword') keyword: string): Promise<BookDocument[]> {
        return this.booksService.searchBooksByKeyword(keyword);    
    }
    
    @Get('/:bookId')
    findOneById(@Param('bookId') bookId: string): Promise<BookDocument> {
        return this.booksService.findBookById(bookId);    
    }
    
    @Patch('/:bookId')
    updateOneById(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto): Promise<void> {
        return this.booksService.updateBookById(bookId, updateBookDto);    
    }
    
    @Delete('/:bookId')
    deleteOneById(@Param('bookId') bookId: string): void {
        this.booksService.deleteBookById(bookId);    
        return;
    }
}
