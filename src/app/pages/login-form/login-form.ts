import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { Validators } from '@angular/forms';
import { last } from 'rxjs';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  fbGroup = this.fb.group({
    // firstname: ['',Validators.required],
    // lastname: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.fbGroup.invalid) return;

    const { email, password } = this.fbGroup.value;

    this.authService.authentication(email!, password!).subscribe({
      next: () => {
        console.log('Login success');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Signup failed', err);
        console.log(email, password);
      },
    });
  }
}
