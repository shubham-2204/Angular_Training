import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherService } from '../../services/weather';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { ForecastCardComponent } from '../../components/forecast-card/forecast-card';
import { HourlyChartComponent } from '../../components/hourly-chart/hourly-chart';
import { ForecastResponse, ForecastDay, HourlyWeather, WeatherState, TempUnit, AppRoute } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, ForecastCardComponent, HourlyChartComponent],
  templateUrl: './forecast.html',
  styleUrl: './forecast.css',
})
export class ForecastComponent implements OnInit, OnDestroy {
  readonly ui = UI;

  forecast: ForecastResponse | null = null;
  state: WeatherState = { isLoading: false, hasError: false, errorMessage: '' };
  tempUnit: TempUnit = TempUnit.Celsius;
  selectedDay: ForecastDay | null = null;
  city: string = '';

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const city = params.get('city');
        if (city) {
          this.city = city;
          this.loadForecast(city);
        }
      });
  }

  private loadForecast(city: string): void {
    this.state = this.weatherService.getLoadingState();
    this.forecast = null;

    this.weatherService.getForecast(city, 5)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.forecast = data;
          this.selectedDay = data.forecast.forecastday[0];
          this.state = this.weatherService.getInitialState();
        },
        error: (err) => {
          this.state = this.weatherService.getErrorState(err.message);
        },
      });
  }

  get selectedHourly(): HourlyWeather[] {
    return this.selectedDay?.hour ?? [];
  }

  selectDay(day: ForecastDay): void {
    this.selectedDay = day;
  }

  onCitySearched(city: string): void {
    this.router.navigate(['/', AppRoute.Forecast, city]);
  }

  onRetry(): void {
    if (this.city) this.loadForecast(this.city);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}