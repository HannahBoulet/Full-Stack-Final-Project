import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import AuthService from '../services/auth.service';


@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrl: './confirmation-page.component.css'
})
export class ConfirmationPageComponent {
  creditCardNumber: string = '';
  address: string = '';
  shippingDate: Date | undefined;

  constructor(private router: Router, private shopService: ShopService, private authService: AuthService) { }

  ngOnInit(): void {
    this.creditCardNumber = localStorage.getItem('creditCardNumber') || '';
    this.address = localStorage.getItem('address') || '';
    const currentDate = new Date();
    this.shippingDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
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
      localStorage.removeItem('address');

      // Navigate to home page
      this.router.navigate(['/']);
    }, error => {
      console.error('Failed to clear cart:', error);
    });
  }

}
