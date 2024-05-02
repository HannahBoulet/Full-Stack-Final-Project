import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AboutComponent } from './about/about.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { RegisterComponent } from './auth/register/register.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: CartPageComponent, canActivate: [authGuard] },
  { path: "checkout", component: CheckoutPageComponent, canActivate: [authGuard] },
  { path: "comfirm", component: ConfirmationPageComponent, canActivate: [authGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [authGuard] },
  { path: "login", component: SigninComponent },
  { path: "register", component: RegisterComponent },
  { path: "about", component: AboutComponent },
  { path: "items", component: ItemPageComponent },
  { path: "items/:itemName", component: ItemPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export default class AppRoutingModule { }
