import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { LanguageService }      from '../../core/services/language.service';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';
import { Demo } from '../../core/models/demo.model';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './demos.component.html',
})
export class DemosComponent implements OnInit {
  demos: Demo[] = [];

  constructor(
    private dataService: PortfolioDataService,
    public  lang:        LanguageService,
  ) {}

  ngOnInit(): void {
    this.dataService.getDemos().subscribe(data => this.demos = data);
  }

  statusLabel(status: Demo['status']): string {
    const map = {
      'live':         'LIVE',
      'wip':          'WIP',
      'coming-soon':  'SOON',
    };
    return map[status];
  }

  statusStyle(status: Demo['status']): string {
    const map: Record<string, string> = {
      'live':        'color:#22c55e;background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.2)',
      'wip':         'color:#eab308;background:rgba(234,179,8,0.08);border-color:rgba(234,179,8,0.2)',
      'coming-soon': 'color:#475569;background:rgba(71,85,105,0.08);border-color:rgba(71,85,105,0.2)',
    };
    return map[status];
  }

  hasActions(demo: Demo): boolean {
    return !!(demo.swaggerUrl || demo.repoUrl);
  }
}