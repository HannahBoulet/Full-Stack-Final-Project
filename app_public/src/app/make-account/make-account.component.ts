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
    this.authService.register({
      user: { userName: form.value.userName },
      password: form.value.password
    });
  }
}
