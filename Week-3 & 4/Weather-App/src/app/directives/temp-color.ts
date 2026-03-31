import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTempColor]',
  standalone: true,
})
export class TempColorDirective implements OnChanges {
  @Input() appTempColor: number = 0;

  private readonly tempClasses = ['temp-freezing', 'temp-cold', 'temp-mild', 'temp-warm', 'temp-hot'];

  private readonly tempClassMap: { max: number; cls: string }[] = [
    { max: 0,  cls: 'temp-freezing' },
    { max: 10, cls: 'temp-cold' },
    { max: 20, cls: 'temp-mild' },
    { max: 30, cls: 'temp-warm' },
    { max: Infinity, cls: 'temp-hot' },
  ];

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appTempColor']) {
      this.applyClass();
    }
  }

  private applyClass(): void {
    const el = this.el.nativeElement;

    this.tempClasses.forEach((cls) => el.classList.remove(cls));

    const match = this.tempClassMap.find((entry) => this.appTempColor <= entry.max);
    const cls = match?.cls ?? 'temp-hot';
    el.classList.add(cls);
  }
}