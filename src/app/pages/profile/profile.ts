import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

type TabKey = 'orders' | 'details' | 'payments';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tabs: { key: TabKey; label: string }[] = [
    { key: 'orders', label: 'Orders' },
    { key: 'details', label: 'Details' },
    { key: 'payments', label: 'Payments' },
  ];

  activeTab = signal<TabKey>('orders');

  // mock data (replace later with backend)
  user = signal({
    id: 'U-10293',
    firstName: 'Chloe',
    lastName: 'Bitar',
    email: 'chloe@email.com',
    phone: '+961 XX XXX XXX',
  });

  orders = signal([
    { id: '#1042', date: '2026-02-25', status: 'Delivered', total: 69.9 },
    { id: '#1041', date: '2026-02-20', status: 'Processing', total: 29.5 },
    { id: '#1039', date: '2026-02-10', status: 'Cancelled', total: 112.0 },
  ]);

  paymentMethods = signal([
    { id: 'pm_1', brand: 'Visa', last4: '4242', exp: '09/28' },
    { id: 'pm_2', brand: 'Mastercard', last4: '4444', exp: '01/27' },
  ]);

  fullName = computed(() => `${this.user().firstName} ${this.user().lastName}`);

  constructor() {
    effect(() => {
      const qp = this.route.snapshot.queryParamMap.get('tab') as TabKey | null;
      if (qp && this.tabs.some((t) => t.key === qp)) this.activeTab.set(qp);
    });

    // keep signal synced with URL when user clicks tab
    effect(() => {
      const tab = this.activeTab();
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { tab },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  setTab(tab: TabKey) {
    this.activeTab.set(tab);
  }

  // placeholders
  saveDetails() {
    console.log('save details', this.user());
  }

  removePayment(id: string) {
    this.paymentMethods.set(this.paymentMethods().filter((p) => p.id !== id));
  }
}
