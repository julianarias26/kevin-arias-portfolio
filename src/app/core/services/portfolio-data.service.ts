import { Injectable }    from '@angular/core';
import { from, Observable, forkJoin, map } from 'rxjs';
import { SupabaseService }  from './supabase.service';
import { Project }          from '../models/project.model';
import { Experience }       from '../models/experience.model';
import { SkillCategory }    from '../models/skill.model';
import { TechItem }         from '../models/tech-stack.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {

  private get db() { return this.supabase.client; }

  constructor(private supabase: SupabaseService) {}

  // ── PROJECTS ──────────────────────────────────────────────────
  getProjects(): Observable<Project[]> {
    return from(
      this.db
        .from('projects')
        .select('*')
        .order('sort_order')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map(this.mapProject);
      })
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return from(
      this.db
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('sort_order')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map(this.mapProject);
      })
    );
  }

  // ── EXPERIENCE ────────────────────────────────────────────────
  getExperience(): Observable<Experience[]> {
    return from(
      this.db
        .from('experience')
        .select('*')
        .order('sort_order')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map(row => ({
          id:          row['id'],
          role:        row['role'],
          company:     row['company'],
          period:      row['period'],
          current:     row['current'],
          description: row['description'],
          highlights:  row['highlights'] ?? [],
          stack:       row['stack']      ?? [],
        } as Experience));
      })
    );
  }

  // ── SKILLS ────────────────────────────────────────────────────
  getSkills(): Observable<SkillCategory[]> {
    return from(
      this.db
        .from('skill_categories')
        .select(`
          id,
          category,
          icon,
          sort_order,
          skills (
            id,
            name,
            level,
            percentage,
            sort_order
          )
        `)
        .order('sort_order')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map(cat => ({
          category: cat['category'],
          icon:     cat['icon'],
          skills:   ((cat['skills'] as any[]) ?? [])
            .sort((a, b) => a['sort_order'] - b['sort_order'])
            .map(s => ({
              name:       s['name'],
              level:      s['level'],
              percentage: s['percentage'],
            })),
        } as SkillCategory));
      })
    );
  }

  // ── TECH STACK ────────────────────────────────────────────────
  getTechStack(): Observable<TechItem[]> {
    debugger
    return from(
      this.db
        .from('tech_stack')
        .select('*')
        .order('sort_order')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map(row => ({
          name:      row['name'],
          icon:      row['icon'],
          category:  row['category'],
          highlight: row['highlight'],
        } as TechItem));
      })
    );
  }

  // ── MAPPER privado ────────────────────────────────────────────
  private mapProject(row: any): Project {
    return {
      id:               row['id'],
      title:            row['title'],
      shortDescription: row['short_description'],
      challenge:        row['challenge'],
      solution:         row['solution'],
      stack:            row['stack']       ?? [],
      highlights:       row['highlights']  ?? [],
      repoUrl:          row['repo_url']    ?? undefined,
      liveUrl:          row['live_url']    ?? undefined,
      type:             row['type'],
      featured:         row['featured'],
    };
  }
}