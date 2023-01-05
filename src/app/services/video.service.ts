import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/Video/video';
import { FullVideo } from '../models/Video/fullVideo';


@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public readonly path: string = "https://localhost:7096/api/Video/";
  constructor(private http: HttpClient, private account: AccountService) { }

  public GetVideo(videoId: number): Observable<FullVideo> {
    return this.http.get<FullVideo>(this.path + videoId.toString());
  }

  public GetAllUserVideo(userName: string): Observable<FullVideo[]> {
    return this.http.get<FullVideo[]>(this.path + "GetAllUserVideo/" + userName);
  }

  public AddVideo(video: Video): Observable<number> {
    const headers = this.account.GetHeader();
    return this.http.post<number>(this.path, video, { headers });
  }

  public DeleteVideo(videoId: number): Observable<any> {
    const headers = this.account.GetHeader();
    return this.http.delete<any>(this.path + videoId.toString(), { headers });
  }

  public LoadVideo(videoId: number, formData: FormData): Observable<Video> {
    const headers = this.account.GetHeader();
    return this.http.post<Video>(this.path + "LoadVideo/" + videoId.toString(), formData, { headers });
  }

  public LoadThumbnail(videoId: number, formData: FormData): Observable<Video> {
    const headers = this.account.GetHeader();
    return this.http.post<Video>(this.path + "LoadThumbnail/" + videoId.toString(), formData, { headers });
  }
}