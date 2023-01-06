import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login } from '../models/account/login';
import { Register } from '../models/account/register';
import { Observable } from 'rxjs';
import { GetUser } from '../models/account/getUser';
import { Update } from '../models/account/update';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public readonly serverPath = "https://localhost:7096/";
  public readonly path: string = this.serverPath + "api/Account/";
  public loginEmitter: EventEmitter<boolean>;
  public GetHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get("token"));
  }
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.loginEmitter = new EventEmitter<boolean>();
  }
  public async Login(login: Login): Promise<boolean> {
    const token = await this.http.post<string>(this.path + "Login", login).toPromise().catch(err => { });
    console.log(token);
    if (token != undefined) {
      this.cookieService.set("token", token);
    }
    return this.cookieService.check("token");
  }
  public async Register(register: Register): Promise<boolean> {
    const token = await this.http.post<string>(this.path + "Register", register).toPromise().catch(err => { });
    if (token != undefined) {
      this.cookieService.set("token", token);
    }
    return this.cookieService.check("token");
  }
  public GetUser(userName: string): Observable<GetUser> {
    const headers = this.GetHeader();
    return this.http.get<GetUser>(this.path + "GetUser/" + userName, { headers });
  }
  public GetActualUser(): Observable<GetUser> {
    const headers = this.GetHeader();
    return this.http.get<GetUser>(this.path + "GetActualUser", { headers });
  }
  public UpdateUser(user: Update): Observable<Update> {
    const headers = this.GetHeader();
    return this.http.put<Update>(this.path + "Update", user, { headers });
  }
  public IsLogged(): boolean {
    return this.cookieService.check("token");
  }
  public LoginNow() {
    this.loginEmitter.emit(true);
  }
  public LogoutNow() {
    if (this.IsLogged()) {
      this.cookieService.delete("token");
      this.loginEmitter.emit(false);
    }
  }
}
