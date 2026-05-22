export class Book {
  id: number;
  title: string;
  authorId: number;
  publisherId?: number;
  genreIds: number[];

  constructor(
    id: number,
    title: string,
    authorId: number,
    publisherId?: number,
    genreIds: number[] = [],
  ) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
    this.publisherId = publisherId;
    this.genreIds = genreIds;
  }
}
