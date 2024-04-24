import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user.model';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class AuthService {
  API_URL = "http://localhost:3000/api/user/";
  TOKEN_KEY = "";

  //is logged in boolean
  user: User | null = null;
  userListener: Subject<User | null> = new Subject();

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
          this.userListener.next(this.user);
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
          this.userListener.next(this.user);
        }
      })
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  getUser(): User | null {
    return this.user;
  }

  getUserListener(): Observable<User | null> {
    return this.userListener.asObservable();
  }

  autoLogIn(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(tokenPayload.exp);
      if (new Date().getTime() > expirationDate.getTime()) {
        this.retrieveUser(tokenPayload.userName);
      }
    }
  }

  retrieveUser(userName: string): void {
    this.http.get<User | null>(this.API_URL + userName)
      .subscribe((user: User | null) => {
        if (user) {
          this.user = user;
          this.userListener.next(user);
        }
      });
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.user = null;
    this.userListener.next(null);
  }

  updatePassword({ userName, newPassword }: { userName: string, newPassword: string }) {
    this.http.put<{ message: string, updatedUser: User } | { error: any }>(this.API_URL + "profile/" + userName, { newPassword })
      .subscribe((response) => {
        if ("error" in response) {
          console.log(response.error);
        } else {
          console.log(response.message);
          const updatedUser = response.updatedUser;
          this.userListener.next(updatedUser);
        }
      });
  }
  getCurrentUser(): User | null {
    return this.user;
  }


}

