import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Experience, ExperienceViewModel } from '../../core/models/experience.model';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './experience.html',
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(
    private dataService: PortfolioDataService,
    public lang: LanguageService
  ) {}

  ngOnInit(): void {
    this.dataService.getExperience().subscribe({
      next: (data) => {
        this.experiences = data;
      },
      error: (error) => {
        console.error('Error loading experience:', error);
        this.experiences = [];
      }
    });
  }

  get localizedExperiences(): ExperienceViewModel[] {
    return this.experiences.map((exp) => ({
      id: exp.id,
      current: exp.current,
      role: this.lang.get(`experience.${exp.id}.role`),
      company: this.lang.get(`experience.${exp.id}.company`),
      period: this.lang.get(`experience.${exp.id}.period`),
      description: this.lang.get(`experience.${exp.id}.summary`),
      highlights: this.lang.getList(`experience.${exp.id}.bullet`),
      stack: this.lang.getList(`experience.${exp.id}.stack`),
    }));
  }
}