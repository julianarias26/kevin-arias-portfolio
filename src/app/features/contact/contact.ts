import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';
import { LanguageService } from '../../core/services/language.service';
import { EmailService } from '../../core/services/email.service';

interface ContactLinkConfig {
  icon: string;
  labelKey: string;
  value: string;
  href: string;
  isLink: boolean;
  valueKey?: string;
}

interface ContactLink {
  icon: string;
  label: string;
  value: string;
  href: string;
  isLink: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollAnimateDirective],
  templateUrl: './contact.html',
})
export class ContactComponent {
  form: FormGroup;
  submitted = signal(false);
  sending = signal(false);
  sendError  = signal(false);   

  private readonly contactLinksConfig: ContactLinkConfig[] = [
    {
      labelKey: 'contact.link.linkedin',
      value: 'linkedin.com/in/kevin-julian-arias-rogeles',
      href: 'https://linkedin.com/in/kevin-julian-arias-rogeles',
      icon: 'mdi:linkedin',
      isLink: true
    },
    {
      labelKey: 'contact.link.github',
      value: 'github.com/julianarias26',
      href: 'https://github.com/julianarias26',
      icon: 'mdi:github',
      isLink: true
    },
    {
      labelKey: 'contact.link.email',
      value: 'kevinariascontact@email.com',
      href: 'mailto:kevinariascontact@email.com',
      icon: 'heroicons:envelope',
      isLink: false
    },
    {
      labelKey: 'contact.link.location',
      value: 'Colombia · Open to Remote',
      valueKey: 'contact.location.value',
      href: '#',
      icon: 'heroicons:map-pin',
      isLink: false
    },
  ];

  constructor(
    private fb:           FormBuilder,
    private emailService: EmailService,
    public  lang:         LanguageService,
  ) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get contactLinks(): ContactLink[] {
    return this.contactLinksConfig.map((item) => ({
      icon: item.icon,
      label: this.lang.get(item.labelKey),
      value: item.valueKey ? this.lang.get(item.valueKey) : item.value,
      href: item.href,
      isLink: item.isLink,
    }));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.sendError.set(false);

    this.emailService.send({
      name:    this.form.value.name,
      email:   this.form.value.email,
      message: this.form.value.message,
    }).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
        this.form.reset();
      },
      error: () => {
        this.sending.set(false);
        this.sendError.set(true);   // muestra mensaje de error
      },
    });
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.hasError(error) && ctrl.touched);
  }

  retry(): void {
    this.sendError.set(false);
  }
}