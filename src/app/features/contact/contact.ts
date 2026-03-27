import { Component, signal } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate';

interface ContactLink {
  icon:   string;
  label:  string;
  value:  string;
  href:   string;
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
  sending   = signal(false);

  readonly contactLinks: ContactLink[] = [
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/kevin-julian-arias-rogeles',
      href:  'https://linkedin.com/in/kevin-julian-arias-rogeles',
      icon:  'mdi:linkedin',
      isLink: true

    },
    {
      label: 'GitHub',
      value: 'github.com/julianarias26',
      href:  'https://github.com/julianarias26',
      icon:  'mdi:github',
      isLink: true
    },
    {
      label: 'Email',
      value: 'kevinariascontact@email.com',
      href:  'mailto:kevinariascontact@email.com',
      icon:  'heroicons:envelope',
      isLink: false
    },
    {
      label: 'Location',
      value: 'Colombia · Open to Remote',
      href:  '#',
      icon:  'heroicons:map-pin',
      isLink: false
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.sending.set(true);
    setTimeout(() => {
      this.sending.set(false);
      this.submitted.set(true);
      this.form.reset();
    }, 1200);
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.hasError(error) && ctrl.touched);
  }
}