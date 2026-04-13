import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherService } from '../../services/weather';
import { StorageService } from '../../services/storage';
import { FirebaseService } from '../../services/firebase';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { WeatherCardComponent } from '../../components/weather-card/weather-card';
import { WeatherResponse, WeatherState, TempUnit, AppRoute } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, WeatherCardComponent],
  templateUrl: './weather-dashboard.html',
  styleUrl: './weather-dashboard.css',
})
export class WeatherDashboardComponent implements OnInit, OnDestroy {
  readonly ui = UI;

  weather: WeatherResponse | null = null;
  state: WeatherState = { isLoading: false, hasError: false, errorMessage: '' };
  tempUnit: TempUnit = TempUnit.Celsius;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private weatherService: WeatherService,
    private storageService: StorageService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const city = params.get('city');
        if (city) this.loadWeather(city);
      });
  }

  private loadWeather(city: string): void {
    this.state = this.weatherService.getLoadingState();
    this.weather = null;

    this.weatherService.getCurrentWeather(city)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.weather = data;
          this.storageService.addToHistory(city);
          this.state = this.weatherService.getInitialState();

          this.firebaseService.saveWeatherData(city, data)
            .pipe(takeUntil(this.destroy$))
            .subscribe();

          this.firebaseService.incrementSearchCounter(city)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
        },
        error: (err) => {
          this.state = this.weatherService.getErrorState(err.message);
        },
      });
  }

  onCitySearched(city: string): void {
    this.router.navigate(['/', AppRoute.Weather, city]);
  }

  onUnitToggled(unit: TempUnit): void {
    this.tempUnit = unit;
  }

  onRetry(): void {
    const city = this.route.snapshot.paramMap.get('city');
    if (city) this.loadWeather(city);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}