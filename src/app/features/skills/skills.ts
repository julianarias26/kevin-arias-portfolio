import {
  Component, OnInit, AfterViewInit,
  ViewChildren, QueryList, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SkillCategory }        from '../../core/models/skill.model';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './skills.html',
})
export class SkillsComponent implements OnInit, AfterViewInit {
  categories: SkillCategory[] = [];

  @ViewChildren('barFill') barFills!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.dataService.getSkills().subscribe(data => this.categories = data);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setupBars(), 50);
    this.barFills.changes.subscribe(() => setTimeout(() => this.setupBars(), 50));
  }

  private setupBars(): void {
    const bars = this.barFills.toArray();
    if (bars.length === 0) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target as HTMLDivElement;
        const pct   = el.getAttribute('data-pct')   ?? '0';
        const delay = el.getAttribute('data-delay')  ?? '0s';

        if (entry.isIntersecting) {
          // Entra al viewport → desactiva transición, resetea a 0,
          // fuerza reflow, reactiva transición y anima al valor real
          el.style.transition = 'none';
          el.style.width      = '0%';

          void el.offsetHeight; // fuerza reflow

          requestAnimationFrame(() => {
            el.style.transition      = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.transitionDelay = delay;
            el.style.width           = pct + '%';
          });

        } else {
          // Sale del viewport → resetea instantáneamente sin animación
          el.style.transition      = 'none';
          el.style.transitionDelay = '0s';
          el.style.width           = '0%';
        }
      });
    }, { threshold: 0.1 });

    // NO usamos unobserve — el observer queda activo siempre
    bars.forEach(b => observer.observe(b.nativeElement));
  }

  levelClass(level: string): string {
    const map: Record<string, string> = {
      Expert:       'text-primary bg-primary/10 border-primary/20',
      Advanced:     'text-violet-400 bg-violet-400/10 border-violet-400/20',
      Intermediate: 'text-slate-500 bg-surface-card border-surface-border',
    };
    return map[level] ?? map['Intermediate'];
  }

  barDelay(catIndex: number, skillIndex: number): string {
    return `${(catIndex * 0.05) + (skillIndex * 0.1)}s`;
  }
}