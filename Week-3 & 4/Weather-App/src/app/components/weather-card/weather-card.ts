import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherBgDirective } from '../../directives/weather-bg';
import { TempColorDirective } from '../../directives/temp-color';
import { WeatherResponse, AppRoute, TempUnit } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, RouterLink, WeatherBgDirective, TempColorDirective],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCardComponent {
  @Input() weather!: WeatherResponse;
  @Input() tempUnit: TempUnit = TempUnit.Celsius;
  @Output() unitToggled = new EventEmitter<TempUnit>();

  readonly ui = UI;
  readonly appRoute = AppRoute;
  readonly tempUnitEnum = TempUnit;

  constructor(private storageService: StorageService) {}

  get temperature(): number {
    return this.tempUnit === TempUnit.Celsius
      ? this.weather.current.temp_c
      : this.weather.current.temp_f;
  }

  get feelsLike(): number {
    return this.tempUnit === TempUnit.Celsius
      ? this.weather.current.feelslike_c
      : this.weather.current.feelslike_f;
  }

  get unitLabel(): string {
    return this.tempUnit === TempUnit.Celsius
      ? this.ui.celsius
      : this.ui.fahrenheit;
  }

  get isFavorite(): boolean {
    return this.storageService.isFavorite(this.weather.location.name);
  }

  get conditionClass(): string {
    return this.weather.current.condition.text
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  toggleUnit(): void {
    const next =
      this.tempUnit === TempUnit.Celsius ? TempUnit.Fahrenheit : TempUnit.Celsius;
    this.unitToggled.emit(next);
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.storageService.removeFromFavorites(this.weather.location.name);
    } else {
      this.storageService.addToFavorites(
        this.weather.location.name,
        this.weather.location.country
      );
    }
  }
}