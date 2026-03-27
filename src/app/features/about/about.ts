import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './about.html',
})
export class AboutComponent {
  readonly chips = [
      { label: 'C# / .NET',            highlight: true  },
      { label: 'ASP.NET Core',         highlight: true  },
      { label: 'Azure Cloud',          highlight: true  },
      { label: 'SQL Server',           highlight: true  },
      { label: 'REST APIs',            highlight: true  },
      { label: 'Redis',                highlight: false },
      { label: 'Event-Driven Design',  highlight: false },
      { label: 'Clean Architecture',   highlight: false },
      { label: 'API Integrations',     highlight: false },
      { label: 'Scalable Backends',    highlight: false },
  ];
}