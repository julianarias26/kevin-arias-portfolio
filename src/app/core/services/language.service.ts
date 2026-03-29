import { Injectable, signal, computed, effect } from '@angular/core';
import { from } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Language, TranslationMap } from '../models/translation.model';

const STORAGE_KEY = 'portfolio_lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  // ── Estado ──────────────────────────────────────────────────────
  private readonly _lang = signal<Language>(this.savedLang());
  private readonly _map = signal<TranslationMap>({});
  private readonly _loading = signal(true);

  // ── Públicos ────────────────────────────────────────────────────
  readonly lang = this._lang.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isEn = computed(() => this._lang() === 'en');
  readonly isEs = computed(() => this._lang() === 'es');

  constructor(private supabase: SupabaseService) {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, this._lang());
    });

    this.loadTranslations();
  }

  // ── Cambiar idioma ─────────────────────────────────────────────
  toggle(): void {
    this._lang.set(this._lang() === 'en' ? 'es' : 'en');
  }

  setLang(lang: Language): void {
    this._lang.set(lang);
  }

  // ── Traducir una clave simple ──────────────────────────────────
  t(key: string): string {
    const entry = this._map()[key];
    if (!entry) return key;
    return entry[this._lang()] ?? entry['en'] ?? key;
  }

  get(key: string): string {
    return this.t(key);
  }

  // ── Obtener lista por prefijo ──────────────────────────────────
  // Ejemplo:
  // getList('projects.pension_azure.stack')
  // -> busca projects.pension_azure.stack.1, .2, .3...
  getList(prefix: string): string[] {
    const translations = this._map();
    const prefixWithDot = `${prefix}.`;

    return Object.keys(translations)
      .filter((key) => key.startsWith(prefixWithDot))
      .sort((a, b) => this.compareTranslationKeys(a, b))
      .map((key) => this.t(key));
  }

  // ── Validar existencia de una clave ────────────────────────────
  has(key: string): boolean {
    return !!this._map()[key];
  }

  // ── Cargar desde Supabase ──────────────────────────────────────
  private loadTranslations(): void {
    from(
      this.supabase.client
        .from('translations')
        .select('key, en, es')
    ).subscribe({
      next: ({ data, error }) => {
        if (error) {
          console.error('Error loading translations:', error);
          this._loading.set(false);
          return;
        }

        const map: TranslationMap = {};

        (data ?? []).forEach((row) => {
          map[row['key']] = {
            en: row['en'],
            es: row['es'],
          };
        });

        this._map.set(map);
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Translation fetch failed:', err);
        this._loading.set(false);
      },
    });
  }

  // ── Helpers privados ───────────────────────────────────────────
  private compareTranslationKeys(a: string, b: string): number {
    const aLast = a.split('.').pop() ?? '';
    const bLast = b.split('.').pop() ?? '';

    const aNum = Number(aLast);
    const bNum = Number(bLast);

    const aIsNum = !Number.isNaN(aNum);
    const bIsNum = !Number.isNaN(bNum);

    if (aIsNum && bIsNum) {
      return aNum - bNum;
    }

    if (aIsNum) return -1;
    if (bIsNum) return 1;

    return a.localeCompare(b);
  }

  private savedLang(): Language {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'es' ? 'es' : 'en';
  }

  loadTranslationsAsync(): Promise<void> {
  return new Promise((resolve) => {
    from(
      this.supabase.client
        .from('translations')
        .select('key, en, es')
    ).subscribe({
      next: ({ data, error }) => {
        if (!error) {
          const map: TranslationMap = {};
          (data ?? []).forEach(row => {
            map[row['key']] = { en: row['en'], es: row['es'] };
          });
          this._map.set(map);
        }
        this._loading.set(false);
        resolve(); // ← resuelve la Promise y Angular continúa
      },
      error: () => {
        this._loading.set(false);
        resolve(); // ← resuelve igual para no bloquear si falla
      },
    });
  });
}
}