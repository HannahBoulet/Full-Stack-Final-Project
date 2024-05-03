import { Component, OnInit } from '@angular/core';
import AuthenticationService from "../auth/auth.service";
import User from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn)
    this.authService.getLoggedInListener().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
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
    this.router.navigate(['//']);
  }


}
