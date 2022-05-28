import { AuthorDto } from '../dto/author.dto';

export class Author {
  constructor(readonly name: string, readonly avatarUrl: string) {}

  // TODO: uncouple from domain
  static adapt(item: AuthorDto): Author {
    return new Author(item.name, item.avatar_URL);
  }
}
