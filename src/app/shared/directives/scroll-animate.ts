import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true,
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() animationClass = 'animate-fade-up';
  @Input() threshold = 0.15;

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.el.nativeElement.style.opacity = '0';
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.el.nativeElement.style.opacity = '';
            this.el.nativeElement.classList.add(this.animationClass);
            this.observer.unobserve(this.el.nativeElement);
          }
        });
      },
      { threshold: this.threshold },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void { this.observer?.disconnect(); }
}