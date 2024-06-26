import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import AuthService from '../auth/auth.service';
import { Subscription } from 'rxjs';
import Items from '../models/items.model';
import User from '../models/user.model';

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
  currentUser: User | null = null;


  constructor(private shopService: ShopService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
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
