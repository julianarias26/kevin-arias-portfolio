import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project }       from '../models/project.model';
import { Experience }    from '../models/experience.model';
import { SkillCategory } from '../models/skill.model';
import { TechItem }      from '../models/tech-stack.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {

private projects: Project[] = [
  {
    id: 'pension-modernization',
    title: 'Pension Processing Modernization on Azure',
    shortDescription:
      'Modernization of critical pension-processing workflows from on-premise infrastructure to Azure, using .NET 8 and Azure Functions for asynchronous, scalable, and traceable backend processing.',
    challenge:
      'Critical pension workflows required modernization to support high-volume processing, regulatory validations, and more resilient distributed execution in a cloud environment.',
    solution:
      'Implemented backend components with .NET 8, Azure Functions, SQL Server, Redis Cache, Storage Queues, and Azure Data Factory to support asynchronous orchestration, idempotency, error control, and traceability.',
    stack: [
      '.NET 8',
      'Azure Functions',
      'SQL Server',
      'Redis Cache',
      'Azure Data Factory',
      'Azure Storage Queues',
      'C#',
    ],
    highlights: [
      'Migrated critical pension-system processes from on-premise infrastructure to Azure',
      'Built Queue and Timer-triggered flows for asynchronous and scalable processing',
      'Implemented regulatory validations and business rules in a highly controlled domain',
      'Optimized SQL Server stored procedures using OPENJSON and CTEs',
      'Strengthened resilience and traceability across distributed workflows',
    ],
    type: 'enterprise',
    featured: true,
  },
  {
    id: 'financial-backend-refactoring',
    title: 'Backend Refactoring for Financial Services',
    shortDescription:
      'Restructuring of a .NET backend solution in the financial sector to improve maintainability, separation of concerns, and clarity across critical business flows.',
    challenge:
      'The existing backend had tightly coupled components and internal flows that made business logic harder to maintain, evolve, and stabilize.',
    solution:
      'Reorganized layers and backend components, refactored existing business logic, and adjusted critical validations and integrations to reduce coupling and improve long-term maintainability.',
    stack: [
      'C#',
      '.NET',
      'Layered Architecture',
      'Business Logic',
      'Integrations',
      'Validation Rules',
    ],
    highlights: [
      'Reorganized backend layers and components to improve separation of responsibilities',
      'Refactored internal business flows for better maintainability and code clarity',
      'Adjusted critical integrations and validations to strengthen functional stability',
      'Reduced technical debt in existing backend components',
      'Improved backend structure for long-term scalability and supportability',
    ],
    type: 'integration',
    featured: true,
  },
  {
    id: 'transactional-apis',
    title: 'Transactional APIs for Enterprise Operations',
    shortDescription:
      'Development of backend components and REST APIs for internal transactional processes, focused on business rules, data consistency, exception handling, and database performance.',
    challenge:
      'Enterprise transactional processes required robust service-layer design, stronger business validations, and more efficient database access to ensure stable internal operations.',
    solution:
      'Built REST APIs with structured controllers, services, and data access layers in .NET Core, implementing validation logic, exception handling, and query optimization for reliable transactional processing.',
    stack: [
      'ASP.NET Core',
      'REST APIs',
      'SQL Server',
      'C#',
      'Layered Architecture',
      '.NET Core',
    ],
    highlights: [
      'Developed REST APIs for internal transactional business processes',
      'Structured controllers, services, and data access layers under layered architecture principles',
      'Implemented business validations and exception handling for reliable processing',
      'Optimized database queries and operations to improve response times and stability',
      'Reinforced data integrity and consistency in enterprise workflows',
    ],
    type: 'api',
    featured: true,
  },
];

