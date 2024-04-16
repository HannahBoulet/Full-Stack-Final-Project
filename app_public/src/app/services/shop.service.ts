import { Injectable } from '@angular/core';
import Items, { IItems } from '../models/items.model';
import User, { IUser } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  private tokenTimer: NodeJS.Timer | null = null;
  private userListener: Subject<User[]> = new Subject();
  private currentUser: User | undefined;
  private currentUserListener: Subject<User | undefined> = new Subject();

  //cart stuff


  constructor(private http: HttpClient) { }
  //calls to api
  //item calls
  getItems(): void {
    this.http.get<IItems[]>(this.API_URL + "items").subscribe((iitems: IItems[]) => {
      this.items = [];
      iitems.forEach((iitems: IItems) => {
        this.items.push({
          id: iitems.id,
          itemName: iitems.itemName,
          image: iitems.image,
          description: iitems.description,
          price: iitems.price,
          v: iitems.v,
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
            id: res.item.id,
            itemName: res.item.itemName,
            image: res.item.image,
            description: res.item.description,
            price: res.item.price,
            v: res.item.v
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



  //user stuff
  login(userName: string, password: string): Observable<{ message: string, token?: string }> {
    return this.http.post<{ message: string, token?: string }>(this.API_URL + "login", { userName, password });
  }

  // Create new user
  createUser(userName: string, password: string): Observable<User> {
    return this.http.post<User>(this.API_URL + "signup", { userName, password });
  }

  // Get user by ID
  getUserById(userId: string): Observable<{ user: User | undefined, message: string }> {
    return this.http.get<{ user: User | undefined, message: string }>(this.API_URL + "user/" + userId);
  }

  getCurrentUser(): User | undefined {
    return this.currentUser;
  }
  getCurrentUserListener(): Observable<User | undefined> {
    return this.currentUserListener.asObservable();
  }
  getUserListener(): Observable<User[]> {
    return this.userListener.asObservable();
  }

  //calls needed:
  /* call for get items, 
  call for item when user clicks on the item
  have current user
  have current cart
  have current item
  need to look more into the profiles/cart stuff (will be moving items around)
   */
}
