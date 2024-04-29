import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import AuthService from '../services/auth.service';
import { Subscription } from 'rxjs';
import Items from '../models/items.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {

  pastOrders: string[] = [];
  oldItems: string[] = [];
  cartSubscription: Subscription | undefined;
  items: Items[] = [];


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getUserOldCart();
    this.cartSubscription = this.shopService.getOldCartListener().subscribe((cartItems: string[]) => {
      this.oldItems = cartItems;
    });
    this.shopService.getItems();
    this.shopService.getItemListener().subscribe((items: Items[]) => {
      this.items = items;
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
  reorderItem(itemId: string): void {
    this.shopService.addToCart(itemId);
  }

}
