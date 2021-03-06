import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '@models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Output() postClicked = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }

}
