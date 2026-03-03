import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth-services/auth-service';

type TabKey = 'orders' | 'details' | 'payments';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
   auth = inject(AuthService);

  user = this.auth.user; 
  initials = computed(() => {
    const u = this.user();
    if (!u) return '??';
    const a = (u.firstName?.[0] ?? '').toUpperCase();
    const b = (u.lastName?.[0] ?? '').toUpperCase();
    return a + b || (u.username?.[0]?.toUpperCase() ?? '??');
  });
}
