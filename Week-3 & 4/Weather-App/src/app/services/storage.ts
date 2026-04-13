import { Injectable } from '@angular/core';
import { FavoriteCity, SearchHistoryItem } from '../models/weather.models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly HISTORY_KEY = 'weather_search_history';
  private readonly FAVORITES_KEY = 'weather_favorites';
  private readonly MAX_HISTORY = 10;

  getHistory(): SearchHistoryItem[] {
    const data = localStorage.getItem(this.HISTORY_KEY);
    return JSON.parse(data ?? '[]');
  }

  addToHistory(city: string): void {
    const history = this.getHistory().filter(
      (h) => h.city.toLowerCase() !== city.toLowerCase()
    );
    history.unshift({ city, searchedAt: new Date().toISOString() });
    if (history.length > this.MAX_HISTORY) history.pop();
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }

  removeFromHistory(city: string): void {
    const updated = this.getHistory().filter(
      (h) => h.city.toLowerCase() !== city.toLowerCase()
    );
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updated));
  }

  clearHistory(): void {
    localStorage.removeItem(this.HISTORY_KEY);
  }

  getFavorites(): FavoriteCity[] {
    const data = localStorage.getItem(this.FAVORITES_KEY);
    return JSON.parse(data ?? '[]');
  }

  addToFavorites(city: string, country: string): void {
    const favorites = this.getFavorites();
    const exists = favorites.some(
      (f) => f.name.toLowerCase() === city.toLowerCase()
    );
    if (!exists) {
      favorites.unshift({ name: city, country, addedAt: new Date().toISOString() });
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(city: string): void {
    const updated = this.getFavorites().filter(
      (f) => f.name.toLowerCase() !== city.toLowerCase()
    );
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(updated));
  }

  isFavorite(city: string): boolean {
    return this.getFavorites().some(
      (f) => f.name.toLowerCase() === city.toLowerCase()
    );
  }

  clearFavorites(): void {
    localStorage.removeItem(this.FAVORITES_KEY);
  }
}