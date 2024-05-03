import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {
  totalPriceWithTax: number = 0;
  creditCardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
  zipCode: string = '';

  constructor(private router: Router, private shopService: ShopService) { }

  ngOnInit(): void {
    const totalPrice = parseFloat(localStorage.getItem('totalPrice') || '0');
    this.totalPriceWithTax = totalPrice * 1.03; // Adding 3% tax
  }

  goToPayment(): void {
    localStorage.setItem('creditCardNumber', this.creditCardNumber);
    localStorage.setItem('expiryDate', this.expiryDate);
    localStorage.setItem('cvv', this.cvv);
    localStorage.setItem('address', this.address);
    localStorage.setItem('city', this.city);
    localStorage.setItem('state', this.state);
    localStorage.setItem('country', this.country);
    localStorage.setItem('zipCode', this.zipCode);

    this.router.navigate(['//confirm']);
    this.shopService.clearCart();
  }
}

