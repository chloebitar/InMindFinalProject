import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ValidationService } from '../../shared/services/validation-service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  validation = inject(ValidationService);

  loginError = '';

  fbGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.loginError = '';

    if (this.fbGroup.invalid) {
      this.fbGroup.markAllAsTouched();
      return;
    }

    const { email, password } = this.fbGroup.value;

    this.authService.authentication(email!, password!).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err: any) => {
        console.error('login failed', err);

        if (err.status === 401 || err.status === 400) {
          this.loginError = 'Incorrect email or password';
        } else {
          this.loginError = 'Something went wrong. Please try again.';
        }
      },
    });
  }
}
