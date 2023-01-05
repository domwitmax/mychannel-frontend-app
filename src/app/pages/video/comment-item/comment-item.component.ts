import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment/comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  constructor() { }
  @Input()
  public data: Comment | null = null;
  ngOnInit(): void {
  }

}
