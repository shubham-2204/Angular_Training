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
  @Input() currentFilter: FilterType = FilterType.All;  
  @Input() stats = { all: 0, active: 0, completed: 0 };

  @Output() filterChanged = new EventEmitter<FilterType>();

  FilterType = FilterType;  

  filters: { value: FilterType; label: string; icon: string }[] = [
    { value: FilterType.All,       label: 'All',    icon: '📋' },  
    { value: FilterType.Active,    label: 'Active', icon: '🔥' },  
    { value: FilterType.Completed, label: 'Done',   icon: '✅' },  
  ];

  setFilter(filter: FilterType): void {
    this.filterChanged.emit(filter);
  }

  getCount(filter: FilterType): number {
    return this.stats[filter];  
  }
}