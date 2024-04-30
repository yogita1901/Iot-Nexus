import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  formData: any = { // Initialize formData object with default values
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  };
  submitClicked = false;
  passwordVisible = false; 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("[7-9]{1}[0-9]{9}")]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.formData = this.signupForm.value; // Assign form value to formData
      console.log(this.formData); // Check if formData is populated correctly
  
      axios.post('http://localhost:3000/signup', this.formData)
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      this.submitClicked = true;
    }
  }
  

  shouldDisplayError(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return (control?.touched || this.submitClicked || control?.errors?.[controlName]) && control?.invalid;
  }


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
