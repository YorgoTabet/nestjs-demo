import { faker } from '@faker-js/faker';
import { Book } from './entities/book.entity';

const generateBooks = (
  length: number,
  options: { authorCount: number; publisherCount: number; genreCount: number },
) => {
  const genreIdPool = Array.from(
    { length: options.genreCount },
    (_, i) => i + 1,
  );

  return Array.from({ length: length }, (_, index) => {
    const genreIds = faker.helpers.arrayElements(genreIdPool, {
      min: 1,
      max: 3,
    });
    return new Book(
      index + 1,
      faker.lorem.sentence(3),
      faker.number.int({ min: 1, max: options.authorCount }),
      faker.number.int({ min: 1, max: options.publisherCount }),
      genreIds,
    );
  });
};

export { generateBooks };
