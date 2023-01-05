import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullVideo } from 'src/app/models/Video/fullVideo';
import { AccountService } from 'src/app/services/account.service';
import { CommentService } from 'src/app/services/comment.service';
import { RankingService } from 'src/app/services/ranking.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { VideoService } from 'src/app/services/video.service';
import { Comment } from 'src/app/models/comment/comment';
import { Observable, timeout } from 'rxjs';
import { Subscription } from 'src/app/models/subscription/subscription';
import { GetUser } from 'src/app/models/account/getUser';
import { CreatedComments } from 'src/app/models/comment/createdComment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  public videoId: number;
  public video: FullVideo | null = null;
  public source: string = "";
  public like: number = 0;
  public dislike: number = 0;
  public isLiked: boolean = false;
  public isDisLiked: boolean = false;
  public isAuthor: boolean = false;
  public commentText: string = "";
  public views: number = 0;
  public subscriptionCount: number = 0;
  public comments: Comment[] = [];
  public subscribeStrBtn: string = "Subskrybuj";
  public isSubscribe: boolean = false;
  public isLogged: boolean = false;
  public currentTime: number = 0;
  constructor(private accountService: AccountService, private activeRoute: ActivatedRoute, private router: Router, private rankingService: RankingService, private commentService: CommentService, private subscriptionService: SubscriptionService, private videoService: VideoService) {
    this.videoId = parseInt(this.activeRoute.snapshot.paramMap.get('videoId') as string);
    videoService.GetVideo(this.videoId).subscribe(result => {
      this.video = result;
      if (this.video.videoPath != null)
        this.source = accountService.serverPath + this.video.videoPath.toString();
      this.likesUpdate();
      accountService.GetActualUser().subscribe(result => {
        this.isAuthor = result.userName == this.video?.authorName;
        this.isLogged = true;
      });
      this.subscribeUpdate();
      this.commentUpdate();
      rankingService.IsLiked(this.videoId).subscribe(result => {
        if (result == 1)
          this.isLiked = true;
        else if (result == -1)
          this.isDisLiked = true;
      });
      rankingService.ViewVideo(this.videoId).subscribe(result => {
        this.viewUpdate();
      });
    }, err => {
      this.router.navigate(["notFoundVideo"]);
    });
    this.accountService.loginEmitter.subscribe(result => {
      this.isLogged = !this.isLogged;
    });
  }
  ngOnInit(): void {
  }
  likesUpdate() {
    this.rankingService.GetLikeCount(this.videoId).subscribe(result => {
      this.like = result;
    });
    this.rankingService.GetDislikeCount(this.videoId).subscribe(result => {
      this.dislike = result;
    });
  }
  subscribeUpdate() {
    const authorName: string | undefined = this.video?.authorName;
    this.subscriptionService.GetSubscriptionCount(authorName ? authorName : "").subscribe(result => {
      this.subscriptionCount = result;
    });
    this.subscriptionService.GetSubscriptions().subscribe(result => {
      result.forEach(sub => {
        if (sub.subscriptionUserName == this.video?.authorName) {
          this.isSubscribe = true;
        }
      });
    });
  }
  viewUpdate() {
    this.rankingService.GetViewCount(this.videoId).subscribe(result => {
      this.views = result;
    });
  }
  commentUpdate() {
    this.commentService.GetComment(this.videoId).subscribe(result => {
      this.comments = result;
    });
  }
  liked() {
    this.rankingService.LikeVideo(this.videoId).subscribe(result => {
      this.isLiked = true;
      this.isDisLiked = false;
      this.likesUpdate();
    });
  }
  disliked() {
    this.rankingService.DislikeVideo(this.videoId).subscribe(result => {
      this.isLiked = false;
      this.isDisLiked = true;
      this.likesUpdate();
    });
  }
  async subscribe() {
    const authorName: string | undefined = this.video?.authorName;
    if (authorName == undefined)
      return;
    const getUser: GetUser | undefined = await this.accountService.GetActualUser().toPromise();
    var subscribe: Subscription = {
      subscriptionUserName: authorName,
      userName: getUser?.userName ? getUser.userName : ""
    };
    var sub: Observable<any>;
    if (this.isSubscribe) {
      sub = this.subscriptionService.RemoveSubscription(subscribe);
    }
    else {
      sub = this.subscriptionService.AddSubscription(subscribe);
    }
    sub.subscribe(result => {
      this.isSubscribe = !this.isSubscribe;
      this.subscribeUpdate();
      this.subscriptionService.subscriptionEmiter.emit();
    });
  }
  deleteVideo() {
    this.videoService.DeleteVideo(this.videoId).subscribe(result => {
      const authorName: string | undefined = this.video?.authorName;
      if (authorName == undefined)
        this.router.navigate([]);
      else
        this.router.navigate(['/channel', this.video?.authorName]);
    });
  }
  sendComment() {
    const comment: CreatedComments = {
      userId: 0,
      content: this.commentText
    };
    this.commentService.AddComment(this.videoId, comment).subscribe(result => {
      this.commentUpdate();
      this.commentText = "";
    });
  }
  login() {
    this.router.navigate(["/login"]);
  }
}