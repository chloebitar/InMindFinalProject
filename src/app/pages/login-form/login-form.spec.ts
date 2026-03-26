import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { LoginForm } from './login-form';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import { ValidationService } from '../../shared/services/validation-service';

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  const authServiceMock = {
    authentication: () => of('fake-token'),
  };

  const validationServiceMock = {
    getErrorMessage: () => null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
        { provide: ValidationService, useValue: validationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
