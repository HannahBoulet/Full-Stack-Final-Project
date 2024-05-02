import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css'] // Corrected the styleUrl to styleUrls
})
export class CheckoutPageComponent {
  totalPriceWithTax: number = 0;
  creditCardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  address: string = '';
  city: string = '';
  zipCode: string = '';

  constructor(private router: Router, private shopService: ShopService) { }

  ngOnInit(): void {
    const totalPrice = parseFloat(localStorage.getItem('totalPrice') || '0');
    this.totalPriceWithTax = totalPrice * 1.03; // Adding 3% tax
  }

  goToPayment(): void {
    // Save credit card info and address to local storage
    localStorage.setItem('creditCardNumber', this.creditCardNumber);
    localStorage.setItem('expiryDate', this.expiryDate);
    localStorage.setItem('cvv', this.cvv);
    localStorage.setItem('address', this.address);
    localStorage.setItem('city', this.city);
    localStorage.setItem('zipCode', this.zipCode);

    // Proceed to the confirmation page
    this.router.navigate(['//comfirm']);
    this.shopService.clearCart()
  }
}
