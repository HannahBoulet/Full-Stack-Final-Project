import { Component } from '@angular/core';
import AuthService from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-make-account',
  templateUrl: './make-account.component.html',
  styleUrl: './make-account.component.css'
})
export class MakeAccountComponent {
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

    // Assuming the authService sets a flag indicating success/failure
    if (!this.authService.isLoggedIn()) {
      this.errorMessage = "Issue with Username or Password. Try again!";
    }
  }
}
