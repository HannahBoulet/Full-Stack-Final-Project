import { Component } from '@angular/core';
import AuthenticationService from "../services/auth.service";
import User from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.getUserListener().subscribe((user: User | null) => {
      this.isLoggedIn = user !== null;
      console.log(this.isLoggedIn)
    })
  }

  links = {
    loggedIn: [
      { path: "/", name: "Home" },
      { path: "/about", name: "About" },
      { path: "/cart", name: "Cart" },
      { path: "/profile", name: "Profile" },

    ],
    loggedOut: [
      { path: "/", name: "Home" },
      { path: "/login", name: "LogIn" },
      { path: "/about", name: "About" },
    ]
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }


}
