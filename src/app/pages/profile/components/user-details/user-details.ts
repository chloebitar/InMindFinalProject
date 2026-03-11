import { Component, computed, effect, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../core/auth/auth-services/auth-service';
import { IUser } from '../../../../core/auth/auth-interfaces/user';
import { ValidationService } from '../../../../shared/services/validation-service';
@Component({
  selector: 'app-user-details',
  imports: [ReactiveFormsModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  validation=inject(ValidationService);
  user = this.auth.user;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const u = this.user();
      if (!u) return;

      this.form.reset(
        {
          firstName: u.firstName ?? '',
          lastName: u.lastName ?? '',
          email: u.email ?? '',
          username: u.username ?? '',
        },
        { emitEvent: false },
      );
    });
  }

  save() {
     if (this.form.invalid) {
       this.form.markAllAsTouched();
       return;
     }


    const emailControl = this.form.get('email');
    const values = this.form.value;

    const fd = new FormData();
    fd.append('firstName', values.firstName!);
    fd.append('lastName', values.lastName!);
    fd.append('email', values.email!);
    fd.append('username', values.username!);
    //fd.append('role',"admin")
    this.http
      .patch<IUser>('https://melaine-palaeobiologic-savourily.ngrok-free.dev/api/user', fd)
      .subscribe({
        next: (updated) => {
          emailControl?.setErrors(null);
          this.auth.setUser(updated);
        },
        error: (err) => {
          if (err.status === 400) {
            emailControl?.setErrors({ duplicate: true });
            emailControl?.markAsTouched();
          }
        },
      },
    )}}