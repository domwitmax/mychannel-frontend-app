import { Component, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  public search: string = "";
  @Output() menuButton = new EventEmitter<void>();
  constructor(private accountService: AccountService, private router: Router) { }
  isLogged(): Boolean {
    return this.accountService.IsLogged();
  }
  logout() {
    if (!this.accountService.IsLogged())
      return;
    this.router.navigate(["/login"]);
    this.accountService.LogoutNow();
  }
  find() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(["/search", this.search]);
  }
}
