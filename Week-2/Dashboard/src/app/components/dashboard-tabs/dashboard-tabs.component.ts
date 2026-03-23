import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab, TabId } from '../../models/dashboard.models';

@Component({
  selector: 'app-dashboard-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-tabs.html',
  styleUrl: './dashboard-tabs.css',
})
export class DashboardTabsComponent {
  @Input() activeTab: TabId = TabId.Profile;
  @Input() unreadCount = 0;

  @Output() tabChanged = new EventEmitter<TabId>();

  tabId = TabId;
  
  tabs: Tab[] = [
  { id: TabId.Profile, label: 'Profile', icon: 'person' },
  { id: TabId.Courses, label: 'Courses', icon: 'book' },
  { id: TabId.Notifications, label: 'Notifications', icon: 'bell' },
  { id: TabId.Search, label: 'Live Search', icon: 'search' },
  { id: TabId.Results, label: 'Exam Results', icon: 'chart' },
];

  selectTab(tabId: TabId): void {
    this.tabChanged.emit(tabId);
  }
}
