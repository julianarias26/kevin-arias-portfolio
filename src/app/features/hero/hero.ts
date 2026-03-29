import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { LanguageService } from '../../core/services/language.service';

interface Stat { value: string; label: string; }

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  displayText = signal('');

  get stats(): Stat[] {
    return [
      { value: this.lang.get('hero.stat1.value'),  label: this.lang.get('hero.stat1.label')    },
      { value: this.lang.get('hero.stat2.value'), label: this.lang.get('hero.stat2.label')   },
      { value: this.lang.get('hero.stat3.value'),   label: this.lang.get('hero.stat3.label') },
    ]
  };

  get phrases(): string[] {
    return [
      this.lang.get('hero.typewriter1'),
      this.lang.get('hero.typewriter2'),
      this.lang.get('hero.typewriter3'),
      this.lang.get('hero.typewriter4'),
    ];
  }
  private phraseIndex = 0;
  private charIndex  = 0;
  private deleting   = false;
  private timer!: ReturnType<typeof setTimeout>;

  constructor(private scrollService: ScrollService, public lang: LanguageService) {}

  ngOnInit(): void { this.type(); }

  ngOnDestroy(): void { clearTimeout(this.timer); }

  private type(): void {
    const word = this.phrases[this.phraseIndex];
    if (!this.deleting) {
      this.displayText.set(word.slice(0, ++this.charIndex));
      if (this.charIndex === word.length) {
        this.deleting = true;
        this.timer = setTimeout(() => this.type(), 1800);
        return;
      }
    } else {
      this.displayText.set(word.slice(0, --this.charIndex));
      if (this.charIndex === 0) {
        this.deleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      }
    }
    this.timer = setTimeout(() => this.type(), this.deleting ? 50 : 90);
  }

  scrollTo(id: string): void { this.scrollService.scrollToSection(id); }
}