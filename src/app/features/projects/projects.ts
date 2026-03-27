import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project } from '../../core/models/project.model';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './projects.html',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.dataService.getFeaturedProjects().subscribe(data => this.projects = data);
  }
}