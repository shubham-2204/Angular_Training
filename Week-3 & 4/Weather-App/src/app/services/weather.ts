import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WeatherResponse, ForecastResponse, WeatherState, WeatherLocation } from '../models/weather.models';
import { MESSAGES } from '../constants/messages.constants';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly baseUrl = environment.weatherApiBaseUrl;
  private readonly apiKey = environment.weatherApiKey;

  constructor(private http: HttpClient) {}

  private buildParams(city: string, extra: Record<string, string> = {}): HttpParams {
    let params = new HttpParams()
      .set('key', this.apiKey)
      .set('q', city)
      .set('aqi', 'no');

    Object.entries(extra).forEach(([k, v]) => {
      params = params.set(k, v);
    });

    return params;
  }

  getCurrentWeather(city: string): Observable<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(`${this.baseUrl}/current.json`, {
        params: this.buildParams(city),
      })
      .pipe(
        catchError((error) => {
          const msg = error.error?.error?.message ?? MESSAGES.errors.fetchWeather;
          return throwError(() => new Error(msg));
        })
      );
  }

  getForecast(city: string, days = 5): Observable<ForecastResponse> {
    return this.http
      .get<ForecastResponse>(`${this.baseUrl}/forecast.json`, {
        params: this.buildParams(city, { days: days.toString() }),
      })
      .pipe(
        catchError((error) => {
          const msg = error.error?.error?.message ?? MESSAGES.errors.fetchForecast;
          return throwError(() => new Error(msg));
        })
      );
  }

  searchCities(query: string): Observable<WeatherLocation[]> {
    return this.http
      .get<WeatherLocation[]>(`${this.baseUrl}/search.json`, {
        params: new HttpParams()
          .set('key', this.apiKey)
          .set('q', query),
      })
      .pipe(
        catchError(() => throwError(() => new Error(MESSAGES.errors.generic)))
      );
  }

  getInitialState(): WeatherState {
    return { isLoading: false, hasError: false, errorMessage: '' };
  }

  getLoadingState(): WeatherState {
    return { isLoading: true, hasError: false, errorMessage: '' };
  }

  getErrorState(message: string): WeatherState {
    return { isLoading: false, hasError: true, errorMessage: message };
  }
}