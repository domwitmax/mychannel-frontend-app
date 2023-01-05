import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullVideo } from 'src/app/models/Video/fullVideo';
import { Video } from 'src/app/models/Video/video';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {

  constructor(private videoService: VideoService, private router: Router) { }
  public title: string = "";
  public videoFile: File | null = null;
  public thumbnailFile: File | null = null;

  ngOnInit(): void {
  }
  videoEvent(event: any){
    this.videoFile = event.target.files[0] as File;
  }
  thumbnailEvent(event: any){
    this.thumbnailFile = event.target.files[0] as File;
  }
  sendVideo() {
    if(this.videoFile == null)
      return;
    if(this.thumbnailFile == null)
      return;
    var video: Video = {
      title: this.title,
      videoId: 0,
      authorId: 0
    };
    this.videoService.AddVideo(video).subscribe(result => {
      const formData = new FormData();
      formData.append("file", this.thumbnailFile as Blob, this.thumbnailFile?.name);
      this.videoService.LoadThumbnail(result, formData).subscribe(r => {
        console.log(r);
        const formDataVideo = new FormData();
        formDataVideo.append("file", this.videoFile as Blob, this.videoFile?.name);
        console.log(formData);
        this.videoService.LoadVideo(result, formDataVideo).subscribe(res => {
          console.log(res);
          this.router.navigate(['video/', result]);
        });
      });
    });
  }

}
