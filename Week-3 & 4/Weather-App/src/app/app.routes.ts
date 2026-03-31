import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'weather/:city',
    loadComponent: () =>
      import('./pages/weather-dashboard/weather-dashboard').then(
        (m) => m.WeatherDashboardComponent
      ),
  },
  {
    path: 'forecast/:city',
    loadComponent: () =>
      import('./pages/forecast/forecast').then((m) => m.ForecastComponent),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./pages/search-history/search-history').then(
        (m) => m.SearchHistoryComponent
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites').then((m) => m.FavoritesComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];