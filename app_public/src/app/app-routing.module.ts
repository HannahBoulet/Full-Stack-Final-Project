import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SigninComponent } from './signin/signin.component';
import { AboutComponent } from './about/about.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { ProfileComponent } from './profile/profile.component';
import { MakeAccountComponent } from './make-account/make-account.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: CartPageComponent },
  { path: "signin", component: SigninComponent },
  { path: "profile", component: ProfileComponent },
  { path: "register", component: MakeAccountComponent },

  { path: "about", component: AboutComponent },
  { path: "items", component: ItemPageComponent },
  { path: "items/:itemName", component: ItemPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export default class AppRoutingModule { }
