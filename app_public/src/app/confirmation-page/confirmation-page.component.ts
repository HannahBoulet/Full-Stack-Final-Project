import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import AuthService from '../auth/auth.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent {
  creditCardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  zipCode: string = '';
  shippingDate: Date | undefined;

  constructor(private router: Router, private shopService: ShopService, private authService: AuthService) { }

  ngOnInit(): void {
    this.creditCardNumber = localStorage.getItem('creditCardNumber') || '';
    this.expiryDate = localStorage.getItem('expiryDate') || '';
    this.cvv = localStorage.getItem('cvv') || '';
    this.address = localStorage.getItem('address') || '';
    this.city = localStorage.getItem('city') || '';
    this.state = localStorage.getItem('state') || '';
    this.country = localStorage.getItem('country') || '';
    this.zipCode = localStorage.getItem('zipCode') || '';

    const currentDate = new Date();
    const randomShippingDays = Math.floor(Math.random() * (1000 - 5 + 1)) + 5;
    this.shippingDate = new Date(currentDate.setDate(currentDate.getDate() + randomShippingDays));
  }

  confirmOrder(): void {
    this.shopService.clearCart().subscribe(() => {
      const cartItems = this.shopService.getCart();
      cartItems.forEach(itemId => {
        this.shopService.confirmOrder(itemId).subscribe(() => {
          console.log('Item added to past orders successfully');
        }, error => {
          console.error('Failed to add item to past orders:', error);
        });
      });
      localStorage.removeItem('creditCardNumber');
      localStorage.removeItem('expiryDate');
      localStorage.removeItem('cvv');
      localStorage.removeItem('address');
      localStorage.removeItem('city');
      localStorage.removeItem('state');
      localStorage.removeItem('country');
      localStorage.removeItem('zipCode');

      this.router.navigate(['//']);
    }, error => {
      console.error('Failed to clear cart:', error);
    });
  }
}
