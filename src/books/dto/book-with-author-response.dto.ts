import { Author } from 'src/authors/authors.types';
import { BookResponse } from './book-response.dto';

export class BookWithAuthorDto extends BookResponse {
  author: Author;

  constructor(id: number, title: string, author: Author) {
    super(id, title);
    this.author = author;
  }
}
