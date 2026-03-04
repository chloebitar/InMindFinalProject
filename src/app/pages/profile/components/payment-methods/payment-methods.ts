import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth-services/auth-service';
import { PaymentMethod } from '../../../../Interfaces/payment-method';
import paymentData from '../../../../../assets/data/payment-methods.json';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.scss',
})
export class PaymentMethods {
  private auth = inject(AuthService);
  private methods = signal<PaymentMethod[]>(paymentData.paymentMethods);

  userMethods = computed(() => {
    const u = this.auth.user();
    if (!u) return [];
    return this.methods().filter((m) => m.userId === u.id);
  });

}
