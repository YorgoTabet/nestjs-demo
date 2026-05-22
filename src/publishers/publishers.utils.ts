import { faker } from '@faker-js/faker';
import { Publisher } from './entities/publisher.entity';

const generatePublishers = (length: number) => {
  return Array.from({ length: length }, (_, index) => {
    return new Publisher(index + 1, faker.company.name());
  });
};

export { generatePublishers };
