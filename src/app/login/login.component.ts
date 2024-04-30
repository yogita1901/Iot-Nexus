import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy { 
  loginForm!: FormGroup;
  errors: any = {};
  submitClicked = false;
  emailErrorAfterSubmit = false;
  passErrorAfterSubmit = false;
  private routerSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) { 
    this.initLoginForm();
    this.subscribeToRouterEvents();
  }

  ngOnDestroy(): void { 
    this.loginForm.reset();
    this.routerSubscription?.unsubscribe();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  subscribeToRouterEvents(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    if (!this.loginForm.dirty) {
      this.loginForm.reset();
      this.errors = {};
      this.submitClicked = false;
      this.emailErrorAfterSubmit = false;
      this.passErrorAfterSubmit = false;
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = { ...this.loginForm.value };
      console.log(formData)
      axios.post('https://iot-nexus-backend.vercel.app/login', formData)
        .then(response => {
          console.log('Login successful:', response.data);
          // Call AuthService method to set authentication status
          this.authService.setLoggedIn(true);
          // Reset form fields manually
          this.loginForm.patchValue({
            email: '',
            password: ''
          });
          // Ensure form is marked as pristine
          this.loginForm.markAsPristine();
          this.submitClicked = false; // Reset submit flag
          // Navigate to '/dashboard' on successful login
          this.router.navigate(['/dashboard']);
        })
        .catch(error => {
          this.errors = error.response.data; 
          if(error.response.data.error === "Firebase: Error (auth/wrong-password).") {
            this.passErrorAfterSubmit = true;
          } else {
            this.emailErrorAfterSubmit = true;
          }
        });
    } else {
      this.submitClicked = true;
    }
  }
  

  shouldDisplayError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.touched || this.submitClicked || control?.errors?.[controlName]) && control?.invalid;
  }
}
