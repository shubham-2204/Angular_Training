import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterLink  } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherService } from '../../services/weather';
import { StorageService } from '../../services/storage';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { CityCardComponent } from '../../components/city-card/city-card';
import { FavoriteCity, SearchHistoryItem, AppRoute, WeatherState } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink, SearchBarComponent, CityCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnDestroy {
  readonly ui = UI;
  readonly appRoute = AppRoute;

  favorites: FavoriteCity[] = [];
  recentHistory: SearchHistoryItem[] = [];
  state: WeatherState = { isLoading: false, hasError: false, errorMessage: '' };

  private destroy$ = new Subject<void>();

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.loadData();
  }

  private loadData(): void {
    this.favorites = this.storageService.getFavorites();
    this.recentHistory = this.storageService.getHistory().slice(0, 5);
  }

  onCitySearched(city: string): void {
    this.state = this.weatherService.getLoadingState();

    this.weatherService.getCurrentWeather(city)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.storageService.addToHistory(city);
          this.state = this.weatherService.getInitialState();
          this.router.navigate(['/', AppRoute.Weather, data.location.name]);
        },
        error: (err) => {
          this.state = this.weatherService.getErrorState(err.message);
        },
      });
  }

  onFavoriteRemoved(city: string): void {
    this.storageService.removeFromFavorites(city);
    this.favorites = this.storageService.getFavorites();
  }

  onSearchAgain(city: string): void {
    this.onCitySearched(city);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}