import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherCondition } from '../models/weather.models';

@Directive({
  selector: '[appWeatherBg]',
  standalone: true,
})
export class WeatherBgDirective implements OnChanges {
  @Input() appWeatherBg: string = WeatherCondition.Default;
  @Input() isDay: number = 1;

  private readonly conditionClassMap: Record<string, string> = {
    [WeatherCondition.Sunny]: 'bg-sunny',
    [WeatherCondition.Clear]: 'bg-clear',
    [WeatherCondition.PartlyCloudy]: 'bg-partly-cloudy',
    [WeatherCondition.Cloudy]: 'bg-cloudy',
    [WeatherCondition.Overcast]: 'bg-overcast',
    [WeatherCondition.Rainy]: 'bg-rainy',
    [WeatherCondition.Stormy]: 'bg-stormy',
    [WeatherCondition.Snowy]: 'bg-snowy',
    [WeatherCondition.Foggy]: 'bg-foggy',
    [WeatherCondition.Night]: 'bg-night',
    [WeatherCondition.Default]: 'bg-default',
  };

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appWeatherBg'] || changes['isDay']) {
      this.applyClass();
    }
  }

  private applyClass(): void {
    const el = this.el.nativeElement;

    Object.values(this.conditionClassMap).forEach((cls) => {
      el.classList.remove(cls);
    });

    if (!this.isDay) {
      el.classList.add('bg-night');
      return;
    }

    const cls = this.conditionClassMap[this.appWeatherBg] ?? 'bg-default';
    el.classList.add(cls);
  }
}