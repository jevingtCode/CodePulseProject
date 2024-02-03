import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../features/auth/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule, CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.user = response;

      }
    });

    this.user = this.authService.getUser();
  }

  

  onLogout(): void {
    this.authService.logout();
  }

}
