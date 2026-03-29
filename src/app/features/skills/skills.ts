import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SkillCategory } from '../../core/models/skill.model';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './skills.html',
})
export class SkillsComponent implements OnInit, AfterViewInit {
  categories: SkillCategory[] = [];

  @ViewChildren('barFill') barFills!: QueryList<ElementRef<HTMLDivElement>>;

  constructor(
    private dataService: PortfolioDataService,
    public lang: LanguageService,
  ) {}

  ngOnInit(): void {
    this.dataService.getSkills().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.categories = [];
      },
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setupBars(), 50);
    this.barFills.changes.subscribe(() => setTimeout(() => this.setupBars(), 50));
  }

  private setupBars(): void {
    const bars = this.barFills.toArray();
    if (bars.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLDivElement;
          const pct = el.getAttribute('data-pct') ?? '0';
          const delay = el.getAttribute('data-delay') ?? '0s';

          if (entry.isIntersecting) {
            el.style.transition = 'none';
            el.style.width = '0%';

            void el.offsetHeight;

            requestAnimationFrame(() => {
              el.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
              el.style.transitionDelay = delay;
              el.style.width = pct + '%';
            });
          } else {
            el.style.transition = 'none';
            el.style.transitionDelay = '0s';
            el.style.width = '0%';
          }
        });
      },
      { threshold: 0.1 },
    );

    bars.forEach((b) => observer.observe(b.nativeElement));
  }

  translateCategory(category: string): string {
    const key = `skills.category.${this.toTranslationKey(category)}`;
    const translated = this.lang.get(key);
    return translated === key ? category : translated;
  }

  translateSkill(name: string): string {
    const key = `skills.item.${this.toTranslationKey(name)}`;
    const translated = this.lang.get(key);
    return translated === key ? name : translated;
  }

  translateLevel(level: string): string {
    const key = `skills.level.${level.toLowerCase()}`;
    const translated = this.lang.get(key);
    return translated === key ? level : translated;
  }

  levelClass(level: string): string {
    const map: Record<string, string> = {
      Expert: 'text-primary bg-primary/10 border-primary/20',
      Advanced: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
      Intermediate: 'text-slate-500 bg-surface-card border-surface-border',
    };
    return map[level] ?? map['Intermediate'];
  }

  barDelay(catIndex: number, skillIndex: number): string {
    return `${catIndex * 0.05 + skillIndex * 0.1}s`;
  }

  private toTranslationKey(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/c#/g, 'csharp')
      .replace(/asp\.net/g, 'aspnet')
      .replace(/\.net/g, 'dotnet')
      .replace(/&/g, ' ')
      .replace(/\//g, ' ')
      .replace(/\+/g, ' plus ')
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }
}
