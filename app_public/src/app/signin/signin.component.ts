import { Component } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private shopService: ShopService, private router: Router) { }

  signin(): void {
    this.shopService.login(this.username, this.password).subscribe(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile']);
      } else {
        this.error = response.message;
      }
    }, error => {
      console.error('Error during login:', error);
      this.error = 'An unexpected error occurred. Please try again later.';
    });
  }
}

