import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';
import { LanguageService } from '../../core/services/language.service';
import { LangSwitcherComponent } from '../../shared/components/lang-switcher/lang-switcher.component';

interface NavLink {
  labelKey: string;
  sectionId: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LangSwitcherComponent],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  scrolled = signal(false);
  activeSection = signal('hero');
  menuOpen = signal(false);
  hoveredLink = signal<string | null>(null);
  cvHovered = signal(false);
  langBtnHovered = signal(false);

  readonly navLinks: NavLink[] = [
    { labelKey: 'nav.about', sectionId: 'about' },
    { labelKey: 'nav.stack', sectionId: 'stack' },
    { labelKey: 'nav.experience', sectionId: 'experience' },
    { labelKey: 'nav.projects', sectionId: 'projects' },
    { labelKey: 'Demos', sectionId: 'demos' },
    { labelKey: 'nav.skills', sectionId: 'skills' },
    { labelKey: 'nav.contact', sectionId: 'contact' },
  ];

  private readonly sectionIds = ['hero', 'about', 'stack', 'experience', 'projects', 'demos', 'skills', 'contact'];

  constructor(
    private scrollService: ScrollService,
    public langService: LanguageService
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
    this.activeSection.set(this.scrollService.getActiveSection(this.sectionIds));
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
  }

  toggleLang(): void {
    this.langService.toggle();
  }

  navigateTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
    this.menuOpen.set(false);
  }

  translate(key: string): string {
    return this.langService.get(key);
  }

  linkBg(sectionId: string): string {
    const isActive = this.activeSection() === sectionId;
    const isHovered = this.hoveredLink() === sectionId;

    if (isActive) return 'rgba(14,165,233,0.07)';
    if (isHovered) return 'rgba(255,255,255,0.04)';
    return 'transparent';
  }

  mobileLinkBg(sectionId: string): string {
    const isActive = this.activeSection() === sectionId;
    const isHovered = this.hoveredLink() === sectionId;

    if (isActive) return 'rgba(14,165,233,0.08)';
    if (isHovered) return 'rgba(255,255,255,0.04)';
    return 'transparent';
  }

  cvBorder(): string {
    return this.cvHovered()
      ? 'rgba(14,165,233,0.6)'
      : 'rgba(14,165,233,0.35)';
  }

  cvBg(): string {
    return this.cvHovered()
      ? 'rgba(14,165,233,0.12)'
      : 'rgba(14,165,233,0.04)';
  }

  cvShadow(): string {
    return this.cvHovered()
      ? '0 0 16px rgba(14,165,233,0.15)'
      : 'none';
  }
}