import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  private isSignedUpSubject: BehaviorSubject<boolean>; // Add isSignedUpSubject
  public authChanged: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.authChanged = new BehaviorSubject<boolean>(false);
    this.isSignedUpSubject = new BehaviorSubject<boolean>(false); // Initialize isSignedUpSubject
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isSignedUp(): boolean { // Implement isSignedUp method
    return this.isSignedUpSubject.value;
  }

  setLoggedIn(value: boolean): void {
    this.isAuthenticatedSubject.next(value);
    this.authChanged.next(value); 
  }  

  setSignedUp(value: boolean): void { // Implement setSignedUp method
    this.isSignedUpSubject.next(value);
  }

  logout(): void {
    this.setLoggedIn(false);
  }
}
