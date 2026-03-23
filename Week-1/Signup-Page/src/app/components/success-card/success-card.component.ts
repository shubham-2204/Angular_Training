import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormData } from '../../models/user.model';

@Component({
  selector: 'app-success-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-card.component.html',
  styleUrl: './success-card.component.css',
})
export class SuccessCardComponent {
  @Input() userData!: SignupFormData;
}