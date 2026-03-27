import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="px-[6%] py-8 border-t border-surface-border
                   flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="font-mono text-xs text-surface-muted text-center md:text-left">
        © {{ year }} Kevin Julián Arias Rogeles · Backend .NET Developer
      </p>

      <div class="flex items-center gap-5">
        <a
          href="https://github.com/julianarias26"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs text-surface-muted hover:text-primary transition-colors duration-200"
        >
          GitHub
        </a>

        <a
          href="https://linkedin.com/in/kevin-julian-arias-rogeles"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs text-surface-muted hover:text-primary transition-colors duration-200"
        >
          LinkedIn
        </a>

        <a
          href="mailto:kevinariascontact@gmail.com"
          class="font-mono text-xs text-surface-muted hover:text-primary transition-colors duration-200"
        >
          Email
        </a>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}