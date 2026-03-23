export enum StrengthLabel {
  Weak = 'Weak',
  Fair = 'Fair',
  Strong = 'Strong',
  VeryStrong = 'Very Strong',
}

export interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordStrength {
  score: number;      
  label: StrengthLabel;
}