import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Notification, LoadingState } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private dataUrl = 'assets/data/notifications.json';

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private loadingState = new BehaviorSubject<LoadingState>({
    isLoading: false,
    hasError: false,
    errorMessage: '',
  });
  loadingState$ = this.loadingState.asObservable();

  constructor(private http: HttpClient) {}

  loadNotifications(): void {
    this.loadingState.next({ isLoading: true, hasError: false, errorMessage: '' });

    this.http.get<Notification[]>(this.dataUrl).pipe(
      delay(700),
      tap((notifications) => {
        this.notificationsSubject.next(notifications);
        this.loadingState.next({ isLoading: false, hasError: false, errorMessage: '' });
      }),
      catchError((error) => {
        this.loadingState.next({
          isLoading: false,
          hasError: true,
          errorMessage: 'Failed to load notifications. Please try again.',
        });
        return throwError(() => new Error('Failed to load notifications.'));
      })
    ).subscribe();
  }

  markAsRead(id: number): void {
    const current = this.notificationsSubject.getValue();
    const updated = current.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    this.notificationsSubject.next(updated);
  }

  markAllAsRead(): void {
    const current = this.notificationsSubject.getValue();
    const updated = current.map((n) => ({ ...n, isRead: true }));
    this.notificationsSubject.next(updated);
  }

  get unreadCount(): number {
    return this.notificationsSubject.getValue().filter((n) => !n.isRead).length;
  }
}