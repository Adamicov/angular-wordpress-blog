import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Author } from '../../../domain/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorComponent {
  @Input() author: Author;
}
