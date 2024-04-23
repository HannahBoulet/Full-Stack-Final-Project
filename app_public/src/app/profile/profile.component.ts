import { Component, OnInit } from '@angular/core';
import User from '../models/user.model';
import AuthService from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null | undefined;
  newPassword: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  changePassword(): void {
    const userName = (this.user?.userName || '').toString(); // If user is undefined, default to empty string
    this.authService.updatePassword({ userName, newPassword: this.newPassword });
    this.newPassword = ''; // Clear the input field after password change
  }
}
