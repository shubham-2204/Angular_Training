import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage';
import { CityCardComponent } from '../../components/city-card/city-card';
import { SearchHistoryItem, AppRoute } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';
import { MESSAGES } from '../../constants/messages.constants';

@Component({
  selector: 'app-search-history',
  standalone: true,
  imports: [CommonModule, CityCardComponent],
  templateUrl: './search-history.html',
  styleUrl: './search-history.css',
})
export class SearchHistoryComponent {
  readonly ui = UI;
  readonly messages = MESSAGES;

  history: SearchHistoryItem[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {
    this.history = this.storageService.getHistory();
  }

  onSearchAgain(city: string): void {
    this.storageService.addToHistory(city);
    this.router.navigate(['/', AppRoute.Weather, city]);
  }

  onRemove(city: string): void {
    this.storageService.removeFromHistory(city);
    this.history = this.storageService.getHistory();
  }

  onClearAll(): void {
    this.storageService.clearHistory();
    this.history = [];
  }
}