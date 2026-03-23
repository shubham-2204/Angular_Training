import { Injectable } from '@angular/core';
import { Todo, FilterType, Priority } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private nextId = 1;

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string, priority: Priority, dueDate: Date): void {
    const todo: Todo = {
      id: this.nextId++,
      title: title.trim(),
      completed: false,
      priority,
      createdAt: new Date(),
      dueDate,
    };
    this.todos.unshift(todo);
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  getFilteredTodos(filter: FilterType): Todo[] {
    switch (filter) {
      case FilterType.Active:    
        return this.todos.filter((t) => !t.completed);
      case FilterType.Completed: 
        return this.todos.filter((t) => t.completed);
      default:                   
        return this.todos;
    }
  }

  getStats(): { all: number; active: number; completed: number } {
    return {
      all: this.todos.length,
      active: this.todos.filter((t) => !t.completed).length,
      completed: this.todos.filter((t) => t.completed).length,
    };
  }
}