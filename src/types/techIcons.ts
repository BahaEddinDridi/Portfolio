import React from 'react';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaPhp, FaDocker,
  FaGitAlt, FaGithub, FaFigma, FaTrello, FaJenkins, FaAngular, FaLaravel, FaCode, FaBug
} from 'react-icons/fa';
import {
  SiTypescript, SiMongodb, SiMysql, SiPostgresql, SiPrometheus, SiGrafana, SiDjango, SiNextdotjs, SiNestjs, SiNuxtdotjs, SiDotnet, SiSonarqube, SiIntellijidea, SiJira, SiAdobephotoshop,
  SiSpring, SiExpress,
  SiLaravel
} from 'react-icons/si';
import { DiVisualstudio, DiScrum } from 'react-icons/di';

export type IconType = keyof typeof iconComponents;

export const iconComponents = {
  html: { component: FaHtml5, color: '#E34F26' },
  css: { component: FaCss3Alt, color: '#1572B6' },
  javascript: { component: FaJs, color: '#F7DF1E' },
  typescript: { component: SiTypescript, color: '#3178C6' },
  java: { component: FaJava, color: '#007396' },
  c: { component: () => React.createElement('span', { className: 'text-3xl font-bold' }, 'C'), color: '#A8B9CC' },
  csharp: { component: FaCode, color: '#68217A' },
  python: { component: FaPython, color: '#3776AB' },
  php: { component: FaPhp, color: '#777BB4' },
  react: { component: FaReact, color: '#61DAFB' },
  angular: { component: FaAngular, color: '#DD0031' },
  spring: { component: SiSpring, color: '#6DB33F' },
  node: { component: FaNodeJs, color: '#339933' },
  express: { component: SiExpress, color: '#000000' },
  dotnet: { component: SiDotnet, color: '#512BD4' },
  django: { component: SiDjango, color: '#092E20' },
  laravel: { component: SiLaravel, color: '#FF2D20' },
  nuxt: { component: SiNuxtdotjs, color: '#00C58E' },
  nest: { component: SiNestjs, color: '#E0234E' },
  next: { component: SiNextdotjs, color: '#000000' },
  mongodb: { component: SiMongodb, color: '#47A248' },
  mysql: { component: SiMysql, color: '#4479A1' },
  postgresql: { component: SiPostgresql, color: '#336791' },
  jenkins: { component: FaJenkins, color: '#D24939' },
  sonar: { component: SiSonarqube, color: '#4E9BCD' },
  prometheus: { component: SiPrometheus, color: '#E6522C' },
  grafana: { component: SiGrafana, color: '#F46800' },
  docker: { component: FaDocker, color: '#2496ED' },
  git: { component: FaGitAlt, color: '#F05032' },
  github: { component: FaGithub, color: '#181717' },
  intellij: { component: SiIntellijidea, color: '#000000' },
  vscode: { component: DiVisualstudio, color: '#007ACC' },
  xray: { component: FaBug, color: '#5C2D91' },
  jira: { component: SiJira, color: '#0052CC' },
  trello: { component: FaTrello, color: '#0079BF' },
  photoshop: { component: SiAdobephotoshop, color: '#31A8FF' },
  figma: { component: FaFigma, color: '#F24E1E' },
  scrum: { component: DiScrum, color: '#4CAF50' },
};

export const getIconType = (skill: string): IconType => {
  const normalized = skill.toLowerCase().replace(/\s+/g, '');
  const mapping: Record<string, IconType> = {
    'javascript': 'javascript',
    'typescript': 'typescript',
    'java': 'java',
    'c': 'c',
    'c#': 'csharp',
    'python': 'python',
    'php': 'php',
    'react.js': 'react',
    'angular': 'angular',
    'spring': 'spring',
    'node.js': 'node',
    'express': 'express',
    '.netframework': 'dotnet',
    'django': 'django',
    'laravel': 'laravel',
    'nuxt3': 'nuxt',
    'nest.js': 'nest',
    'next.js': 'next',
    'mongodb': 'mongodb',
    'mysql': 'mysql',
    'postgresql': 'postgresql',
    'jenkins': 'jenkins',
    'sonar': 'sonar',
    'prometheus': 'prometheus',
    'grafana': 'grafana',
    'docker': 'docker',
    'git': 'git',
    'github': 'github',
    'intellijidea': 'intellij',
    'vscode': 'vscode',
    'xray(testing)': 'xray',
    'jira': 'jira',
    'trello': 'trello',
    'adobephotoshop': 'photoshop',
    'figma': 'figma',
    'agilescrum': 'scrum',
  };
  return mapping[normalized] ?? 'html';
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Programming Languages': return '💻';
    case 'Libraries & Frameworks': return '📚';
    case 'Database Management': return '🗄️';
    case 'DevOps': return '⚙️';
    case 'Development Tools': return '🛠️';
    case 'Project Management': return '📊';
    case 'Creative Tools': return '🎨';
    default: return '🔍';
  }
};