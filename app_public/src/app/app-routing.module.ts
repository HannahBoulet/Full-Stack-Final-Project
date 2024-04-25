import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SigninComponent } from './signin/signin.component';
import { AboutComponent } from './about/about.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { MakeAccountComponent } from './make-account/make-account.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: CartPageComponent },
  { path: "checkout", component: CheckoutPageComponent },
  { path: "comfirm", component: ConfirmationPageComponent },


  { path: "login", component: SigninComponent },
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
