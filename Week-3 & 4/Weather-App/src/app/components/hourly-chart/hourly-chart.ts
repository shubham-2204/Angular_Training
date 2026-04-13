import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyWeather, TempUnit } from '../../models/weather.models';
import { UI } from '../../constants/ui.constants';

@Component({
  selector: 'app-hourly-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly-chart.html',
  styleUrl: './hourly-chart.css',
})
export class HourlyChartComponent {
  @Input() hourlyData: HourlyWeather[] = [];
  @Input() tempUnit: TempUnit = TempUnit.Celsius;

  readonly ui = UI;

  getTemp(hour: HourlyWeather): number {
    return this.tempUnit === TempUnit.Celsius
      ? hour.temp_c
      : hour.temp_f;
  }

  get unitLabel(): string {
    return this.tempUnit === TempUnit.Celsius
      ? this.ui.celsius
      : this.ui.fahrenheit;
  }

  getFormattedTime(timeStr: string): string {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  getRainClass(chance: number): string {
    if (chance >= 70) return 'rain-high';
    if (chance >= 40) return 'rain-medium';
    return 'rain-low';
  }

  getBarHeightPercent(temp: number): number {
    const temps = this.hourlyData.map((h) => this.getTemp(h));
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    if (max === min) return 50;
    return Math.round(((temp - min) / (max - min)) * 70 + 15);
  }
}