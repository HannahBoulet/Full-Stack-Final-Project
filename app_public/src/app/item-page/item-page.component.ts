import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import Items from '../models/items.model';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  item: Items | undefined;
  items: Items[] = [];


  constructor(private route: ActivatedRoute, private shopService: ShopService, private router: Router) { }

  ngOnInit() {
    // Subscribe to route parameter changes
    this.route.params.subscribe(params => {
      const itemName = params['itemName'];
      this.shopService.getItem(itemName);
    });

    // Subscribe to item and items observables
    this.shopService.getCurrentItemListener().subscribe((item: Items | undefined) => {
      if (!item) {
        this.router.navigate(['/']);
      }
      this.item = item;
    });

    this.shopService.getItemListener().subscribe((items: Items[]) => {
      this.items = items;
    });

    // Fetch initial item and items
    this.shopService.getItem(this.route.snapshot.params["itemName"]);
    this.shopService.getItems();
  }
  //add a way to add item to cart, add one where it will be a quick check out which will put customer directly to cart,
  //or just simply add to cart and continue shopping

}

