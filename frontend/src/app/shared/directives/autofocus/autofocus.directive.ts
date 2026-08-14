import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: false,
})
export class AutofocusDirective implements AfterViewInit {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.elementRef.nativeElement.focus());
  }
}
