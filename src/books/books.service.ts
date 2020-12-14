import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/books.schema';

@Injectable()
export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

    isValidObjectId(id: string): void {
        if(!Types.ObjectId.isValid(id)) throw new BadRequestException(`${id} is not right objectId format.`) 
    }

    // POST -> 책 생성
    async createBook(createBookDto: CreateBookDto): Promise<BookDocument> {
        const book: BookDocument | null = await this.bookModel.findOne({ title: createBookDto.title })
        if (book) throw new ConflictException(`${createBookDto.title} is already created book. Create another book.`)
        
        const createdBook = new this.bookModel(createBookDto);
        return createdBook.save();
    }
    
    // GET -> 모든 책 목록 조회
    async findAll(): Promise<BookDocument[]> {
        return await this.bookModel.find();
    }
    
    // GET -> ID로 특정 책 조회
    async findBookById(bookId: string): Promise<BookDocument> {
        this.isValidObjectId(bookId);
        
        const book: BookDocument | null = await this.bookModel.findById(bookId);
        if(!book) throw new NotFoundException(`there is no book with ID ${bookId}`)
        
        return book;
    }
    
    // GET -> 검색 조회
    async searchBooksByKeyword(keyword: string): Promise<BookDocument[]> {
        if (!keyword) throw new BadRequestException('there is no searching keyword')
        
        return await this.bookModel.find({
            $or: [{
                title: new RegExp(keyword, 'i')
            }, {
                tags: new RegExp(keyword, 'i')
            }]
        })
    }
    
    // DELETE -> ID로 특정 책 삭제
    async deleteBookById(bookId: string): Promise<void> {
        this.findBookById(bookId);
        await this.bookModel.findByIdAndDelete(bookId);
        return;
    }
    
    // PATCH -> ID로 특정 책 수정
    async updateBookById(bookId: string, updateBookDto: UpdateBookDto): Promise<void> {
        this.findBookById(bookId);
        await this.bookModel.findByIdAndUpdate(bookId, updateBookDto);
        return;
    }
}
