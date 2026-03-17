import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight = 'rgba(255, 255, 255, 0.08)';

  private originalBg = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.originalBg = this.el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.originalBg;
  }
}
