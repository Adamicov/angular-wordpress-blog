export class Author {

  constructor(
    public name: string,
    public avatarUrl: string
  ) {}

  static adapt(item: any): Author {
    return new Author(
      item.name,
      item.avatar_URL
    );
  }
}
