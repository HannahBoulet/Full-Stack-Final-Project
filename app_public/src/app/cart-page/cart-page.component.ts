import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Subscription } from 'rxjs';
import Items from '../models/items.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartItems: string[] = [];
  cartSubscription: Subscription | undefined;
  items: Items[] = [];
  totalPrice: number = 0;



  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {
    this.shopService.getUserCart();
    this.cartSubscription = this.shopService.getCartListener().subscribe((cartItems: string[]) => {
      this.cartItems = cartItems;
      this.calculateTotalPrice();
    });
    this.shopService.getItems();
    this.shopService.getItemListener().subscribe((items: Items[]) => {
      this.items = items;
      this.calculateTotalPrice();
    });
  }


  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  getItemById(itemId: string): Items | undefined {
    return this.items.find(item => item.id === itemId);;
  }

  deleteItemFromCart(itemId: string): void {
    this.shopService.deleteItemFromCart(itemId);
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, itemId) => {
      const item = this.getItemById(itemId);
      return total + (item ? item.price : 0);
    }, 0);
  }
  goToCheckout(): void {
    localStorage.setItem('totalPrice', this.totalPrice.toString());
    this.router.navigate(['//checkout']);
  }

}
