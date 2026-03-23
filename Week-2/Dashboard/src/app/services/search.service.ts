import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SearchItem, LoadingState } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private dataUrl = 'assets/data/search-data.json';

  private allItems: SearchItem[] = [];

  private searchResults = new BehaviorSubject<SearchItem[]>([]);
  searchResults$ = this.searchResults.asObservable();

  private loadingState = new BehaviorSubject<LoadingState>({
    isLoading: false,
    hasError: false,
    errorMessage: '',
  });
  loadingState$ = this.loadingState.asObservable();

  private searchQuery = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.loadSearchData();
    this.setupSearchPipeline();
  }

  private loadSearchData(): void {
    this.http.get<SearchItem[]>(this.dataUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to load search data.'));
      })
    ).subscribe({
      next: (items) => (this.allItems = items),
      error: () => {
        this.loadingState.next({
          isLoading: false,
          hasError: true,
          errorMessage: 'Search data could not be loaded.',
        });
      },
    });
  }

  private setupSearchPipeline(): void {
    this.searchQuery.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query.trim()) {
          return of([]);
        }

        this.loadingState.next({ isLoading: true, hasError: false, errorMessage: '' });

        return of(this.allItems).pipe(
          delay(400),
          map((items) =>
            items.filter(
              (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
            )
          )
        );
      }),
      catchError((error) => {
        this.loadingState.next({
          isLoading: false,
          hasError: true,
          errorMessage: 'Search failed. Please try again.',
        });
        return of([]);
      })
    ).subscribe({
      next: (results) => {
        this.searchResults.next(results);
        this.loadingState.next({ isLoading: false, hasError: false, errorMessage: '' });
      },
    });
  }

  search(query: string): void {
    this.searchQuery.next(query);
  }

  clearSearch(): void {
    this.searchQuery.next('');
    this.searchResults.next([]);
  }
}