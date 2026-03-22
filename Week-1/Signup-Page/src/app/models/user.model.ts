export interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordStrength {
  score: number;      
  label: 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  color: string;
}