export interface Experience {
  id: string;
  current: boolean;
  sortOrder?: number;
}
export interface ExperienceViewModel {
  id: string;
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  highlights: string[];
  stack: string[];
}