import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight = 'app-highlight';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.el.nativeElement.classList.add('app-highlight');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.el.nativeElement.classList.remove('app-highlight');
  }
}