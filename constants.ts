
import { ServiceDetail } from './types';

export const COLORS = {
  CREAM: '#FFF2EC',
  INK: '#1a1a1a',
  SIGNAL_RED: '#E21E3F',
};

export const SERVICES: ServiceDetail[] = [
  {
    id: 'capture-core',
    title: 'THE CAPTURE CORE',
    subtitle: 'Revenue Engines',
    description: 'High-performance architecture engineered to capture demand. Every pixel is calculated to feed the CRM, ensuring zero leakage in the acquisition pipeline.',
    features: ['Next.js Architecture', 'Precision Funnels', 'Event Tracking', 'Lead Scrimmage'],
    visualPrompt: 'geometric',
    bgImage: '', // Removed images as per spec
    icon: 'Target',
  },
  {
    id: 'crm-intelligence',
    title: 'CRM INTELLIGENCE',
    subtitle: 'The Nervous System',
    description: 'A Single Source of Truth. We architect CRM ecosystems that serve as a data nervous system, tracking every dollar from ad click to closed deal.',
    features: ['Data Integrity Protocols', 'Lifecycle Mapping', 'Attribution Modeling', 'API Orchestration'],
    visualPrompt: 'network',
    bgImage: '',
    icon: 'Database',
  },
  {
    id: 'automation',
    title: 'AUTOMATION',
    subtitle: 'Digital Labor',
    description: 'Replacing manual repetition with digital protocols. We replace 40% of manual busywork with code leverage, allowing humans to focus on strategy.',
    features: ['Workflow Automation', 'Logic Gate Design', 'System Syncing', 'Error Handling'],
    visualPrompt: 'flow',
    bgImage: '',
    icon: 'Zap',
  },
  {
    id: 'ai-agents',
    title: 'AI AGENTS',
    subtitle: 'Augmented Workforce',
    description: 'Employees that never sleep. Deploying autonomous LLM-driven agents to handle complex customer interactions and operational triage 24/7.',
    features: ['LLM Orchestration', 'Autonomous Triage', 'Contextual Memory', 'Agentic Workflows'],
    visualPrompt: 'neural',
    bgImage: '',
    icon: 'Cpu',
  },
  {
    id: 'content-supply',
    title: 'CONTENT SUPPLY CHAIN',
    subtitle: 'Media Logistics',
    description: 'Transforming creative output into a predictable logistics chain. We treat content as a manufacturing process with automated distribution.',
    features: ['Content Pipelines', 'Asset Management', 'Dynamic Creative', 'Omnichannel Flow'],
    visualPrompt: 'sequential',
    bgImage: '',
    icon: 'Layers',
  },
  {
    id: 'behavioral-eng',
    title: 'BEHAVIORAL ENGINEERING',
    subtitle: 'Team Protocols',
    description: 'Optimising the human element. We design training protocols that ensure peak performance and adherence to high-precision systems.',
    features: ['Protocol Adoption', 'Training Ecosystems', 'Incentive Design', 'Habit Loops'],
    visualPrompt: 'waves',
    bgImage: '',
    icon: 'Users',
  },
  {
    id: 'biz-intel',
    title: 'BUSINESS INTELLIGENCE',
    subtitle: 'Control Tower',
    description: 'A Single Pane of Glass. Aggregating Finance, Marketing, and Sales data into one real-time dashboard for executive decision making.',
    features: ['KPI Dashboards', 'Looker Integration', 'Real-time Reporting', 'Trend Forecasting'],
    visualPrompt: 'dashboard',
    bgImage: '',
    icon: 'BarChart3',
  }
];
