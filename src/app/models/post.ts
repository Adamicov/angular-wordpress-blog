import { Id } from './types';
import { Author } from './author';

export class Post {
  constructor(
    public id: Id,
    public title: string,
    public date: Date,
    public author: Author,
    public slug: string,
    public thumbnail: string,
    public content: string
  ) {}

  static adapt(item: any): Post {
    return new Post(
      item.ID,
      item.title,
      item.date,
      Author.adapt(item.author),
      item.slug,
      item.featured_image,
      item.content
    );
  }

  static adaptList(items: any[]): Post[] {
    return items.map(item => this.adapt(item));
  }
}
