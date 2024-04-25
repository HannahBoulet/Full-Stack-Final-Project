import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  totalPriceWithTax: number = 0;
  creditCardNumber: string = '';
  address: string = '';

  constructor(private router: Router, private shopService: ShopService) { }

  ngOnInit(): void {
    const totalPrice = parseFloat(localStorage.getItem('totalPrice') || '0');
    this.totalPriceWithTax = totalPrice * 1.03; // Adding 3% tax
  }

  goToPayment(): void {
    // Save credit card info and address to local storage
    localStorage.setItem('creditCardNumber', this.creditCardNumber);
    localStorage.setItem('address', this.address);

    // Proceed to the confirmation page
    this.router.navigate(['//comfirm']);
    this.shopService.clearCart().subscribe(
      () => {
        console.log("Cart cleared successfully");
      },
      (error) => {
        console.error("Failed to clear cart:", error);
      }
    );
  }
}
