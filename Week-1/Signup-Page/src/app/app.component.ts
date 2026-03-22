import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SuccessCardComponent } from './components/success-card/success-card.component';
import { SignupFormData } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SignupFormComponent, SuccessCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoading   = false;
  isSubmitted = false;
  userData: SignupFormData | null = null;

  onFormSubmitted(data: SignupFormData): void {
    this.isLoading = true;

    // Simulate async API call
    setTimeout(() => {
      this.isLoading   = false;
      this.isSubmitted = true;
      this.userData    = data;
    }, 2000);
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.userData    = null;
  }
}