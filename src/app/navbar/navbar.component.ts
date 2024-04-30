import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.authSubscription = this.authService.authChanged.subscribe((loggedIn: boolean) => {
      this.isAuthenticated = loggedIn; 
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.logout(); // Handle local logout logic
  
    axios.post('https://iot-nexus-backend.vercel.app/login', { login: false })
      .then(response => {
        // Handle response data if needed
        console.log('Logout successful:', response.data);
        // Redirect to homepage or handle success state
        this.router.navigateByUrl('/homepage');
      })
      .catch(error => {
        console.error('Error logging out:', error);
        // Handle error state if needed
      });
  }
  
}
