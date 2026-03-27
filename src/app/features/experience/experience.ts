import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Experience } from '../../core/models/experience.model';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './experience.html',
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.dataService.getExperience().subscribe(data => this.experiences = data);
  }
}