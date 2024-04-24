import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from '../services/shop.service';
import { Subscription } from 'rxjs';
import Items from '../models/items.model'; // Assuming you have a model for items

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartItems: string[] = [];
  cartSubscription: Subscription | undefined;
  items: Items[] = [];


  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getUserCart(); // Fetch user's cart items
    this.cartSubscription = this.shopService.getCartListener().subscribe((cartItems: string[]) => {
      this.cartItems = cartItems;
    });
    // Fetch items
    this.shopService.getItems();
    this.shopService.getItemListener().subscribe((items: Items[]) => {
      this.items = items;
      console.log("Items:", this.items); // Add this line
    });
  }


  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  getItemById(itemId: string): Items | undefined {
    const item = this.items.find(item => item.id === itemId);
    console.log("Item:", item); // Add this line
    return item;
  }


}
