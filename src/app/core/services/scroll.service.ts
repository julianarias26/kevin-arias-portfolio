import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollService {

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 72;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  getActiveSection(sectionIds: string[]): string {
    const scrollY = window.scrollY + 100;
    let active = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) active = id;
    }
    return active;
  }
}