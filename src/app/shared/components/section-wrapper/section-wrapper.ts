import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mb-16">
      <p class="section-label">{{ index }} / {{ labelText }}</p>
      <h2 class="section-title">
        {{ title }} <span class="text-surface-muted">{{ subtitle }}</span>
      </h2>
    </div>
    <ng-content />
  `,
})
export class SectionWrapperComponent {
  @Input() index  = '01';
  @Input() labelText = '';
  @Input() title  = '';
  @Input() subtitle = '';
}