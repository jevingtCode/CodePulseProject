import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //emit value for nav
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private router: Router) {

   }

  login(request: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, 
    {
      email: request.email,
      password: request.password
    }); 
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if(email && roles) {
      const user: User = {
        email: email,
        roles: roles?.split(',')
      };
      return user;
    }

    return undefined;
  }

  setUser(user: User): void{
    this.$user.next(user);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-roles',user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
    this.router.navigateByUrl('/');
  }
}
