export interface PaymentMethod {
  id: number;
  userId: number;
  brand: string;
  last4: string;
  cardholder: string;
  expiry: string;
  default: boolean;
}
