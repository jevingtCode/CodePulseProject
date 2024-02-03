import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginRequest;

  constructor(private authService: AuthService,
     private cookieService: CookieService,
     private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void{
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {
        console.log(response);
        // Set Auth cookie

        this.cookieService.set('Authorization', `Bearer ${response.token}`,
        undefined, '/', undefined, true, 'Strict');

        //set user
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        })

        //Redirect to home
        this.router.navigateByUrl('/')
      }
    })
  }
}
