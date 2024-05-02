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
  shippingDate: Date | undefined;

  constructor(private router: Router, private shopService: ShopService, private authService: AuthService) { }

  ngOnInit(): void {
    this.creditCardNumber = localStorage.getItem('creditCardNumber') || '';
    this.expiryDate = localStorage.getItem('expiryDate') || '';
    this.cvv = localStorage.getItem('cvv') || '';
    this.address = localStorage.getItem('address') || '';

    // Generate a random shipping date between 5 and 100 days from today
    const currentDate = new Date();
    const randomShippingDays = Math.floor(Math.random() * (1000 - 5 + 1)) + 5;
    this.shippingDate = new Date(currentDate.setDate(currentDate.getDate() + randomShippingDays));
  }

  confirmOrder(): void {
    // Clear cart
    this.shopService.clearCart().subscribe(() => {
      // Add items to past orders
      const cartItems = this.shopService.getCart();
      cartItems.forEach(itemId => {
        this.shopService.confirmOrder(itemId).subscribe(() => {
          console.log('Item added to past orders successfully');
        }, error => {
          console.error('Failed to add item to past orders:', error);
        });
      });

      // Clear local storage
      localStorage.removeItem('creditCardNumber');
      localStorage.removeItem('expiryDate');
      localStorage.removeItem('cvv');
      localStorage.removeItem('address');
      localStorage.removeItem('city');
      localStorage.removeItem('zipCode');

      // Navigate to home page
      this.router.navigate(['//']);
    }, error => {
      console.error('Failed to clear cart:', error);
    });
  }
}
