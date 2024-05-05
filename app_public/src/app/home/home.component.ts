import { Component } from '@angular/core';
import Items from '../models/items.model';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';
import AuthService from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private items: Items[] = [];
  sortedItems: Items[] = [];
  sortDirection: string = 'price';
  constructor(private shopService: ShopService, private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.shopService.getItemListener().subscribe((items: Items[]) => {
      this.items = items;
      this.sortItems();
    })
    this.shopService.getItems();
  }
  sortItems() {
    this.sortedItems = this.items.slice().sort((a, b) => {
      if (this.sortDirection === 'pricelow') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }
  onSortDirectionChange(direction: string) {
    this.router.navigate(['/']);
    this.sortDirection = direction;
    this.sortItems();
  }
  addToCart(itemId: string): void {
    this.shopService.addToCart(itemId);
  }
  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


}
