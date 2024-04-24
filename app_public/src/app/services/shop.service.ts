import { Injectable } from '@angular/core';
import Items, { IItems } from '../models/items.model';
import User, { IUser } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AuthService from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  API_URL = "http://localhost:3000/api/";

  //item stuff
  private items: Items[] = [];
  private itemListener: Subject<Items[]> = new Subject();
  private currentItem: Items | undefined;
  private currentItemListener: Subject<Items | undefined> = new Subject();

  //user stuff
  private user: User | null = null;
  private userListener: Subject<User[]> = new Subject();
  private currentUser: User | undefined;
  private currentUserListener: Subject<User | undefined> = new Subject();

  //cart stuff
  private cart: string[] = []; // Assuming cart holds item IDs
  private cartListener: Subject<string[]> = new Subject();


  constructor(private http: HttpClient, private authService: AuthService) { }
  //calls to api
  //item calls
  getItems(): void {
    this.http.get<IItems[]>(this.API_URL + "items").subscribe((iitems: IItems[]) => {
      this.items = [];
      iitems.forEach((iitems: IItems) => {
        this.items.push({
          id: iitems._id,
          itemName: iitems.itemName,
          image: iitems.image,
          description: iitems.description,
          price: iitems.price,
        })
      });
      this.itemListener.next(this.items);
    })
  }

  getItem(name: string) {
    this.http.get<{ item: IItems, message: string }>(this.API_URL + "items/" + name)
      .subscribe((res: { item: IItems | undefined, message: string }) => {
        if (res.item) {
          this.currentItem = {
            id: res.item._id,
            itemName: res.item.itemName,
            image: res.item.image,
            description: res.item.description,
            price: res.item.price,
          };
        } else {
          this.currentItem = undefined;
        }
        this.currentItemListener.next(this.currentItem);
      });
  }
  getItembyId(id: string) {
    this.http.get<{ item: IItems, message: string }>(this.API_URL + "items/id/" + id)
      .subscribe((res: { item: IItems | undefined, message: string }) => {
        if (res.item) {
          this.currentItem = {
            id: res.item._id,
            itemName: res.item.itemName,
            image: res.item.image,
            description: res.item.description,
            price: res.item.price,
          };
        } else {
          this.currentItem = undefined;
        }
        this.currentItemListener.next(this.currentItem);
      });
  }


  getCurrentItem(): Items | undefined {
    return this.currentItem
  }
  getCurrentItemListener(): Observable<Items | undefined> {
    return this.currentItemListener.asObservable();
  }
  getItemListener(): Observable<Items[]> {
    return this.itemListener.asObservable();
  }

  //add the addtocart funcitionality where users can add to cart by the current username and the current item ID
  addToCart(itemId: string): void {
    const currentUser = this.authService.getCurrentUser(); // Get current user
    if (!currentUser) {
      console.error("No user logged in.");
      return;
    }

    this.http.put(this.API_URL + `user/${currentUser.userName}/items/${itemId}`, {}).subscribe(() => {
      this.cart.push(itemId);
      this.cartListener.next(this.cart);
    }, error => {
      console.error("Failed to add item to the cart:", error);
    });
  }

  // Get cart
  getCart(): string[] {
    return this.cart;
  }

  // Get cart listener
  getCartListener(): Observable<string[]> {
    return this.cartListener.asObservable();
  }
  // Modify ShopService to fetch cart items for the current user
  getUserCart(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error("No user logged in.");
      return;
    }

    this.http.get<string[]>(`${this.API_URL}user/${currentUser.userName}/cart`).subscribe(
      (cartItems: string[]) => {
        this.cart = cartItems;
        this.cartListener.next(this.cart);
      },
      error => {
        console.error("Failed to fetch user's cart:", error);
      }
    );
  }



}
