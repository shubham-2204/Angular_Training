import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UI } from '../../constants/ui.constants';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFoundComponent {
  readonly ui = UI;
}