export type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate';

export interface Skill {
  name: string;
  level: SkillLevel;
  percentage: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}