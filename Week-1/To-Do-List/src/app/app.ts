import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';
import { Todo, FilterType } from './models/todo.model';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TodoInputComponent,
    TodoFilterComponent,
    TodoListComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  currentFilter: FilterType = 'all';

  constructor(private todoService: TodoService) {}

  get filteredTodos(): Todo[] {
    return this.todoService.getFilteredTodos(this.currentFilter);
  }

  get stats() {
    return this.todoService.getStats();
  }

  onTodoAdded(event: { title: string; priority: 'low' | 'medium' | 'high'; dueDate: Date }): void {
  this.todoService.addTodo(event.title, event.priority, event.dueDate);
}

  onFilterChanged(filter: FilterType): void {
    this.currentFilter = filter;
  }

  onToggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  onDeleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
