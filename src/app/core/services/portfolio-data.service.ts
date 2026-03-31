import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { Project } from '../models/project.model';
import { Experience } from '../models/experience.model';
import { SkillCategory } from '../models/skill.model';
import { TechItem } from '../models/tech-stack.model';
import { Demo } from '../models/demo.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private get db() {
    return this.supabase.client;
  }

  constructor(private supabase: SupabaseService) {}

  // ── PROJECTS ──────────────────────────────────────────────────
  getProjects(): Observable<Project[]> {
    return from(
      this.db
        .from('projects')
        .select('id, repo_url, live_url, type, featured, sort_order')
        .order('sort_order', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row) => this.mapProject(row));
      })
    );
  }

  getFeaturedProjects(): Observable<Project[]> {
    return from(
      this.db
        .from('projects')
        .select('id, repo_url, live_url, type, featured, sort_order')
        .eq('featured', true)
        .order('sort_order', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row) => this.mapProject(row));
      })
    );
  }

  // ── EXPERIENCE ────────────────────────────────────────────────
  getExperience(): Observable<Experience[]> {
    return from(
      this.db
        .from('experience')
        .select('id, current, sort_order')
        .order('sort_order', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data ?? []).map((row) => this.mapExperience(row));
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
        .order('sort_order', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;

        return (data ?? []).map((cat) => ({
          category: cat['category'],
          icon: cat['icon'],
          skills: ((cat['skills'] as any[]) ?? [])
            .sort((a, b) => a['sort_order'] - b['sort_order'])
            .map((s) => ({
              name: s['name'],
              level: s['level'],
              percentage: s['percentage'],
            })),
        } as SkillCategory));
      })
    );
  }

  // ── TECH STACK ────────────────────────────────────────────────
  getTechStack(): Observable<TechItem[]> {
    return from(
      this.db
        .from('tech_stack')
        .select('name, icon, category, highlight, sort_order')
        .order('sort_order', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;

        return (data ?? []).map((row) => ({
          name: row['name'],
          icon: row['icon'],
          category: row['category'],
          highlight: row['highlight'],
        } as TechItem));
      })
    );
  }

  getDemos(): Observable<Demo[]> {
  return from(
    this.db
      .from('demos')
      .select('*')
      .order('sort_order')
  ).pipe(
    map(({ data, error }) => {
      if (error) throw error;
      return (data ?? []).map(row => ({
        id:          row['id'],
        title:       row['title'],
        description: row['description'],
        stack:       row['stack']       ?? [],
        status:      row['status'],
        icon:        row['icon'],
        gifUrl:      row['gif_url']     ?? undefined,
        swaggerUrl:  row['swagger_url'] ?? undefined,
        repoUrl:     row['repo_url']    ?? undefined,
        metrics:     row['metrics']     ?? undefined,
        sortOrder:   row['sort_order'],
      } as Demo));
    })
  );
}

  // ── MAPPERS privados ──────────────────────────────────────────
  private mapProject(row: any): Project {
    return {
      id: row['id'],
      repoUrl: row['repo_url'] ?? undefined,
      liveUrl: row['live_url'] ?? undefined,
      type: row['type'],
      featured: row['featured'],
      sortOrder: row['sort_order'] ?? 0,
    };
  }

  private mapExperience(row: any): Experience {
    return {
      id: row['id'],
      current: row['current'],
      sortOrder: row['sort_order'] ?? 0,
    };
  }
}