import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css',
})
export class TodoInputComponent {
  newTodoTitle = '';
  selectedPriority: 'low' | 'medium' | 'high' = 'medium';
  selectedDate = '';
  readonly maxLength = 10;

  
  get todayStr(): string {
    return new Date().toISOString().split('T')[0];
  }

  get charCount(): number {
    return this.newTodoTitle.length;
  }

  get isOverLimit(): boolean {
    return this.charCount > this.maxLength;
  }

  get isDateInvalid(): boolean {
    if (!this.selectedDate) return false;
    return this.selectedDate < this.todayStr;
  }

  @Output() todoAdded = new EventEmitter<{
    title: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: Date;
  }>();

  addTodo(): void {
    if (
      this.newTodoTitle.trim() &&
      !this.isOverLimit &&
      this.selectedDate &&
      !this.isDateInvalid
    ) {
      this.todoAdded.emit({
        title: this.newTodoTitle.trim(),
        priority: this.selectedPriority,
        dueDate: new Date(this.selectedDate),
      });
      this.newTodoTitle = '';
      this.selectedPriority = 'medium';
      this.selectedDate = '';
    }
  }
}