import { Id } from './types';
import { Author } from './author';

export class Comment {
  constructor(
    public id: Id,
    public author: Author,
    public content: string,
    public likeCount: number,
    public date: Date
  ) {}

  static adapt(item: any): Comment {
    return new Comment(
      item.ID,
      Author.adapt(item.author),
      item.content,
      item.like_count,
      item.date
    );
  }

  static adaptList(items: any[]): Comment[] {
    return items.map(item => this.adapt(item));
  }
}
