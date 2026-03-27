import { Component } from '@angular/core';
import { HeroComponent }       from '../hero/hero';
import { AboutComponent }      from '../about/about';
import { StackComponent }      from '../stack/stack';
import { ExperienceComponent } from '../experience/experience';
import { ProjectsComponent }   from '../projects/projects';
import { SkillsComponent }     from '../skills/skills';
import { ContactComponent }    from '../contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    StackComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-about />
    <app-stack />
    <app-experience />
    <app-projects />
    <app-skills />
    <app-contact />
  `,
})
export class HomeComponent {}