import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage';
import { CityCardComponent } from '../../components/city-card/city-card';
import { FavoriteCity, AppRoute } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';
import { MESSAGES } from '../../constants/messages.constants';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CityCardComponent],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent {
  readonly ui = UI;
  readonly messages = MESSAGES;

  favorites: FavoriteCity[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {
    this.favorites = this.storageService.getFavorites();
  }

  onRemove(city: string): void {
    this.storageService.removeFromFavorites(city);
    this.favorites = this.storageService.getFavorites();
  }

  onViewWeather(city: string): void {
    this.router.navigate(['/', AppRoute.Weather, city]);
  }
}