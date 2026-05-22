import { IsString } from 'class-validator';

export class CreatePublisherDto {
  @IsString()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