private experience: Experience[] = [
  {
    id: 'exp-ael',
    role: 'Backend Developer — .NET / Azure',
    company: 'Aportes en Línea (AEL) · Periferia IT',
    period: 'Oct 2023 — Feb 2026',
    current: false,
    description:
      'Worked on the modernization of critical pension-system processes, helping migrate legacy workloads from on-premise infrastructure to Azure. Built backend solutions with .NET 8, Azure Functions, SQL Server, Redis, Storage Queues, and Azure Data Factory for asynchronous, traceable, and regulation-driven processing at scale.',
    highlights: [
      'Participated in the migration of critical pension workflows from on-premise infrastructure to Azure',
      'Built Queue and Timer-triggered backend flows for asynchronous and scalable processing',
      'Implemented regulatory validations and business rules for a highly controlled pension domain',
      'Designed and optimized SQL Server stored procedures using OPENJSON and CTEs',
      'Integrated Azure Data Factory, Storage Queues, and Redis Cache for orchestration, idempotency, and traceability',
    ],
    stack: [
      '.NET 8',
      'Azure Functions',
      'SQL Server',
      'Redis Cache',
      'Azure Data Factory',
      'Azure Storage Queues',
      'C#',
    ],
  },
  {
    id: 'exp-serfinanza',
    role: 'Backend Developer - .NET',
    company: 'Banco Serfinanza · Periferia IT',
    period: 'Jan 2023 — Mar 2023',
    current: false,
    description:
      'Contributed to the restructuring of an existing .NET backend solution in the financial sector, improving maintainability, separation of concerns, and clarity across critical business flows.',
    highlights: [
      'Reorganized layers and backend components to improve separation of responsibilities',
      'Refactored existing business logic and internal service flows',
      'Adjusted critical integrations and validations to reinforce system stability',
      'Reduced technical debt in backend components with a cleaner layered structure',
    ],
    stack: [
      'C#',
      '.NET',
      'Layered Architecture',
      'Business Logic',
      'Integrations',
      'Validation Rules',
    ],
  },
  {
    id: 'exp-bmc',
    role: 'Full Stack Developer (.NET & Angular)',
    company: 'Bolsa Mercantil de Colombia (BMC) · Periferia IT',
    period: 'Jun 2022 — Dec 2022',
    current: false,
    description:
      'Contributed to the evolution of an enterprise production system, extending backend logic in .NET and supporting stable functional delivery in a business-critical environment.',
    highlights: [
      'Developed and maintained functional enhancements in a production enterprise application',
      'Extended and optimized business logic in C# .NET',
      'Supported transactional consistency and functional validations across business flows',
      'Worked across backend and frontend layers to deliver stable product evolution',
    ],
    stack: [
      '.NET',
      'C#',
      'Angular',
      'TypeScript',
      'Business Logic',
      'Enterprise Systems',
    ],
  },
  {
    id: 'exp-falabella',
    role: 'Backend Developer — .NET',
    company: 'Falabella · Periferia IT',
    period: 'Jun 2021 — May 2022',
    current: false,
    description:
      'Developed backend logic and REST APIs for internal transactional processes, emphasizing business rules, data consistency, exception handling, and database performance.',
    highlights: [
      'Built transactional business logic in C# .NET Core for internal operations',
      'Developed REST APIs with structured controllers, services, and data access layers',
      'Implemented validations, business rules, and exception handling for reliable processing',
      'Optimized database queries and access operations to improve response times and stability',
    ],
    stack: [
      'ASP.NET Core',
      'REST APIs',
      'SQL Server',
      'C#',
      '.NET Core',
      'Layered Architecture',
    ],
  },
];

