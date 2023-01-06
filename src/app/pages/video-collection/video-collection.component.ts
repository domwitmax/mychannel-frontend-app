import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FullVideo } from 'src/app/models/Video/fullVideo';

@Component({
  selector: 'app-video-collection',
  templateUrl: './video-collection.component.html',
  styleUrls: ['./video-collection.component.css']
})
export class VideoCollectionComponent implements OnInit {

  constructor(private videoService: VideoService,private router: Router, private activeRoute: ActivatedRoute) {
    this.subscriptionUserName = this.activeRoute.snapshot.paramMap.get('subscriptionUserName');
  }
  subscriptionUserName: string | null;

  videos: FullVideo[] = [];

  ngOnInit(): void {
    if (this.subscriptionUserName == null) {
      this.videos = [];
      return;
    }
    this.videoService.GetAllUserVideo(this.subscriptionUserName).subscribe((result) => {
      this.videos = result;
    }, err => {
      this.router.navigate([""]);
    });
  }

}
