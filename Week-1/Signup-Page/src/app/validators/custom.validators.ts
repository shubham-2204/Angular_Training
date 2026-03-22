import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    if (!value) return null;

    const hasMinLength  = value.length >= 8;
    const hasUppercase  = /[A-Z]/.test(value);
    const hasNumber     = /[0-9]/.test(value);
    const hasSpecial    = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

    const errors: ValidationErrors = {};

    if (!hasMinLength)  errors['minLength']  = true;
    if (!hasUppercase)  errors['uppercase']  = true;
    if (!hasNumber)     errors['number']     = true;
    if (!hasSpecial)    errors['special']    = true;

    return Object.keys(errors).length > 0 ? errors : null;
  };
}

export function passwordMatchValidator(
  passwordKey: string,
  confirmKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirm  = group.get(confirmKey)?.value;

    if (!confirm) return null;

    return password === confirm ? null : { passwordMismatch: true };
  };
}

export function indianPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || '';

    if (!value) return null;

    const isValid = /^[6-9]\d{9}$/.test(value);
    return isValid ? null : { invalidPhone: true };
  };
}