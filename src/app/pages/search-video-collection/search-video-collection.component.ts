import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FullVideo } from 'src/app/models/Video/fullVideo';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-search-video-collection',
  templateUrl: './search-video-collection.component.html',
  styleUrls: ['./search-video-collection.component.css']
})
export class SearchVideoCollectionComponent implements OnInit {

  constructor(private rankingService: RankingService, private activeRoute: ActivatedRoute) {
    this.query = this.activeRoute.snapshot.paramMap.get('query');
  }
  query: string | null;

  videos: FullVideo[] = [];

  ngOnInit(): void {
    if (this.query == null) {
      this.videos = [];
      return;
    }
    this.rankingService.SearchVideos(this.query).subscribe((result) => {
      this.videos = result;
    });
  }
}
