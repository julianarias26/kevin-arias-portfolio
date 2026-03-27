export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  stack: string[];
  highlights: string[];
  repoUrl?: string;
  liveUrl?: string;
  type: 'enterprise' | 'api' | 'integration' | 'personal';
  featured: boolean;
}