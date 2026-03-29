export interface Project {
  id: string;
  repoUrl?: string;
  liveUrl?: string;
  type: 'enterprise' | 'api' | 'integration' | 'personal';
  featured: boolean;
  sortOrder?: number;
}

export interface ProjectViewModel {
  id: string;
  badge: string;
  title: string;
  summary: string;
  stack: string[];
  highlights: string[];
  repoUrl?: string;
  liveUrl?: string;
  type: 'enterprise' | 'api' | 'integration' | 'personal';
  featured: boolean;
}
