import { identifierName } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullVideo } from 'src/app/models/Video/fullVideo';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router) {}
  @Input()
  data: FullVideo | null = null;
  source: string = "";

  ngOnInit(): void {
    if(this.data != null)
      this.source = this.accountService.serverPath + this.data.thumbnailPath;
  }
  goToVideo(){
    this.router.navigate(["/video",this.data?.videoId.toString()]);
  }

}
