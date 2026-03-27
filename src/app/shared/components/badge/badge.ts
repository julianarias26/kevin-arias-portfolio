import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'default' | 'highlight' | 'mono';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="font-mono text-[11px] px-3 py-1.5 rounded-sm border"
          [class]="variantClass">
      {{ text }}
    </span>
  `,
})
export class BadgeComponent {
  @Input() text = '';
  @Input() variant: BadgeVariant = 'default';

  get variantClass(): string {
    const map: Record<BadgeVariant, string> = {
      default:   'border-surface-border text-slate-400 bg-transparent',
      highlight: 'border-primary/30 text-primary-light bg-primary/[0.04]',
      mono:      'border-surface-border text-slate-500 bg-surface',
    };
    return map[this.variant];
  }
}