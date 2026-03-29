import { Component, Input, signal } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lang-switcher.component.html',
})
export class LangSwitcherComponent {
  // 'desktop' → versión compacta con tooltip
  // 'mobile'  → versión expandida para el menú móvil
  @Input() variant: 'desktop' | 'mobile' = 'desktop';

  hovered = signal(false);

  constructor(public langService: LanguageService) {}

  toggle(): void { this.langService.toggle(); }
}