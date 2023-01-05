import { EventEmitter, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../models/subscription/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  public readonly path: string = "https://localhost:7096/api/Subscription/";
  public subscriptionEmiter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient, private account: AccountService) { }

  public GetSubscriptions(): Observable<Subscription[]> {
    const headers = this.account.GetHeader();
    return this.http.get<Subscription[]>(this.path, { headers });
  }

  public GetSubscriptionCount(subscriptionUserName: string): Observable<number> {
    return this.http.get<number>(this.path + "Count/" + subscriptionUserName);
  }

  public AddSubscription(subscription: Subscription): Observable<Subscription> {
    const headers = this.account.GetHeader();
    return this.http.post<Subscription>(this.path + "AddSubscription", subscription, { headers });
  }

  public RemoveSubscription(subscription: Subscription): Observable<Subscription> {
    const headers = this.account.GetHeader();
    return this.http.post<Subscription>(this.path + "RemoveSubscription", subscription, { headers });
  }
}