import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrength } from '../../models/user.model';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.css',
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password = '';

  strength: PasswordStrength = { score: 0, label: 'Weak', color: '#ef4444' };

  ngOnChanges(): void {
    this.strength = this.calculateStrength(this.password);
  }

  private calculateStrength(password: string): PasswordStrength {
    if (!password) return { score: 0, label: 'Weak', color: '#ef4444' };

    let score = 0;
    if (password.length >= 8)                                          score++;
    if (/[A-Z]/.test(password))                                        score++;
    if (/[0-9]/.test(password))                                        score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))      score++;

    const map: Record<number, PasswordStrength> = {
      0: { score: 0, label: 'Weak',        color: '#ef4444' },
      1: { score: 1, label: 'Weak',        color: '#ef4444' },
      2: { score: 2, label: 'Fair',        color: '#f59e0b' },
      3: { score: 3, label: 'Strong',      color: '#10b981' },
      4: { score: 4, label: 'Very Strong', color: '#6366f1' },
    };

    return map[score];
  }

  get widthPercent(): string {
    return `${(this.strength.score / 4) * 100}%`;
  }
}