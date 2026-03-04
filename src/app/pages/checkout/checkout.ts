import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import paymentData from '../../../assets/data/payment-methods.json';
import { PaymentMethod } from '../../Interfaces/payment-method';

import { MapPicker } from '../../shared/components/map-picker/map-picker';
import { UpperCasePipe } from '@angular/common';
import { CheckoutSummary } from '../../shared/services/checkout-summary';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import emailjs from '@emailjs/browser';
import { CartService } from '../../shared/services/cart-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    UpperCasePipe,
    MapPicker,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private fb = inject(FormBuilder);
  summary = inject(CheckoutSummary);
  cart=inject(CartService)

  auth=inject(AuthService)
  methods = signal<PaymentMethod[]>(paymentData.paymentMethods);

  paymentGroup = this.fb.group({
    paymentType: this.fb.control<'card' | 'cod' | null>(null, Validators.required),
    methodId: this.fb.control<number | null>(null),
  });

  locationGroup = this.fb.group({
    lat: this.fb.control<number | null>(null, Validators.required),
    lng: this.fb.control<number | null>(null, Validators.required),
    note: this.fb.control(''),
  });

  selectedMethod(): PaymentMethod | null {
    const id = this.paymentGroup.value.methodId;
    if (!id) return null;
    return this.methods().find((m) => m.id === id) ?? null;
  }

  onPaymentTypeChange(type: 'card' | 'cod') {
    if (type === 'cod') {
      this.paymentGroup.patchValue({ methodId: null });
      return;
    }

    if (!this.paymentGroup.value.methodId) {
      const defaultCard = this.methods().find((m) => m.default) ?? this.methods()[0];
      if (defaultCard) {
        this.paymentGroup.patchValue({ methodId: defaultCard.id });
      }
    }
  }

  setPinnedLocation(lat: number, lng: number) {
    this.locationGroup.patchValue({ lat, lng });
  }

  canGoNextFromPayment(): boolean {
    const type = this.paymentGroup.value.paymentType;

    if (!type) return false;

    if (type === 'cod') return true;

    return !!this.paymentGroup.value.methodId;
  }

  async confirmOrder() {
    if (!this.canGoNextFromPayment() || this.locationGroup.invalid) return;

    const u = this.auth.user();
    const userEmail = u?.email; 
    const userName = `${u?.firstName ?? ''} ${u?.lastName ?? ''}`.trim() || 'Customer';

    if (!userEmail) {
      alert('No email found for this user.');
      return;
    }

    const orderId = crypto.randomUUID();

    const items = this.cart.items(); 

    const templateParams = {
      email: userEmail,
      order_id: orderId, 

      orders: items.map((i) => ({
        name: i.title, 
        units: i.qty, 
        price: (i.price * i.qty).toFixed(2),
        image_url:(i.image)
      })),

      subtotal: this.summary.subtotalText(),
      delivery: this.summary.deliveryText(),
      total: this.summary.totalText(), 

    };

    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams,
        { publicKey: environment.emailjs.publicKey },
      );

      alert('Order confirmed! Email sent.');
      console.log('ORDER EMAIL PARAMS:', templateParams);
    } catch (err) {
      console.error('EmailJS error:', err);
      alert('Order confirmed, but email failed to send.');
    }
  }
}
