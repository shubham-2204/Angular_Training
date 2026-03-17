import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  get priorityColor(): string {
    switch (this.todo.priority) {
      case 'low':    return '#34d399';
      case 'medium': return '#fbbf24';
      case 'high':   return '#f87171';
    }
  }

  get priorityGlow(): string {
    switch (this.todo.priority) {
      case 'low':    return 'rgba(52, 211, 153, 0.3)';
      case 'medium': return 'rgba(251, 191, 36, 0.3)';
      case 'high':   return 'rgba(248, 113, 113, 0.3)';
    }
  }


  private get todayStart(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private get dueDateStart(): Date {
    const d = new Date(this.todo.dueDate);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  get isDueToday(): boolean {
    return this.dueDateStart.getTime() === this.todayStart.getTime();
  }

  get isDueOverdue(): boolean {
    return this.dueDateStart.getTime() < this.todayStart.getTime();
  }

  onToggle(): void {
    this.toggle.emit(this.todo.id);
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }
}