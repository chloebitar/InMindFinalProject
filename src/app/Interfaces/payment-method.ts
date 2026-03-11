export interface IPaymentMethod {
  id: number;
  userId: number;
  brand: string;
  last4: string;
  cardholder: string;
  expiry: string;
  default: boolean;
}
