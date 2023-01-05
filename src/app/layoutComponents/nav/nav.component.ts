import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'src/app/models/subscription/subscription';
import { AccountService } from 'src/app/services/account.service';
import { SubscriptionService } from 'src/app/services/subscription.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private accountService: AccountService, private subscriptionService: SubscriptionService) { }
  
  @Output()
  public subscriptions: Subscription[] = [];
  public isLogged: boolean = false;

  ngOnInit(): void {
    this.subscriptionService.GetSubscriptions().subscribe(data => {
      this.subscriptions = data
    });
    this.accountService.loginEmitter.subscribe((result) => {
      this.change();
    });
    this.accountService.GetActualUser().subscribe((result) => {
      this.isLogged = true;
    });
    this.subscriptionService.subscriptionEmiter.subscribe(result => this.change());
    this.accountService.loginEmitter.subscribe(result => {
      this.isLogged = result;
    })
  }
  change(): void {
    this.subscriptionService.GetSubscriptions().subscribe(data => {
      this.subscriptions = data;
    },err => {
      this.subscriptions = [];
    });
  }
  isListOfSubscriptions(): Boolean {
    return this.subscriptions.length != 0 && this.accountService.IsLogged();
  }
  isEmptyListOfSubscriptions(): Boolean {
    return this.subscriptions.length == 0 && this.accountService.IsLogged();
  }
  isNotLogged(): Boolean {
    return !this.accountService.IsLogged();
  }
}
