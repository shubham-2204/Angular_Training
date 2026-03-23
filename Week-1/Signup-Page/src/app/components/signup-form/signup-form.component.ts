import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  passwordStrengthValidator,
  passwordMatchValidator,
  indianPhoneValidator,
  noWhitespaceValidator
} from '../../validators/custom.validators';
import { SignupFormData } from '../../models/user.model';
import { PasswordStrengthComponent } from '../password-strength/password-strength.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordStrengthComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css',
})
export class SignupFormComponent implements OnInit {
  @Input() isLoading = false;
  @Output() formSubmitted = new EventEmitter<SignupFormData>();

  form!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  focusedField: string | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        fullName: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(50), noWhitespaceValidator()],
        ],
        email: [
          '',
          [Validators.required, Validators.email, noWhitespaceValidator()],
        ],
        phone: [
          '',
          [Validators.required, indianPhoneValidator()],
        ],
        password: [
          '',
          [Validators.required, passwordStrengthValidator()],
        ],
        confirmPassword: [
          '',
          Validators.required,
        ],
      },
      { validators: passwordMatchValidator('password', 'confirmPassword') }
    );
  }

  get fullName() { return this.form.get('fullName')!; }
  get email() { return this.form.get('email')!; }
  get phone() { return this.form.get('phone')!; }
  get password() { return this.form.get('password')!; }
  get confirmPassword() { return this.form.get('confirmPassword')!; }
  get passwordValue() { return this.password.value || ''; }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isValid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  getFieldClass(field: string): string {
    if (this.isInvalid(field)) return 'field-error';
    if (this.isValid(field)) return 'field-success';
    if (this.focusedField === field) return 'field-focused';
    return '';
  }

  onFocus(field: string): void { this.focusedField = field; }
  onBlur(field: string): void { this.focusedField = null; this.form.get(field)?.markAsTouched(); }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { confirmPassword, ...data } = this.form.value;
    this.formSubmitted.emit(data as SignupFormData);
  }
}