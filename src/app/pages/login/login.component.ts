import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/account/login';
import { Register } from 'src/app/models/account/register';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private accountService: AccountService, private router: Router) { }
  public email: string = '';
  public password: string = '';
  public showRegistration: boolean = false;
  public userName: string = '';
  public async onLoginSubmit() {
    var data: Login = {
      UserName: this.userName,
      Password: this.password
    };
    this.accountService.Login(data).catch((reason) => {
      this.Fail()
    }).then((result) => {
      if (result)
        this.Success();
      else
        this.Fail();
    });
  }
  public toggleRegistration(): void {
    this.showRegistration = !this.showRegistration;
  }
  public onRegistrationSubmit() {
    var data: Register = {
      UserName: this.userName,
      Email: this.email,
      Password: this.password
    };
    this.accountService.Register(data).catch((reason) => {
      this.Fail()
    }).then((result) => {
      if (result)
        this.Success();
      else
        this.Fail();
    });
  }
  public Success() {
    this.accountService.LoginNow();
    this.router.navigate([""]);
  }
  public Fail() {}
}