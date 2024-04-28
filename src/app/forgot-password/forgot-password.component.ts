import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  submitClicked = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitClicked = true;
    if (this.forgotPasswordForm.valid) {
      console.log('Reset password form submitted');
      // Add logic to handle form submission (e.g., send reset password email)
    } else {
      // Mark all form fields as touched to trigger error messages
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  handleEmailChange(event: Event) {
    const emailInput = event.target as HTMLInputElement;
    this.forgotPasswordForm.patchValue({
      email: emailInput.value.trim() 
    });
  }

  shouldDisplayError() {
    const emailControl = this.forgotPasswordForm.get('email');
    return emailControl?.invalid && (emailControl?.touched || this.submitClicked);
  }



}

