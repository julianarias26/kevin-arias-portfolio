import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Project, ProjectViewModel } from '../../core/models/project.model';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './projects.html',
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private dataService: PortfolioDataService,
    public lang: LanguageService,
  ) {}

  ngOnInit(): void {
    this.dataService.getFeaturedProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error loading featured projects:', error);
        this.projects = [];
      },
    });
  }

  get localizedProjects(): ProjectViewModel[] {
    return this.projects.map((project) => ({
      id: project.id,
      badge: this.lang.get(`projects.type.${project.type}`),
      title: this.lang.get(`projects.${project.id}.title`),
      summary: this.lang.get(`projects.${project.id}.summary`),
      highlights: this.lang.getList(`projects.${project.id}.bullet`),
      stack: this.lang.getList(`projects.${project.id}.stack`),
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      type: project.type,
      featured: project.featured,
    }));
  }
}