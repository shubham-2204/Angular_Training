import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UI } from '../../constants/ui.constants';
import { AppRoute } from '../../models/weather.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  readonly ui = UI;
  readonly appRoute = AppRoute;
}