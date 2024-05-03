import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  API_URL = "http://localhost:3000/api/user/";
  TOKEN_KEY = "";

  user: User | null = null;
  userListener: Subject<User | null> = new Subject();

  private loggedIn: boolean = false;
  private loggedInListener: Subject<boolean> = new Subject();


  constructor(private http: HttpClient) { }

  register({ user, password }: { user: User, password: string }) {
    this.http.post<{ token: string, user: User } | { error: any }>(this.API_URL + "register",
      {
        userName: user.userName,
        password
      })
      .subscribe((response) => {
        if ("error" in response) {
          console.log(response.error);
        }
        else {
          const token = response.token;
          localStorage.setItem(this.TOKEN_KEY, token);
          this.user = response.user;
          this.loggedIn = true;
          this.userListener.next(this.user);
          this.loggedInListener.next(true);
        }
      })
  }

  login({ userName, password }: { userName: string, password: string }) {
    this.http.post<{ token: string, user: User } | { error: any }>(this.API_URL + "login",
      {
        userName,
        password,
      })
      .subscribe((response) => {
        if ("error" in response) {
          console.log(response.error);
        }
        else {
          const token = response.token;
          localStorage.setItem(this.TOKEN_KEY, token);
          this.user = response.user;
          this.loggedIn = true;
          this.userListener.next(this.user);
          this.loggedInListener.next(true);
        }
      })
  }


  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  getUser(): User | null {
    return this.user;
  }
  getLoggedInListener(): Observable<boolean> {
    return this.loggedInListener.asObservable();
  }

  getUserListener(): Observable<User | null> {
    return this.userListener.asObservable();
  }

  autoLogIn(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenPayload.exp);
      console.log("hit here");
      console.log(expirationDate);
      console.log(new Date());


      if (new Date().getTime() < expirationDate.getTime()) {
        console.log("auto LOGINWORK ");
        this.user = {
          userName: tokenPayload.userName,
        }
        this.loggedIn = true;
        this.userListener.next(this.user);
        this.loggedInListener.next(true);
      }
      console.log("auto LOGIN NOT WORK ");

    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.user = null;
    this.loggedIn = false;
    this.userListener.next(null);
    this.loggedInListener.next(false);
  }


  getToken() {
    return localStorage.getItem(this.TOKEN_KEY) ?? "";
  }

}

