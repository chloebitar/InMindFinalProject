import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { ValidationService } from '../../shared/services/validation-service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  validation = inject(ValidationService);
  signupError = '';

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.signupError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password, firstName, lastName, username } = this.form.value;

    this.authService.signup(email!, firstName!, lastName!, password!, username!).subscribe({
      next: () => {
        console.log('Signup success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Signup failed', err);

        if (err.status === 409) {
          this.form.get('email')?.setErrors({ duplicate: true });
          this.form.get('email')?.markAsTouched();
          this.form.get('email')?.markAsDirty();
          return;
        }

        if (err.error?.message) {
          this.signupError = err.error.message;
        } else {
          this.signupError = 'Signup failed. Please try again.';
        }
      },
    });
  }
}
