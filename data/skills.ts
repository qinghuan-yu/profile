import type { Skill, SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'identity',
    name: 'QING-UU',
    skills: [
      { id: 'jufe', name: 'JUFE SOPHOMORE', level: 7, relatedProjects: [], description: 'Student node at Jiangxi University of Finance and Economics.' },
      { id: 'personal-node', name: 'Qing-UU // Personal Node', level: 8, relatedProjects: [], description: 'A personal archive for code, music, data, and hardware experiments.' },
    ],
  },
  {
    id: 'frontend',
    name: 'FRONTEND',
    skills: [
      { id: 'vue', name: 'Vue / Pixi / Interaction', level: 8, relatedProjects: [2, 4, 5], description: 'Interactive frontend work, visual UI, and small tool interfaces.' },
      { id: 'electron', name: 'Electron Desktop Tools', level: 6, relatedProjects: [4], description: 'Desktop app experiments with Vue and local-first workflows.' },
    ],
  },
  {
    id: 'data',
    name: 'DATA',
    skills: [
      { id: 'ml-kaggle', name: 'Machine Learning / Kaggle', level: 7, relatedProjects: [3], description: 'Modeling, dataset experiments, and practical ML workflows.' },
      { id: 'music-ai', name: 'Transformer / MIDI Analysis', level: 7, relatedProjects: [2, 3], description: 'Music tokenization, melody extraction, and piano texture completion.' },
    ],
  },
  {
    id: 'music-hardware',
    name: 'MUSIC + HARDWARE',
    skills: [
      { id: 'piano', name: 'Animenz-style Pianist', level: 8, relatedProjects: [2, 3], description: 'Piano performance and arrangement-aware music analysis.' },
      { id: 'esp32', name: 'ESP-32 / TFT Experiments', level: 6, relatedProjects: [1], description: 'Small hardware display experiments and portable visual devices.' },
    ],
  },
];

export const skillsData: Skill[] = skillCategories.flatMap(cat => cat.skills);
