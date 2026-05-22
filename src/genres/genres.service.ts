import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { generateGenres } from './genres.utils';

@Injectable()
export class GenresService {
  private genres: Genre[] = generateGenres(5);

  create(createGenreDto: CreateGenreDto) {
    const nextId = this.genres[this.genres.length - 1].id + 1;
    const genre = new Genre(nextId, createGenreDto.name);
    this.genres.push(genre);
    return genre;
  }

  findAll() {
    return this.genres;
  }

  findOne(id: number) {
    const genre = this.genres.find((g) => g.id === id);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    const index = this.genres.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    this.genres[index] = { ...this.genres[index], ...updateGenreDto };
    return this.genres[index];
  }

  remove(id: number) {
    const index = this.genres.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return this.genres.splice(index, 1)[0];
  }
}
