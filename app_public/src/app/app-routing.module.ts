import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SigninComponent } from './signin/signin.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: CartPageComponent },
  { path: "signin", component: SigninComponent },
  { path: "about", component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export default class AppRoutingModule { }
