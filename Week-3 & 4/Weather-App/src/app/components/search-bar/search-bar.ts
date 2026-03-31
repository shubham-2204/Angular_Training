import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UI } from '../../constants/ui.constants';
import { MESSAGES } from '../../constants/messages.constants';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBarComponent {
  readonly ui = UI;
  readonly messages = MESSAGES;

  query = '';
  validationError = '';

  @Output() citySearched = new EventEmitter<string>();

  onSearch(): void {
    const trimmed = this.query.trim();

    if (!trimmed) {
      this.validationError = this.messages.validation.emptyCityName;
      return;
    }

    if (trimmed.length < 2) {
      this.validationError = this.messages.validation.invalidCityName;
      return;
    }

    this.validationError = '';
    this.citySearched.emit(trimmed);
  }

  onClear(): void {
    this.query = '';
    this.validationError = '';
  }
}