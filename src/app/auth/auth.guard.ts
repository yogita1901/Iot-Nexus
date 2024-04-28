import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() || this.authService.isSignedUp()) {
      return true; // User is logged in or signed up, allow access
    } else {
      this.router.navigate(['/signup']); // Redirect to signup page
      return false;
    }
  }
}

