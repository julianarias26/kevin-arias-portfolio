import { Component } from '@angular/core';
import { HeroComponent }       from '../hero/hero';
import { AboutComponent }      from '../about/about';
import { StackComponent }      from '../stack/stack';
import { ExperienceComponent } from '../experience/experience';
import { ProjectsComponent }   from '../projects/projects';
import { SkillsComponent }     from '../skills/skills';
import { ContactComponent }    from '../contact/contact';
import { DemosComponent } from '../demos/demos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    StackComponent,
    ExperienceComponent,
    ProjectsComponent,
    DemosComponent,
    SkillsComponent,
    ContactComponent,
  ],
  template: `
    <app-hero />
    <app-about />
    <app-stack />
    <app-experience />
    <app-projects />
    <app-demos />
    <app-skills />
    <app-contact />
  `,
})
export class HomeComponent {}