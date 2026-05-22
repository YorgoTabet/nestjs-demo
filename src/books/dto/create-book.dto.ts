import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateBookDto {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsInt()
  authorId: number;

  @IsInt()
  publisherId: number;

  @IsArray()
  @IsInt({ each: true })
  genreIds: number[];

  constructor(
    id: number,
    title: string,
    authorId: number,
    publisherId: number,
    genreIds: number[],
  ) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
    this.publisherId = publisherId;
    this.genreIds = genreIds;
  }
}
