export type Priority = 'none' | 'low' | 'medium' | 'high' | 'urgent';

export type ItemStatus = 'not_started' | 'in_progress' | 'waiting' | 'completed' | 'archived';

export type ListType = 'checklist' | 'tasks' | 'shopping' | 'ideas' | 'project' | 'collection' | 'custom';

export type ListLayout = 'checklist' | 'compact' | 'sections' | 'kanban' | 'cards';

export type RecurrenceType = 'none' | 'daily' | 'weekdays' | 'weekly' | 'monthly' | 'yearly';

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url?: string;
  type: 'image' | 'link' | 'note';
  previewUrl?: string;
}

export interface ListItem {
  id: string;
  listId: string; // 'inbox' for inbox items
  sectionId?: string;
  title: string;
  notes?: string;
  isCompleted: boolean;
  completedAt?: string;
  priority: Priority;
  status: ItemStatus;
  dueDate?: string; // YYYY-MM-DD
  reminderDate?: string;
  recurrence?: RecurrenceType;
  tags: string[];
  subtasks: Subtask[];
  attachments?: Attachment[];
  customFields?: Record<string, string | number>;
  
  // Shopping mode fields
  quantity?: number;
  price?: number;
  unit?: string;
  store?: string;
  
  // States
  isFavorite?: boolean;
  isArchived?: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListSection {
  id: string;
  listId: string;
  title: string;
  color?: string;
  sortOrder: number;
  isCollapsed?: boolean;
}

export interface List {
  id: string;
  name: string;
  description?: string;
  icon: string; // Lucide icon name or emoji
  color: string; // Color preset: 'mint' | 'yellow' | 'peach' | 'pink' | 'blue' | 'lavender' | 'cream'
  type: ListType;
  layout: ListLayout;
  isFavorite: boolean;
  isArchived: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
  sortOrder: number;
  sortBy?: 'manual' | 'alpha' | 'dueDate' | 'priority' | 'status' | 'completed';
  sortDirection?: 'asc' | 'desc';
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface ListTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  type: ListType;
  layout: ListLayout;
  defaultSections?: string[];
  sampleItems?: Array<{
    title: string;
    sectionName?: string;
    priority?: Priority;
    quantity?: number;
    price?: number;
    tags?: string[];
  }>;
}

export interface AppSettings {
  userName: string;
  theme?: 'light';
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  startScreen: 'home' | 'lists' | 'inbox' | 'today';
  hasCompletedOnboarding: boolean;
  deviceFrame: boolean;
  showCompletedInList: boolean;
  hapticFeedback: boolean;
}

export interface FilterOptions {
  status?: ItemStatus | 'all';
  priority?: Priority | 'all';
  isCompleted?: boolean | 'all';
  tag?: string | 'all';
  sectionId?: string | 'all';
  dueDate?: 'all' | 'today' | 'upcoming' | 'overdue' | 'noDate';
  searchQuery?: string;
}

export interface SortOptions {
  by: 'manual' | 'alpha' | 'dueDate' | 'priority' | 'status' | 'created';
  direction: 'asc' | 'desc';
}

export interface ActivityItem {
  id: string;
  type: 'create' | 'complete' | 'uncomplete' | 'delete' | 'archive' | 'move';
  itemTitle: string;
  listName: string;
  timestamp: string;
}
