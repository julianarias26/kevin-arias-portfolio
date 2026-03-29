import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollAnimateDirective],
  templateUrl: './about.html',
})
export class AboutComponent {

  get chips(): any[] {
    return [
      { label: this.lang.get('about.chip.chip1'),   highlight: true  },
      { label: this.lang.get('about.chip.chip2'),   highlight: true  },
      { label: this.lang.get('about.chip.chip3'),   highlight: true  },
      { label: this.lang.get('about.chip.chip4'),   highlight: true  },
      { label: this.lang.get('about.chip.chip5'),   highlight: true  },
      { label: this.lang.get('about.chip.chip6'),   highlight: false },
      { label: this.lang.get('about.chip.chip7'),   highlight: false },
      { label: this.lang.get('about.chip.chip8'),   highlight: false },
      { label: this.lang.get('about.chip.chip9'),   highlight: false },
      { label: this.lang.get('about.chip.chip10'),  highlight: false },
    ]
  } ;
    
  constructor(public  lang: LanguageService) {}
  
}