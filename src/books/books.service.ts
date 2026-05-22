import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { generateBooks } from './books.utils';
import { AuthorsService } from 'src/authors/authors.service';
import { PublishersService } from 'src/publishers/publishers.service';
import { GenresService } from 'src/genres/genres.service';
import { BookWithAuthorDto } from './dto/book-with-author-response.dto';
import { BookResponse } from './dto/book-response.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly publishersService: PublishersService,
    private readonly genresService: GenresService,
  ) {}

  private books: Book[] = generateBooks(10, {
    authorCount: 3,
    publisherCount: 5,
    genreCount: 5,
  });

  create(createBookDto: CreateBookDto) {
    const book = new Book(
      createBookDto.id,
      createBookDto.title,
      createBookDto.authorId,
      createBookDto.publisherId,
      createBookDto.genreIds,
    );
    this.books.push(book);
    return new BookResponse(book.id, book.title);
  }

  findAll(includeAuthor?: boolean) {
    const books: (BookResponse | BookWithAuthorDto)[] = this.books.map(
      (book) => {
        if (includeAuthor) {
          const authorById = this.authorsService.findOne(book.authorId);
          return new BookWithAuthorDto(book.id, book.title, authorById);
        }
        return new BookResponse(book.id, book.title);
      },
    );

    return books;
  }

  findOne(id: number) {
    const book = this.findBookOrThrow(id);
    return new BookResponse(book.id, book.title);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    if (updateBookDto.authorId !== undefined) {
      this.authorsService.findOne(updateBookDto.authorId);
    }
    if (updateBookDto.publisherId !== undefined) {
      this.publishersService.findOne(updateBookDto.publisherId);
    }
    if (updateBookDto.genreIds !== undefined) {
      updateBookDto.genreIds.forEach((gid) => this.genresService.findOne(gid));
    }
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error(`Book with ID ${id} not found`);
    }
    this.books[bookIndex] = { ...this.books[bookIndex], ...updateBookDto };
    return new BookResponse(
      this.books[bookIndex].id,
      this.books[bookIndex].title,
    );
  }

  remove(id: number) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new Error(`Book with ID ${id} not found`);
    }
    const [removed] = this.books.splice(bookIndex, 1);
    return new BookResponse(removed.id, removed.title);
  }

  // Service-level composition demos (not exposed via the controller)
  getPublisherForBook(bookId: number) {
    const book = this.findBookOrThrow(bookId);
    if (book.publisherId === undefined) return undefined;
    return this.publishersService.findOne(book.publisherId);
  }

  getGenresForBook(bookId: number) {
    const book = this.findBookOrThrow(bookId);
    return book.genreIds.map((id) => this.genresService.findOne(id));
  }

  private findBookOrThrow(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new Error(`Book with ID ${id} not found`);
    }
    return book;
  }
}