private skills: SkillCategory[] = [
  {
    category: 'Backend Development',
    icon: 'heroicons:server-stack',
    skills: [
      { name: 'C# / .NET', level: 'Expert', percentage: 95 },
      { name: 'ASP.NET Core', level: 'Expert', percentage: 92 },
      { name: 'REST API Development', level: 'Advanced', percentage: 90 },
      { name: 'Azure Functions', level: 'Advanced', percentage: 88 },
      { name: 'Business Rules Implementation', level: 'Advanced', percentage: 90 },
    ],
  },
  {
    category: 'Data & Persistence',
    icon: 'heroicons:circle-stack',
    skills: [
      { name: 'SQL Server', level: 'Expert', percentage: 92 },
      { name: 'SQL Optimization', level: 'Advanced', percentage: 88 },
      { name: 'Redis Cache', level: 'Advanced', percentage: 84 },
      { name: 'SQLite', level: 'Intermediate', percentage: 68 },
      { name: 'Entity Framework', level: 'Advanced', percentage: 72 },
    ],
  },
  {
    category: 'Cloud & Distributed Systems',
    icon: 'heroicons:cloud',
    skills: [
      { name: 'Microsoft Azure', level: 'Advanced', percentage: 88 },
      { name: 'Azure Data Factory', level: 'Advanced', percentage: 82 },
      { name: 'Azure Storage Queues', level: 'Advanced', percentage: 84 },
      { name: 'Azure Monitor / App Insights', level: 'Advanced', percentage: 78 },
      { name: 'Containers', level: 'Intermediate', percentage: 70 },
    ],
  },
  {
    category: 'Architecture & Integration',
    icon: 'heroicons:cpu-chip',
    skills: [
      { name: 'Layered Architecture', level: 'Advanced', percentage: 88 },
      { name: 'Service Design', level: 'Advanced', percentage: 85 },
      { name: 'Asynchronous Processing', level: 'Advanced', percentage: 86 },
      { name: 'Integration Patterns', level: 'Advanced', percentage: 82 },
      { name: 'System Resilience & Traceability', level: 'Advanced', percentage: 84 },
    ],
  },
];

private techStack: TechItem[] = [
  { name: 'C#',                   icon: 'devicon-csharp-plain colored',               category: 'Language',  highlight: true  },
  { name: '.NET',                 icon: 'devicon-dotnetcore-plain colored',           category: 'Framework', highlight: true  },
  { name: 'ASP.NET Core',         icon: 'devicon-dotnetcore-plain colored',           category: 'Framework', highlight: true  },
  { name: 'Azure',                icon: 'devicon-azure-plain colored',                category: 'Cloud',     highlight: true  },
  { name: 'Azure Functions',      icon: 'devicon-azure-plain colored',                category: 'Cloud',     highlight: true  },
  { name: 'SQL Server',           icon: 'devicon-microsoftsqlserver-plain colored',   category: 'Database',  highlight: true  },

  { name: 'Angular',              icon: 'devicon-angularjs-plain colored',            category: 'Framework',  highlight: false },
  { name: 'TypeScript',           icon: 'devicon-typescript-plain colored',           category: 'Language',  highlight: false },
  { name: 'Redis',                icon: 'devicon-redis-plain colored',                category: 'Database',  highlight: false },
  { name: 'EF Core',              icon: 'devicon-entityframeworkcore-plain colored',  category: 'Framework', highlight: false },
  { name: 'Azure Storage',        icon: 'devicon-azure-plain colored',                category: 'Cloud',     highlight: false },
  { name: 'Azure Storage Queues', icon: 'devicon-azure-plain colored',                category: 'Cloud',     highlight: false },
  { name: 'Azure Data Factory',   icon: 'devicon-azure-plain colored',                category: 'Cloud',     highlight: false },
  { name: 'Azure DevOps',         icon: 'devicon-azuredevops-plain colored',          category: 'DevOps',    highlight: false },
  { name: 'Git',                  icon: 'devicon-git-plain colored',                  category: 'DevOps',    highlight: false },
  { name: 'Swagger / OpenAPI',    icon: 'devicon-swagger-plain colored',              category: 'Tools',     highlight: false },
];

  getProjects(): Observable<Project[]>         { return of(this.projects); }
  getFeaturedProjects(): Observable<Project[]> { return of(this.projects.filter(p => p.featured)); }
  getExperience(): Observable<Experience[]>    { return of(this.experience); }
  getSkills(): Observable<SkillCategory[]>     { return of(this.skills); }
  getTechStack(): Observable<TechItem[]>       { return of(this.techStack); }
}