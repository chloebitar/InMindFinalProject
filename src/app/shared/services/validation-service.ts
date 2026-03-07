import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private messages: Record<string, string> = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: 'This field is too short',
    maxlength: 'This field is too long',
    pattern: 'Invalid format',
    duplicate: 'This email is already registered',
  };

  getErrorMessage(control: AbstractControl | null): string | null {
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return null;
    }

    const firstErrorKey = Object.keys(control.errors)[0];

    if (firstErrorKey === 'minlength') {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Minimum ${requiredLength} characters required`;
    }

    if (firstErrorKey === 'maxlength') {
      const requiredLength = control.errors['maxlength'].requiredLength;
      return `Maximum ${requiredLength} characters allowed`;
    }

    return this.messages[firstErrorKey] || 'Invalid field';
  }
}
