import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];

  @Output() toggleTodo = new EventEmitter<number>();
  @Output() deleteTodo = new EventEmitter<number>();

  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }

  onToggle(id: number): void {
    this.toggleTodo.emit(id);
  }

  onDelete(id: number): void {
    this.deleteTodo.emit(id);
  }
}
