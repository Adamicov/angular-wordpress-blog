import { AuthorDto } from './author.dto';

export interface PostDto {
  readonly ID: string;
  readonly title: string;
  readonly date: Date;
  readonly adapt: string;
  readonly author: AuthorDto;
  readonly slug: string;
  readonly featured_image: string;
  readonly content: string;
  readonly excerpt: string;
}
