import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatedComments } from '../models/comment/createdComment';
import { Comment } from '../models/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public readonly path: string = "https://localhost:7096/api/Comment/";
  constructor(private http: HttpClient, private account: AccountService) { }
  public GetComment(videoId: number): Observable<Comment[]>{
    const headers = this.account.GetHeader();
    return this.http.get<Comment[]>(this.path + videoId, { headers });
  }
  public AddComment(videoId: number, comment: CreatedComments): Observable<any>{
    const headers = this.account.GetHeader();
    return this.http.post<any>(this.path + videoId, comment, { headers });
  }
}
