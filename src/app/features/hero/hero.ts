import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';

interface Stat { value: string; label: string; }

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  displayText = signal('');

  readonly stats: Stat[] = [
    { value: '5+',  label: 'Years Experience'     },
    { value: '6+', label: 'Business Projects Delivered'   },
    { value: '3',   label: 'Cloud Certifications' },
  ];
  private readonly phrases = [
    'Backend .NET Engineer',
    '.NET & Azure Developer',
    'API Integration Engineer',
    'Cloud Solutions Developer',
  ];
  private phraseIndex = 0;
  private charIndex  = 0;
  private deleting   = false;
  private timer!: ReturnType<typeof setTimeout>;

  constructor(private scrollService: ScrollService) {}

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