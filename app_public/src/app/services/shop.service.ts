import { Injectable } from '@angular/core';
import Items, { IItems } from '../models/items.model';
import User, { IUser } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import AuthService from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  API_URL = "http://localhost:3000/api/";

  //item objects
  private items: Items[] = [];
  private itemListener: Subject<Items[]> = new Subject();
  private currentItem: Items | undefined;
  private currentItemListener: Subject<Items | undefined> = new Subject();

  //cart objects
  private cart: string[] = [];
  private cartListener: Subject<string[]> = new Subject();
  private oldCart: string[] = [];
  private oldCartListener: Subject<string[]> = new Subject();


  constructor(private http: HttpClient, private authService: AuthService) { }

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

  addToCart(itemId: string): void {
    const currentUser = this.authService.getUser();
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

  getCart(): string[] {
    return this.cart;
  }

  getCartListener(): Observable<string[]> {
    return this.cartListener.asObservable();
  }




  getUserCart(): void {
    const currentUser = this.authService.getUser();
    if (!currentUser) {
      console.error("No user logged in.");
      return;
    }


    this.http.get<string[]>(this.API_URL + `user/${currentUser.userName}/cart`).subscribe(
      (cartItems: string[]) => {
        this.cart = cartItems;
        this.cartListener.next(this.cart);
      },
      error => {
        console.error("Failed to fetch user's cart:", error);
      }
    );
  }
  deleteItemFromCart(itemId: string): void {
    const currentUser = this.authService.getUser();
    if (!currentUser) {
      console.error("No user logged in.");
      return;
    }

    this.http.delete(this.API_URL + `user/${currentUser.userName}/items/${itemId}`).subscribe(() => {
      const index = this.cart.indexOf(itemId);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.cartListener.next(this.cart);
      }
    }, error => {
      console.error("Failed to remove item from the cart:", error);
    });
  }

  clearCart(): Observable<any> {
    const currentUser = this.authService.getUser();
    return this.http.delete<any>(this.API_URL + `clearcart/${currentUser!.userName}`);
  }

  confirmOrder(itemId: string): Observable<any> {
    const currentUser = this.authService.getUser();
    return this.http.put<any>(this.API_URL + `user/${currentUser!.userName}/confirmOrder/${itemId}`, {});
  }

  getUserOldCart(): void {
    const currentUser = this.authService.getUser();
    if (!currentUser) {
      console.error("No user logged in.");
      return;
    }

    this.http.get<string[]>(this.API_URL + `user/${currentUser.userName}/oldCart`).subscribe(
      (cartItems: string[]) => {
        this.oldCart = cartItems;
        this.oldCartListener.next(this.oldCart);
      },
      error => {
        console.error("Failed to fetch user's oldCart:", error);
      }
    );
  }

  getOldCartListener(): Observable<string[]> {
    return this.oldCartListener.asObservable();
  }
  getOldCart(): string[] {
    return this.oldCart;
  }


}
