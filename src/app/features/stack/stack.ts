import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { TechItem } from '../../core/models/tech-stack.model';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';
import { LanguageService } from '../../core/services/language.service';

type TechCategory = 'Language' | 'Framework' | 'Database' | 'Cloud' | 'DevOps' | 'Tools';
type CategoryValue = 'All' | TechCategory;

interface CategoryOption {
  value: CategoryValue;
  label: string;
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './stack.html',
})
export class StackComponent {
  activeCategory = signal<CategoryValue>('All');
  private allItems: TechItem[] = [];

  constructor(
    private dataService: PortfolioDataService,
    public lang: LanguageService
  ) {
    this.dataService.getTechStack().subscribe(items => {
      this.allItems = items;
    });
  }

  get categories(): CategoryOption[] {
    return [
      { value: 'All',       label: this.lang.get('stack.filter.all') },
      { value: 'Language',  label: this.lang.get('stack.filter.language') },
      { value: 'Framework', label: this.lang.get('stack.filter.framework') },
      { value: 'Database',  label: this.lang.get('stack.filter.database') },
      { value: 'Cloud',     label: this.lang.get('stack.filter.cloud') },
      { value: 'DevOps',    label: this.lang.get('stack.filter.devops') },
      { value: 'Tools',     label: this.lang.get('stack.filter.tools') },
    ];
  }

  get filteredItems(): TechItem[] {
    const cat = this.activeCategory();
    return cat === 'All'
      ? this.allItems
      : this.allItems.filter(i => i.category === cat);
  }

  setCategory(cat: CategoryValue): void {
    this.activeCategory.set(cat);
  }

  getCategoryLabel(category: string): string {
    const keyMap: Record<string, string> = {
      Language: 'stack.filter.language',
      Framework: 'stack.filter.framework',
      Database: 'stack.filter.database',
      Cloud: 'stack.filter.cloud',
      DevOps: 'stack.filter.devops',
      Tools: 'stack.filter.tools',
    };

    return this.lang.get(keyMap[category] ?? category);
  }
}