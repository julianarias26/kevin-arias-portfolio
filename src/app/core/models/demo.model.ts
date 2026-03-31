export type DemoStatus = 'live' | 'wip' | 'coming-soon';

export interface DemoMetric {
  label: string;
  value: string;
}

export interface Demo {
  id:          string;
  title:       string;
  description: string;
  stack:       string[];
  status:      DemoStatus;
  icon:        string;
  gifUrl?:     string;        // URL del GIF/video demo
  swaggerUrl?: string;        // Link a Swagger UI
  repoUrl?:    string;        // Link a GitHub
  metrics?:    DemoMetric[];  // Métricas técnicas opcionales
  sortOrder:   number;
}