import { IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
