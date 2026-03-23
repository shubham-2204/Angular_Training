import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordStrength,StrengthLabel } from '../../models/user.model';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.css',
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password = '';

  strength: PasswordStrength = { score: 0, label: StrengthLabel.Weak };

  ngOnChanges(): void {
    this.strength = this.calculateStrength(this.password);
  }

  private calculateStrength(password: string): PasswordStrength {
    if (!password) return { score: 0, label: StrengthLabel.Weak };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

    const map: Record<number, PasswordStrength> = {
      0: { score: 0, label: StrengthLabel.Weak },
      1: { score: 1, label: StrengthLabel.Weak },
      2: { score: 2, label: StrengthLabel.Fair },
      3: { score: 3, label: StrengthLabel.Strong },
      4: { score: 4, label: StrengthLabel.VeryStrong },
    };

    return map[score];
  }

  get widthPercent(): string {
    return `${(this.strength.score / 4) * 100}%`;
  }
}