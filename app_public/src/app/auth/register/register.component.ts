import { Component } from '@angular/core';
import AuthService from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.authService.getUserListener().subscribe(
      (user) => {
        if (user !== null) {
          this.router.navigate(['/']);
        }
      })
  }

  register(form: NgForm) {
    const { userName, password } = form.value;

    this.authService.register({ user: { userName }, password });
    if (!this.authService.isLoggedIn()) {
      this.errorMessage = "Issue with Username or Password. Try again!";
    }
  }
}
