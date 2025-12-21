
import { ServiceDetail } from './types';

export const COLORS = {
  CREAM: '#FFF2EC',
  INK: '#1a1a1a',
  GOLD: '#C5A059',
  SIGNAL_RED: '#E21E3F',
};

export const SERVICES: ServiceDetail[] = [
  {
    id: 'capture-core',
    title: 'THE CAPTURE CORE',
    subtitle: 'High-Performance Architecture',
    description: 'Central processing unit for demand capture. Engineered for zero-leakage acquisition and maximum conversion velocity.',
    features: ['Real-time Monitoring', 'Logic Processing', 'Data Triage'],
    visualPrompt: 'geometric',
    bgImage: '',
    icon: 'Terminal',
  },
  {
    id: 'nervous-system',
    title: 'NERVOUS SYSTEM',
    subtitle: 'CRM Intelligence',
    description: 'A high-integrity data nervous system tracking every lifecycle touchpoint with surgical precision.',
    features: ['Entity Mapping', 'Protocol Sync', 'Truth Source'],
    visualPrompt: 'network',
    bgImage: '',
    icon: 'Database',
  },
  {
    id: 'digital-labor',
    title: 'DIGITAL LABOR',
    subtitle: 'Automation',
    description: 'Replacing human friction with autonomous logic gates and enterprise-grade execution protocols.',
    features: ['Logic Routing', 'Error Recovery', 'Workflow Sync'],
    visualPrompt: 'flow',
    bgImage: '',
    icon: 'Zap',
  },
  {
    id: 'augmented-workforce',
    title: 'THE AUGMENTED WORKFORCE',
    subtitle: 'AI Agents',
    description: 'Autonomous neural units handling triage, qualification, and context management across your stack.',
    features: ['Neural Context', 'Agentic Loops', 'Vector Memory'],
    visualPrompt: 'neural',
    bgImage: '',
    icon: 'Cpu',
  },
  {
    id: 'media-logistics',
    title: 'MEDIA LOGISTICS',
    subtitle: 'Content Supply Chain',
    description: 'Manufacturing expertise into digital assets via automated assembly lines and distribution nodes.',
    features: ['Logistics Flow', 'Asset Triage', 'Global Distribution'],
    visualPrompt: 'sequential',
    bgImage: '',
    icon: 'Layers',
  },
  {
    id: 'team-protocols',
    title: 'TEAM PROTOCOLS',
    subtitle: 'Behavioral Engineering',
    description: 'Optimizing human output through protocol adoption, feedback loops, and high-performance habits.',
    features: ['Habit Mapping', 'Protocol Adherence', 'Efficiency Loops'],
    visualPrompt: 'waves',
    bgImage: '',
    icon: 'Users',
  },
  {
    id: 'control-tower',
    title: 'THE CONTROL TOWER',
    subtitle: 'Business Intelligence',
    description: 'A single pane of glass for real-time executive visibility, forecasting, and architectural growth strategy.',
    features: ['Metric Velocity', 'Trend Analysis', 'Decision Matrix'],
    visualPrompt: 'dashboard',
    bgImage: '',
    icon: 'BarChart3',
  }
];
