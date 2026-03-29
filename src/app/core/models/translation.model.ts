export type Language = 'en' | 'es';

export interface Translation {
  key: string;
  en:  string;
  es:  string;
}

export type TranslationMap = Record<string, { en: string; es: string }>;