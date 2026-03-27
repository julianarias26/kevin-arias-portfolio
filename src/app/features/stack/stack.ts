import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { TechItem } from '../../core/models/tech-stack.model';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';

type Category = 'All' | 'Language' | 'Framework' | 'Database' | 'Cloud' | 'DevOps' | 'Tools';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './stack.html',
})
export class StackComponent {
  readonly categories: Category[] = ['All', 'Language', 'Framework', 'Database', 'Cloud', 'DevOps', 'Tools'];
  activeCategory = signal<Category>('All');

  private allItems: TechItem[] = [];

  constructor(private dataService: PortfolioDataService) {
    this.dataService.getTechStack().subscribe(items => this.allItems = items);
  }

  get filteredItems(): TechItem[] {
    const cat = this.activeCategory();
    return cat === 'All' ? this.allItems : this.allItems.filter(i => i.category === cat);
  }

  setCategory(cat: Category): void { this.activeCategory.set(cat); }
}