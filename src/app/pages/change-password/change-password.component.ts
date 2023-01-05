import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Update } from 'src/app/models/account/update';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public password: string = "";
  public confirmPassword: string = "";
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }
  changePassword(){
    if(this.password != this.confirmPassword)
      return;
    this.accountService.GetActualUser().subscribe(result => {
      const update: Update = {
        userName: result.userName,
        password: this.password,
        email: null
      };
      this.accountService.UpdateUser(update).subscribe(res => {
        this.router.navigate([""]);
      })
    });
  }

}
