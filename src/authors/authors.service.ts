import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './authors.types';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    new Author(1, 'Jane Austen'),
    new Author(2, 'Charles Dickens'),
    new Author(3, 'Mark Twain'),
  ];

  findAll() {
    return this.authors;
  }

  findOne(id: number) {
    const author = this.authors.find((author) => author.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  create(author: { name: string; email: string }) {
    const newAuthor = new Author(
      this.authors[this.authors.length - 1].id + 1,
      author.name,
    );
    this.authors.push(newAuthor);
    return newAuthor;
  }

  update(id: number, author: { name?: string; email?: string }) {
    const authorIndex = this.authors.findIndex((author) => author.id === id);

    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors[authorIndex] = {
      ...this.authors[authorIndex],
      ...author,
    };
    return this.authors[authorIndex];
  }

  delete(id: number) {
    const authorIndex = this.authors.findIndex((author) => author.id === id);
    if (authorIndex === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    this.authors.splice(authorIndex, 1);

    return authorIndex;
  }
}
