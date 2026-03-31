import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ForecastDay, AppRoute, TempUnit } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';

@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './forecast-card.html',
  styleUrl: './forecast-card.css',
})
export class ForecastCardComponent {
  @Input() forecastDay!: ForecastDay;
  @Input() tempUnit: TempUnit = TempUnit.Celsius;
  @Input() city: string = '';

  readonly ui = UI;
  readonly appRoute = AppRoute;

  get maxTemp(): number {
    return this.tempUnit === TempUnit.Celsius
      ? this.forecastDay.day.maxtemp_c
      : Math.round((this.forecastDay.day.maxtemp_c * 9) / 5 + 32);
  }

  get minTemp(): number {
    return this.tempUnit === TempUnit.Celsius
      ? this.forecastDay.day.mintemp_c
      : Math.round((this.forecastDay.day.mintemp_c * 9) / 5 + 32);
  }

  get unitLabel(): string {
    return this.tempUnit === TempUnit.Celsius
      ? this.ui.celsius
      : this.ui.fahrenheit;
  }

  get dayName(): string {
    return new Date(this.forecastDay.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  get rainChanceClass(): string {
    const chance = this.forecastDay.day.daily_chance_of_rain;
    if (chance >= 70) return 'rain-high';
    if (chance >= 40) return 'rain-medium';
    return 'rain-low';
  }
}