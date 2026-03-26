import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { SignUp } from './sign-up';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import { ValidationService } from '../../shared/services/validation-service';

describe('SignUp', () => {
  let component: SignUp;
  let fixture: ComponentFixture<SignUp>;

  const authServiceMock = {
    signup: () => of({}),
  };

  const validationServiceMock = {
    getErrorMessage: () => null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUp],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
        { provide: ValidationService, useValue: validationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
