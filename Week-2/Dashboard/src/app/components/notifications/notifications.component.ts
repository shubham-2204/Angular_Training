import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
import { Notification, LoadingState, NotificationType } from '../../models/dashboard.models';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  state: LoadingState = { isLoading: false, hasError: false, errorMessage: '' };

  private destroy$ = new Subject<void>();

  constructor(public notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.loadingState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => (this.state = state));

    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notifications) => (this.notifications = notifications));

    this.notificationService.loadNotifications();
  }

  private typeClassMap: Record<string, string> = {
    [NotificationType.Success]: 'type-success',
    [NotificationType.Warning]: 'type-warning',
    [NotificationType.Error]: 'type-error',
    [NotificationType.Info]: 'type-info',
  };

  getTypeClass(type: string): string {
    return this.typeClassMap[type] ?? 'type-default';
  }

  formatTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);

    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}