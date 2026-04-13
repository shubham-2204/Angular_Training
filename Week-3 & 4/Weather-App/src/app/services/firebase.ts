import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, ref, set, get, increment, runTransaction, Database } from 'firebase/database';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WeatherResponse } from '../models/weather.models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly db: Database;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
  }

  saveWeatherData(city: string, data: WeatherResponse): Observable<void> {
    const weatherRef = ref(this.db, `weather/${city.toLowerCase()}`);
    return from(set(weatherRef, {
      city: data.location.name,
      country: data.location.country,
      temp_c: data.current.temp_c,
      condition: data.current.condition.text,
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph,
      savedAt: new Date().toISOString(),
    })).pipe(
      catchError(() => throwError(() => new Error('Failed to save weather data.')))
    );
  }

  incrementSearchCounter(city: string): Observable<void> {
    const counterRef = ref(this.db, `counters/${city.toLowerCase()}`);
    return from(runTransaction(counterRef, (current) => {
      return (current ?? 0) + 1;
    })).pipe(
      map(() => void 0),
      catchError(() => throwError(() => new Error('Failed to update counter.')))
    );
  }

  getSearchCounter(city: string): Observable<number> {
    const counterRef = ref(this.db, `counters/${city.toLowerCase()}`);
    return from(get(counterRef)).pipe(
      map((snapshot) => snapshot.exists() ? snapshot.val() : 0),
      catchError(() => throwError(() => new Error('Failed to get counter.')))
    );
  }

  getTotalSearchCount(): Observable<number> {
    const countersRef = ref(this.db, 'counters');
    return from(get(countersRef)).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) return 0;
        const data = snapshot.val();
        return Object.values(data).reduce((sum: number, val) => sum + (val as number), 0);
      }),
      catchError(() => throwError(() => new Error('Failed to get total count.')))
    );
  }
}