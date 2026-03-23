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

  get priorityClass(): string {
    return `priority-${this.todo.priority}`;
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