import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import { IUser } from '../../core/auth/auth-interfaces/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  user = this.auth.user;

  initials = computed(() => {
    const u = this.user();
    if (!u) return '??';
    const a = (u.firstName?.[0] ?? '').toUpperCase();
    const b = (u.lastName?.[0] ?? '').toUpperCase();
    return a + b || (u.username?.[0]?.toUpperCase() ?? '??');
  });

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
    if (this.form.invalid) return;

    const values = this.form.value;

    const fd = new FormData();
    fd.append('firstName', values.firstName!);
    fd.append('lastName', values.lastName!);
    fd.append('email', values.email!);
    fd.append('username', values.username!);
    this.http
      .patch<IUser>('https://melaine-palaeobiologic-savourily.ngrok-free.dev/api/user', fd)
      .subscribe((updated) => {
        this.auth.setUser(updated);
      });
  }
}
