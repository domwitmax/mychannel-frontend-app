import { EventEmitter, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FullVideo } from '../models/Video/fullVideo';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  public readonly path: string = "https://localhost:7096/api/Ranking/";
  constructor(private http: HttpClient, private account: AccountService) {}

  public GetViewCount(videoId: number): Observable<number> {
    return this.http.get<number>(this.path + "View/" + videoId.toString());
  }

  public GetLikeCount(videoId: number): Observable<number> {
    return this.http.get<number>(this.path + "Like/" + videoId.toString());
  }

  public LikeVideo(videoId: number): Observable<any> {
    const headers = this.account.GetHeader();
    return this.http.post<any>(this.path + "Like/" + videoId.toString(), null, { headers });
  }

  public GetDislikeCount(videoId: number): Observable<number> {
    return this.http.get<number>(this.path + "Dislike/" + videoId.toString());
  }

  public DislikeVideo(videoId: number): Observable<any> {
    const headers = this.account.GetHeader();
    return this.http.post<any>(this.path + "Dislike/" + videoId.toString(), null, { headers });
  }

  public GetProposingVideos(): Observable<FullVideo[]> {
    return this.http.get<FullVideo[]>(this.path + "GetProposingVideos");
  }

  public SearchVideos(search: string): Observable<FullVideo[]> {
    return this.http.get<FullVideo[]>(this.path + "Search/" + search);
  }

  public IsLiked(videoId: number): Observable<number> {
    const headers = this.account.GetHeader();
    return this.http.get<number>(this.path + "IsLiked/" + videoId.toString(), { headers });
  }

  public ViewVideo(videoId: number): Observable<any> {
    const headers = this.account.GetHeader();
    return this.http.post<any>(this.path + "AddView/" + videoId.toString(), null, { headers });
  }
}