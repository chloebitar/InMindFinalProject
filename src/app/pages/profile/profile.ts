import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import { UserDetails } from './components/user-details/user-details';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, UserDetails],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private auth = inject(AuthService);

  user = this.auth.user;

  initials = computed(() => {
    const u = this.user();
    if (!u) return '??';
    const a = (u.firstName?.[0] ?? '').toUpperCase();
    const b = (u.lastName?.[0] ?? '').toUpperCase();
    return a + b || (u.username?.[0]?.toUpperCase() ?? '??');
  });
}
