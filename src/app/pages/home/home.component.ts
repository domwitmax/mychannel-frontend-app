import { Component, OnInit } from '@angular/core';
import { FullVideo } from 'src/app/models/Video/fullVideo';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private rankingService: RankingService) {
  }
  videos: FullVideo[] = [];
  ngOnInit(): void {
    this.rankingService.GetProposingVideos().subscribe((result) => {
      this.videos = result;
    });
  }

}
