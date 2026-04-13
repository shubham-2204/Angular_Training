import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabId } from './models/dashboard.models';
import { NotificationService } from './services/notification.service';
import { DashboardTabsComponent } from './components/dashboard-tabs/dashboard-tabs.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LiveSearchComponent } from './components/live-search/live-search.component';
import { ExamResultsComponent } from './components/exam-results/exam-results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTabsComponent,
    StudentProfileComponent,
    CoursesListComponent,
    NotificationsComponent,
    LiveSearchComponent,
    ExamResultsComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit, OnDestroy {
  activeTab: TabId = TabId.Profile;
  unreadCount = 0;
  today = new Date();
  tabId = TabId;

  private destroy$ = new Subject<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.unreadCount = this.notificationService.unreadCount;
      });
  }

  onTabChanged(tab: TabId): void {
    this.activeTab = tab;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}