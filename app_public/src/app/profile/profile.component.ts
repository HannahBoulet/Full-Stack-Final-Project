import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import User from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private shopService: ShopService, private router: Router) { }

  ngOnInit(): void {

  }
}


