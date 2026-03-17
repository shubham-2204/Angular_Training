import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterType } from '../../models/todo.model';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.css',
})
export class TodoFilterComponent {
  @Input() currentFilter: FilterType = 'all';
  @Input() stats = { total: 0, active: 0, completed: 0 };

  @Output() filterChanged = new EventEmitter<FilterType>();

  filters: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: '📋' },
    { value: 'active', label: 'Active', icon: '🔥' },
    { value: 'completed', label: 'Done', icon: '✅' },
  ];

  setFilter(filter: FilterType): void {
    this.filterChanged.emit(filter);
  }

  getCount(filter: FilterType): number {
    switch (filter) {
      case 'all':
        return this.stats.total;
      case 'active':
        return this.stats.active;
      case 'completed':
        return this.stats.completed;
    }
  }
}
