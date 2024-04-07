import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  links = [
    { path: '/', name: "Home" },
    { path: '/about', name: "About" },
    { path: '/cart', name: "Cart" },
    { path: '/signin', name: "Signin" },

  ]

}
