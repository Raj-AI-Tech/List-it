import type { List, ListItem, ListSection, Tag, AppSettings } from '../types';

export const INITIAL_SETTINGS: AppSettings = {
  userName: '',
  theme: 'light',
  soundEnabled: true,
  hapticsEnabled: true,
  startScreen: 'home',
  hasCompletedOnboarding: false,
  deviceFrame: true,
  showCompletedInList: true,
  hapticFeedback: true,
};

export const INITIAL_TAGS: Tag[] = [];

// Fresh install starts completely empty per Section 10 & 50
export const INITIAL_LISTS: List[] = [];
export const INITIAL_SECTIONS: ListSection[] = [];
export const INITIAL_ITEMS: ListItem[] = [];

// Optional demo data available only when explicitly requested via "Load Demo" in settings
export const DEMO_SAMPLE_LISTS: List[] = [
  {
    id: 'list-groceries',
    name: 'Weekly Groceries',
    description: 'Pantry restocking and fresh groceries',
    icon: 'ShoppingCart',
    color: 'yellow',
    type: 'shopping',
    layout: 'checklist',
    isFavorite: true,
    isArchived: false,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'list-work',
    name: 'Work Priorities',
    description: 'Key deliverables for the week',
    icon: 'Briefcase',
    color: 'mint',
    type: 'tasks',
    layout: 'checklist',
    isFavorite: true,
    isArchived: false,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEMO_SAMPLE_ITEMS: ListItem[] = [
  {
    id: 'item-demo-1',
    listId: 'list-groceries',
    title: 'Fresh Avocados & Lime',
    isCompleted: false,
    priority: 'low',
    status: 'not_started',
    tags: ['groceries'],
    subtasks: [],
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-demo-2',
    listId: 'list-groceries',
    title: 'Oat Milk Barista Blend',
    isCompleted: true,
    completedAt: new Date().toISOString(),
    priority: 'medium',
    status: 'completed',
    tags: ['groceries'],
    subtasks: [],
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'item-demo-3',
    listId: 'list-work',
    title: 'Draft client project proposal',
    isCompleted: false,
    priority: 'high',
    status: 'in_progress',
    dueDate: new Date().toISOString().split('T')[0],
    tags: ['work'],
    subtasks: [],
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
