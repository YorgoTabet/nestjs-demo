import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';
import { generatePublishers } from './publishers.utils';

@Injectable()
export class PublishersService {
  private publishers: Publisher[] = generatePublishers(5);

  create(createPublisherDto: CreatePublisherDto) {
    const nextId = this.publishers[this.publishers.length - 1].id + 1;
    const publisher = new Publisher(nextId, createPublisherDto.name);
    this.publishers.push(publisher);
    return publisher;
  }

  findAll() {
    return this.publishers;
  }

  findOne(id: number) {
    const publisher = this.publishers.find((p) => p.id === id);
    if (!publisher) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return publisher;
  }

  update(id: number, updatePublisherDto: UpdatePublisherDto) {
    const index = this.publishers.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    this.publishers[index] = {
      ...this.publishers[index],
      ...updatePublisherDto,
    };
    return this.publishers[index];
  }

  remove(id: number) {
    const index = this.publishers.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Publisher with ID ${id} not found`);
    }
    return this.publishers.splice(index, 1)[0];
  }
}
