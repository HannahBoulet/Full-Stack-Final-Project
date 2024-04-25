import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../services/shop.service';


@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrl: './confirmation-page.component.css'
})
export class ConfirmationPageComponent {
  creditCardNumber: string = '';
  address: string = '';
  shippingDate: Date | undefined;

  constructor(private router: Router, private shopService: ShopService) { }

  ngOnInit(): void {
    this.creditCardNumber = localStorage.getItem('creditCardNumber') || '';
    this.address = localStorage.getItem('address') || '';
    const currentDate = new Date();
    this.shippingDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
  }

  confirmOrder(): void {
    this.shopService.clearCart();
    localStorage.removeItem('creditCardNumber');
    localStorage.removeItem('address');
    this.router.navigate(['//']);
  }
}
