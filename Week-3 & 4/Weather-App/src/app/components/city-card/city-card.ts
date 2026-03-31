import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './city-card.html',
  styleUrl: './city-card.css',
})
export class CityCardComponent {
  @Input() cityName!: string;
  @Input() countryName: string = '';
  @Input() timestamp: string = '';
  @Input() showRemove: boolean = false;
  @Input() showSearchAgain: boolean = false;

  @Output() removed = new EventEmitter<string>();
  @Output() searchAgain = new EventEmitter<string>();

  readonly ui = UI;
  readonly appRoute = AppRoute;

  get formattedTime(): string {
    if (!this.timestamp) return '';
    return new Date(this.timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  onRemove(): void {
    this.removed.emit(this.cityName);
  }

  onSearchAgain(): void {
    this.searchAgain.emit(this.cityName);
  }
}