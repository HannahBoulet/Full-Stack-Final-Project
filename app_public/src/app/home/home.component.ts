import { Component } from '@angular/core';
import Items from '../models/items.model';
import { ShopService } from '../services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //home needs:
  /* 
  display all items, but only their price and name and img.
  see if user is logged in with current user, if not prompt them w a log in or register (may implement if time)
  */
  items: Items[] = [];
  sortedItems: Items[] = []; // Array to hold sorted items
  sortDirection: string = 'asc'; // Default sorting direction
  constructor(private shopService: ShopService, private router: Router) { }
  ngOnInit() {
    this.shopService.getItemListener().subscribe((items: Items[]) => {
      this.items = items;
    })
    this.shopService.getItems();
  }
  sortItems() {
    this.sortedItems = this.items.slice().sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  // Function to handle sorting direction change
  onSortDirectionChange() {
    this.sortItems();
  }


}
