import { faker } from '@faker-js/faker';
import { Genre } from './entities/genre.entity';

const generateGenres = (length: number) => {
  return Array.from({ length: length }, (_, index) => {
    return new Genre(index + 1, faker.book.genre());
  });
};

export { generateGenres };
