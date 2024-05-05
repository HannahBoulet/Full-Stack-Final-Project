import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';
import Items from '../models/items.model';
import AuthService from '../auth/auth.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  item: Items | undefined;
  items: Items[] = [];


  constructor(private route: ActivatedRoute, private shopService: ShopService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemName = params['itemName'];
      this.shopService.getItem(itemName);
    });

    this.shopService.getCurrentItemListener().subscribe((item: Items | undefined) => {
      if (!item) {
        this.router.navigate(['/']);
      }
      this.item = item;
    });

    this.shopService.getItemListener().subscribe((items: Items[]) => {
      this.items = items;
    });

    this.shopService.getItem(this.route.snapshot.params["itemName"]);
    this.shopService.getItems();
  }
  addToCart(itemId: string): void {
    this.shopService.addToCart(itemId);
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}

