import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  errorMessage: string = '';


  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.getUserListener().subscribe(
      (user) => {
        if (user !== null) {
          this.router.navigate(['/']);
        }
        else {
          this.router.navigate(['//profile']);
        }
      }
    )
  }

  login(form: NgForm) {
    this.authService.login({
      userName: form.value.userName,
      password: form.value.password
    });
    if (!this.authService.isLoggedIn()) {
      this.errorMessage = "Incorrect username or password";
    }
  }

}

