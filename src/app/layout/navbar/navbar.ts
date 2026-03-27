import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';

interface NavLink {
  label: string;
  sectionId: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  scrolled      = signal(false);
  activeSection = signal('hero');
  menuOpen      = signal(false);
  hoveredLink   = signal<string | null>(null);  // ← link con hover activo
  cvHovered     = signal(false);                // ← hover del botón CV

  readonly navLinks: NavLink[] = [
    { label: 'About',      sectionId: 'about'      },
    { label: 'Stack',      sectionId: 'stack'       },
    { label: 'Experience', sectionId: 'experience'  },
    { label: 'Projects',   sectionId: 'projects'    },
    { label: 'Skills',     sectionId: 'skills'      },
    { label: 'Contact',    sectionId: 'contact'     },
  ];

  private readonly sectionIds = [
    'hero', 'about', 'stack', 'experience', 'projects', 'skills', 'contact',
  ];

  constructor(private scrollService: ScrollService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
    this.activeSection.set(this.scrollService.getActiveSection(this.sectionIds));
  }

  toggleMenu(): void { this.menuOpen.set(!this.menuOpen()); }

  navigateTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
    this.menuOpen.set(false);
  }

  // ── Helpers de estilo computado ────────────────────────────────

  linkBg(sectionId: string): string {
    const isActive  = this.activeSection() === sectionId;
    const isHovered = this.hoveredLink()   === sectionId;
    if (isActive)  return 'rgba(14,165,233,0.07)';
    if (isHovered) return 'rgba(255,255,255,0.04)';
    return 'transparent';
  }

  mobileLinkBg(sectionId: string): string {
    const isActive  = this.activeSection() === sectionId;
    const isHovered = this.hoveredLink()   === sectionId;
    if (isActive)  return 'rgba(14,165,233,0.08)';
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