import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { CommentService } from './services/comment.service';
import { RankingService } from './services/ranking.service';
import { SubscriptionService } from './services/subscription.service';
import { VideoService } from './services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService, CommentService, RankingService, SubscriptionService, VideoService]
})
export class AppComponent {
  search: string = '';
  hidden: boolean = true;
  navClass: string = "contentWithNav";
  hiddenSubscriptions() : void {
    this.hidden = !this.hidden;
    if(this.navClass == "contentWithNav")
      this.navClass = "contentWithoutNav";
    else
      this.navClass = "contentWithNav";
  }
}
