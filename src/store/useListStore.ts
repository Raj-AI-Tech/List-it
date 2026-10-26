import { create } from 'zustand';
import type {
  List,
  ListItem,
  ListSection,
  Tag,
  AppSettings,
  Subtask,
  ListTemplate,
  ItemStatus,
} from '../types';
import {
  INITIAL_LISTS,
  INITIAL_ITEMS,
  INITIAL_SECTIONS,
  INITIAL_TAGS,
  INITIAL_SETTINGS,
  DEMO_SAMPLE_LISTS,
  DEMO_SAMPLE_ITEMS,
} from '../constants/sampleData';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface UndoRecord {
  type: 'delete_item' | 'delete_list' | 'bulk_delete' | 'archive_item';
  items?: ListItem[];
  lists?: List[];
  message: string;
}

interface ListState {
  // Data
  lists: List[];
  items: ListItem[];
  sections: ListSection[];
  tags: Tag[];
  settings: AppSettings;

  // Navigation
  currentScreen: string;
  previousScreens: string[];
  activeListId: string | null;
  activeItemId: string | null;

  // Selection / Multi-select
  selectedItemIds: string[];
  isMultiSelectMode: boolean;

  // Active Modals & Sheets
  isCreateListOpen: boolean;
  isCreateItemOpen: boolean;
  isItemDetailOpen: boolean;
  isQuickAddOpen: boolean;
  isFilterModalOpen: boolean;
  isMoveModalOpen: boolean;
  isNotificationModalOpen: boolean;
  isQuickEntryOpen: boolean;
  isActionSheetOpen: boolean;

  // Undo system
  lastUndo: UndoRecord | null;
  undoTimer: number | null;

  // Actions - Navigation
  navigateTo: (screen: string, listId?: string, itemId?: string) => void;
  goBack: () => void;
  openCreateList: () => void;
  closeCreateList: () => void;
  openCreateItem: (listId?: string, sectionId?: string) => void;
  closeCreateItem: () => void;
  openItemDetail: (itemId: string) => void;
  closeItemDetail: () => void;
  openQuickAdd: () => void;
  closeQuickAdd: () => void;
  setFilterModalOpen: (open: boolean) => void;
  setMoveModalOpen: (open: boolean) => void;
  setNotificationModalOpen: (open: boolean) => void;
  setQuickEntryOpen: (open: boolean) => void;
  openActionSheet: () => void;
  closeActionSheet: () => void;

  // Actions - Lists
  createList: (listData: Partial<List>, initialSections?: string[], initialItems?: Partial<ListItem>[]) => List;
  createListFromTemplate: (template: ListTemplate) => List;
  updateList: (id: string, data: Partial<List>) => void;
  deleteList: (id: string) => void;
  archiveList: (id: string) => void;
  restoreList: (id: string) => void;
  toggleFavoriteList: (id: string) => void;
  duplicateList: (id: string) => void;
  permanentDeleteList: (id: string) => void;
  reorderLists: (reordered: List[]) => void;

  // Actions - Sections
  createSection: (listId: string, title: string) => void;
  updateSection: (id: string, title: string) => void;
  deleteSection: (id: string) => void;
  toggleCollapseSection: (id: string) => void;

  // Actions - Items
  createItem: (itemData: Partial<ListItem>) => ListItem;
  updateItem: (id: string, data: Partial<ListItem>) => void;
  toggleCompleteItem: (id: string) => void;
  deleteItem: (id: string) => void;
  archiveItem: (id: string) => void;
  restoreItem: (id: string) => void;
  permanentDeleteItem: (id: string) => void;
  duplicateItem: (id: string) => void;
  moveItem: (itemId: string, targetListId: string, targetSectionId?: string) => void;
  toggleFavoriteItem: (id: string) => void;
  reorderItems: (reordered: ListItem[]) => void;
  quickEntryBatch: (listId: string, lines: string[], sectionId?: string) => void;

  // Subtasks
  addSubtask: (itemId: string, title: string) => void;
  toggleSubtask: (itemId: string, subtaskId: string) => void;
  deleteSubtask: (itemId: string, subtaskId: string) => void;

  // Tags
  createTag: (name: string, color: string) => void;
  deleteTag: (id: string) => void;

  // Multi-select actions
  toggleSelectItem: (id: string) => void;
  selectAllItems: (itemIds: string[]) => void;
  clearSelection: () => void;
  bulkComplete: (complete: boolean) => void;
  bulkDelete: () => void;
  bulkMove: (targetListId: string) => void;
  bulkArchive: () => void;

  // Trash & Undo
  undoLastAction: () => void;
  dismissUndo: () => void;
  emptyTrash: () => void;
  restoreAllTrash: () => void;

  // Settings & Storage
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetToSampleData: () => void;
  clearAllData: () => void;
  importBackupData: (data: { lists: List[]; items: ListItem[]; sections: ListSection[]; tags: Tag[]; settings?: AppSettings }) => void;
}

const STORAGE_KEY = 'listit_app_state_v2';

function loadStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.lists && parsed.items) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load stored state', e);
  }
  return null;
}

function persistState(state: {
  lists: List[];
  items: ListItem[];
  sections: ListSection[];
  tags: Tag[];
  settings: AppSettings;
}) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        lists: state.lists,
        items: state.items,
        sections: state.sections,
        tags: state.tags,
        settings: state.settings,
      })
    );
  } catch (e) {
    console.warn('Failed to persist state', e);
  }
}

const saved = loadStoredState();
if (saved?.settings) {
  sound.setEnabled(saved.settings.soundEnabled ?? true, saved.settings.hapticsEnabled ?? true);
}

export const useListStore = create<ListState>((set, get) => ({
  lists: saved?.lists || INITIAL_LISTS,
  items: saved?.items || INITIAL_ITEMS,
  sections: saved?.sections || INITIAL_SECTIONS,
  tags: saved?.tags || INITIAL_TAGS,
  settings: saved?.settings || INITIAL_SETTINGS,

  currentScreen: saved?.settings?.hasCompletedOnboarding ? (saved?.settings?.startScreen || 'home') : 'splash',
  previousScreens: [],
  activeListId: null,
  activeItemId: null,

  selectedItemIds: [],
  isMultiSelectMode: false,

  isCreateListOpen: false,
  isCreateItemOpen: false,
  isItemDetailOpen: false,
  isQuickAddOpen: false,
  isFilterModalOpen: false,
  isMoveModalOpen: false,
  isNotificationModalOpen: false,
  isQuickEntryOpen: false,
  isActionSheetOpen: false,

  lastUndo: null,
  undoTimer: null,

  // Navigation
  navigateTo: (screen, listId, itemId) => {
    sound.playClick();
    set((state) => ({
      previousScreens: [...state.previousScreens, state.currentScreen],
      currentScreen: screen,
      activeListId: listId !== undefined ? listId : state.activeListId,
      activeItemId: itemId !== undefined ? itemId : state.activeItemId,
      isMultiSelectMode: false,
      selectedItemIds: [],
    }));
  },

  goBack: () => {
    sound.playClick();
    set((state) => {
      const prev = [...state.previousScreens];
      const target = prev.pop() || 'home';
      return {
        previousScreens: prev,
        currentScreen: target,
        isMultiSelectMode: false,
        selectedItemIds: [],
      };
    });
  },

  openCreateList: () => {
    sound.playClick();
    set({ isCreateListOpen: true });
  },
  closeCreateList: () => set({ isCreateListOpen: false }),

  openCreateItem: (listId, sectionId) => {
    sound.playClick();
    set((state) => ({
      isCreateItemOpen: true,
      activeListId: listId || state.activeListId || 'inbox',
      activeItemId: sectionId || null,
    }));
  },
  closeCreateItem: () => set({ isCreateItemOpen: false }),

  openItemDetail: (itemId) => {
    sound.playClick();
    set({ isItemDetailOpen: true, activeItemId: itemId });
  },
  closeItemDetail: () => set({ isItemDetailOpen: false, activeItemId: null }),

  openQuickAdd: () => {
    sound.playClick();
    set({ isQuickAddOpen: true });
  },
  closeQuickAdd: () => set({ isQuickAddOpen: false }),

  setFilterModalOpen: (open) => set({ isFilterModalOpen: open }),
  setMoveModalOpen: (open) => set({ isMoveModalOpen: open }),
  setNotificationModalOpen: (open) => set({ isNotificationModalOpen: open }),
  setQuickEntryOpen: (open) => set({ isQuickEntryOpen: open }),
  openActionSheet: () => {
    sound.playClick();
    set({ isActionSheetOpen: true });
  },
  closeActionSheet: () => set({ isActionSheetOpen: false }),

  // Lists Management
  createList: (listData, initialSections = [], initialItems = []) => {
    sound.playCheck();
    const id = `list-${Date.now()}`;
    const newList: List = {
      id,
      name: listData.name || 'Untitled List',
      description: listData.description || '',
      icon: listData.icon || 'CheckSquare',
      color: listData.color || 'lavender',
      type: listData.type || 'checklist',
      layout: listData.layout || 'checklist',
      isFavorite: !!listData.isFavorite,
      isArchived: false,
      sortOrder: get().lists.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...listData,
    };

    const newSections: ListSection[] = initialSections.map((title, idx) => ({
      id: `sec-${id}-${idx}-${Date.now()}`,
      listId: id,
      title,
      sortOrder: idx + 1,
    }));

    const newItems: ListItem[] = initialItems.map((item, idx) => ({
      id: `item-${id}-${idx}-${Date.now()}`,
      listId: id,
      title: item.title || 'Untitled Item',
      isCompleted: false,
      priority: item.priority || 'none',
      status: 'not_started',
      tags: item.tags || [],
      subtasks: [],
      sortOrder: idx + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...item,
    }));

    set((state) => {
      const lists = [newList, ...state.lists];
      const sections = [...state.sections, ...newSections];
      const items = [...state.items, ...newItems];
      persistState({ ...state, lists, sections, items });
      return { lists, sections, items, isCreateListOpen: false };
    });

    return newList;
  },

  createListFromTemplate: (template) => {
    const sections = template.defaultSections || [];
    const items = (template.sampleItems || []).map((s) => ({
      title: s.title,
      priority: s.priority || 'none',
      quantity: s.quantity,
      price: s.price,
      tags: s.tags || [],
    }));

    return get().createList(
      {
        name: template.name,
        description: template.description,
        icon: template.icon,
        color: template.color,
        type: template.type,
        layout: template.layout,
      },
      sections,
      items
    );
  },

  updateList: (id, data) => {
    sound.playClick();
    set((state) => {
      const lists = state.lists.map((l) => (l.id === id ? { ...l, ...data, updatedAt: new Date().toISOString() } : l));
      persistState({ ...state, lists });
      return { lists };
    });
  },

  deleteList: (id) => {
    sound.playSwoosh();
    set((state) => {
      const targetList = state.lists.find((l) => l.id === id);
      if (!targetList) return state;

      const lists = state.lists.map((l) => (l.id === id ? { ...l, isDeleted: true, deletedAt: new Date().toISOString() } : l));
      const items = state.items.map((i) => (i.listId === id ? { ...i, isDeleted: true, deletedAt: new Date().toISOString() } : i));

      // Set undo
      if (state.undoTimer) clearTimeout(state.undoTimer);
      const timer = window.setTimeout(() => {
        get().dismissUndo();
      }, 6000);

      persistState({ ...state, lists, items });
      return {
        lists,
        items,
        currentScreen: state.currentScreen === 'list-detail' && state.activeListId === id ? 'lists' : state.currentScreen,
        lastUndo: {
          type: 'delete_list',
          lists: [targetList],
          message: `Deleted "${targetList.name}"`,
        },
        undoTimer: timer,
      };
    });
  },

  archiveList: (id) => {
    sound.playSwoosh();
    set((state) => {
      const lists = state.lists.map((l) => (l.id === id ? { ...l, isArchived: !l.isArchived, updatedAt: new Date().toISOString() } : l));
      persistState({ ...state, lists });
      return { lists };
    });
  },

  restoreList: (id) => {
    sound.playCheck();
    set((state) => {
      const lists = state.lists.map((l) => (l.id === id ? { ...l, isArchived: false, isDeleted: false } : l));
      persistState({ ...state, lists });
      return { lists };
    });
  },

  toggleFavoriteList: (id) => {
    sound.playClick();
    set((state) => {
      const lists = state.lists.map((l) => (l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
      persistState({ ...state, lists });
      return { lists };
    });
  },

  duplicateList: (id) => {
    sound.playClick();
    const source = get().lists.find((l) => l.id === id);
    if (!source) return;

    const newId = `list-${Date.now()}`;
    const duplicatedList: List = {
      ...source,
      id: newId,
      name: `${source.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sourceSections = get().sections.filter((s) => s.listId === id);
    const sectionMap = new Map<string, string>();
    const newSections: ListSection[] = sourceSections.map((s, idx) => {
      const sid = `sec-${newId}-${idx}-${Date.now()}`;
      sectionMap.set(s.id, sid);
      return {
        ...s,
        id: sid,
        listId: newId,
      };
    });

    const sourceItems = get().items.filter((i) => i.listId === id && !i.isDeleted);
    const newItems: ListItem[] = sourceItems.map((item, idx) => ({
      ...item,
      id: `item-${newId}-${idx}-${Date.now()}`,
      listId: newId,
      sectionId: item.sectionId ? sectionMap.get(item.sectionId) : undefined,
      isCompleted: false,
      completedAt: undefined,
      subtasks: (item.subtasks || []).map((st, sidx) => ({
        ...st,
        id: `sub-${newId}-${idx}-${sidx}`,
        isCompleted: false,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    set((state) => {
      const lists = [duplicatedList, ...state.lists];
      const sections = [...state.sections, ...newSections];
      const items = [...state.items, ...newItems];
      persistState({ ...state, lists, sections, items });
      return { lists, sections, items };
    });
  },

  permanentDeleteList: (id) => {
    sound.playSwoosh();
    set((state) => {
      const lists = state.lists.filter((l) => l.id !== id);
      const items = state.items.filter((i) => i.listId !== id);
      const sections = state.sections.filter((s) => s.listId !== id);
      persistState({ ...state, lists, items, sections });
      return { lists, items, sections };
    });
  },

  reorderLists: (reordered) => {
    set((state) => {
      persistState({ ...state, lists: reordered });
      return { lists: reordered };
    });
  },

  // Sections
  createSection: (listId, title) => {
    sound.playClick();
    const newSec: ListSection = {
      id: `sec-${listId}-${Date.now()}`,
      listId,
      title: title.trim() || 'New Section',
      sortOrder: get().sections.filter((s) => s.listId === listId).length + 1,
    };
    set((state) => {
      const sections = [...state.sections, newSec];
      persistState({ ...state, sections });
      return { sections };
    });
  },

  updateSection: (id, title) => {
    set((state) => {
      const sections = state.sections.map((s) => (s.id === id ? { ...s, title } : s));
      persistState({ ...state, sections });
      return { sections };
    });
  },

  deleteSection: (id) => {
    sound.playSwoosh();
    set((state) => {
      const sections = state.sections.filter((s) => s.id !== id);
      // Remove section from items
      const items = state.items.map((it) => (it.sectionId === id ? { ...it, sectionId: undefined } : it));
      persistState({ ...state, sections, items });
      return { sections, items };
    });
  },

  toggleCollapseSection: (id) => {
    set((state) => {
      const sections = state.sections.map((s) => (s.id === id ? { ...s, isCollapsed: !s.isCollapsed } : s));
      persistState({ ...state, sections });
      return { sections };
    });
  },

  // Items Management
  createItem: (itemData) => {
    sound.playClick();
    const listId = itemData.listId || get().activeListId || 'inbox';
    const newItem: ListItem = {
      id: `item-${Date.now()}`,
      listId,
      title: itemData.title || 'Untitled',
      notes: itemData.notes || '',
      isCompleted: false,
      priority: itemData.priority || 'none',
      status: itemData.status || 'not_started',
      dueDate: itemData.dueDate,
      reminderDate: itemData.reminderDate,
      recurrence: itemData.recurrence || 'none',
      tags: itemData.tags || [],
      subtasks: itemData.subtasks || [],
      quantity: itemData.quantity,
      price: itemData.price,
      unit: itemData.unit,
      store: itemData.store,
      sortOrder: get().items.filter((i) => i.listId === listId).length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...itemData,
    };

    set((state) => {
      const items = [newItem, ...state.items];
      persistState({ ...state, items });
      return { items, isCreateItemOpen: false, isQuickAddOpen: false };
    });

    return newItem;
  },

  updateItem: (id, data) => {
    set((state) => {
      const items = state.items.map((it) => (it.id === id ? { ...it, ...data, updatedAt: new Date().toISOString() } : it));
      persistState({ ...state, items });
      return { items };
    });
  },

  toggleCompleteItem: (id) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;

    const willBeCompleted = !item.isCompleted;

    if (willBeCompleted) {
      sound.playCheck();
    } else {
      sound.playUncheck();
    }

    set((state) => {
      const items = state.items.map((it) => {
        if (it.id === id) {
          return {
            ...it,
            isCompleted: willBeCompleted,
            status: (willBeCompleted ? 'completed' : 'not_started') as ItemStatus,
            completedAt: willBeCompleted ? new Date().toISOString() : undefined,
            updatedAt: new Date().toISOString(),
          };
        }
        return it;
      });

      // Check if entire list completed!
      if (willBeCompleted && item.listId !== 'inbox') {
        const listItems = items.filter((i) => i.listId === item.listId && !i.isDeleted && !i.isArchived);
        const allCompleted = listItems.length > 0 && listItems.every((i) => i.isCompleted);
        if (allCompleted) {
          sound.playCelebration();
          try {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.65 },
              colors: ['#A7F3D0', '#FEF08A', '#FED7AA', '#FBCFE8', '#BAE6FD', '#DDD6FE'],
            });
          } catch {
            // Ignore confetti errors
          }
        }
      }

      persistState({ ...state, items });
      return { items };
    });
  },

  deleteItem: (id) => {
    sound.playSwoosh();
    set((state) => {
      const target = state.items.find((i) => i.id === id);
      if (!target) return state;

      const items = state.items.map((it) => (it.id === id ? { ...it, isDeleted: true, deletedAt: new Date().toISOString() } : it));

      if (state.undoTimer) clearTimeout(state.undoTimer);
      const timer = window.setTimeout(() => {
        get().dismissUndo();
      }, 5000);

      persistState({ ...state, items });
      return {
        items,
        isItemDetailOpen: state.activeItemId === id ? false : state.isItemDetailOpen,
        lastUndo: {
          type: 'delete_item',
          items: [target],
          message: `Deleted "${target.title}"`,
        },
        undoTimer: timer,
      };
    });
  },

  archiveItem: (id) => {
    sound.playSwoosh();
    set((state) => {
      const target = state.items.find((i) => i.id === id);
      const items = state.items.map((it) => (it.id === id ? { ...it, isArchived: !it.isArchived, updatedAt: new Date().toISOString() } : it));
      persistState({ ...state, items });
      return {
        items,
        isItemDetailOpen: false,
        lastUndo: target ? { type: 'archive_item', items: [target], message: `Archived "${target.title}"` } : null,
      };
    });
  },

  restoreItem: (id) => {
    sound.playCheck();
    set((state) => {
      const items = state.items.map((it) => (it.id === id ? { ...it, isArchived: false, isDeleted: false } : it));
      persistState({ ...state, items });
      return { items };
    });
  },

  permanentDeleteItem: (id) => {
    sound.playSwoosh();
    set((state) => {
      const items = state.items.filter((it) => it.id !== id);
      persistState({ ...state, items });
      return { items, isItemDetailOpen: false };
    });
  },

  duplicateItem: (id) => {
    sound.playClick();
    const source = get().items.find((i) => i.id === id);
    if (!source) return;

    const newItem: ListItem = {
      ...source,
      id: `item-${Date.now()}`,
      title: `${source.title} (Copy)`,
      isCompleted: false,
      completedAt: undefined,
      subtasks: (source.subtasks || []).map((s, idx) => ({ ...s, id: `sub-${Date.now()}-${idx}`, isCompleted: false })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => {
      const items = [newItem, ...state.items];
      persistState({ ...state, items });
      return { items };
    });
  },

  moveItem: (itemId, targetListId, targetSectionId) => {
    sound.playClick();
    set((state) => {
      const items = state.items.map((it) =>
        it.id === itemId
          ? {
              ...it,
              listId: targetListId,
              sectionId: targetSectionId,
              updatedAt: new Date().toISOString(),
            }
          : it
      );
      persistState({ ...state, items });
      return { items, isMoveModalOpen: false };
    });
  },

  toggleFavoriteItem: (id) => {
    sound.playClick();
    set((state) => {
      const items = state.items.map((it) => (it.id === id ? { ...it, isFavorite: !it.isFavorite } : it));
      persistState({ ...state, items });
      return { items };
    });
  },

  reorderItems: (reordered) => {
    set((state) => {
      // Merge reordered items
      const reorderedMap = new Map(reordered.map((it, idx) => [it.id, { ...it, sortOrder: idx + 1 }]));
      const items = state.items.map((it) => reorderedMap.get(it.id) || it);
      persistState({ ...state, items });
      return { items };
    });
  },

  quickEntryBatch: (listId, lines, sectionId) => {
    sound.playCheck();
    const validLines = lines.map((l) => l.trim()).filter((l) => l.length > 0);
    if (validLines.length === 0) return;

    const newItems: ListItem[] = validLines.map((title, idx) => ({
      id: `item-${Date.now()}-${idx}`,
      listId,
      sectionId,
      title,
      isCompleted: false,
      priority: 'none',
      status: 'not_started',
      tags: [],
      subtasks: [],
      sortOrder: get().items.filter((i) => i.listId === listId).length + idx + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    set((state) => {
      const items = [...newItems, ...state.items];
      persistState({ ...state, items });
      return { items, isQuickEntryOpen: false };
    });
  },

  // Subtasks
  addSubtask: (itemId, title) => {
    sound.playClick();
    const trimmed = title.trim();
    if (!trimmed) return;

    const newSub: Subtask = {
      id: `sub-${Date.now()}`,
      title: trimmed,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    set((state) => {
      const items = state.items.map((it) =>
        it.id === itemId ? { ...it, subtasks: [...(it.subtasks || []), newSub], updatedAt: new Date().toISOString() } : it
      );
      persistState({ ...state, items });
      return { items };
    });
  },

  toggleSubtask: (itemId, subtaskId) => {
    sound.playClick();
    set((state) => {
      const items = state.items.map((it) => {
        if (it.id === itemId) {
          const subtasks = (it.subtasks || []).map((s) => (s.id === subtaskId ? { ...s, isCompleted: !s.isCompleted } : s));
          return { ...it, subtasks, updatedAt: new Date().toISOString() };
        }
        return it;
      });
      persistState({ ...state, items });
      return { items };
    });
  },

  deleteSubtask: (itemId, subtaskId) => {
    sound.playSwoosh();
    set((state) => {
      const items = state.items.map((it) => {
        if (it.id === itemId) {
          const subtasks = (it.subtasks || []).filter((s) => s.id !== subtaskId);
          return { ...it, subtasks, updatedAt: new Date().toISOString() };
        }
        return it;
      });
      persistState({ ...state, items });
      return { items };
    });
  },

  // Tags
  createTag: (name, color) => {
    sound.playClick();
    const trimmed = name.trim().toLowerCase().replace(/^#/, '');
    if (!trimmed) return;
    const newTag: Tag = {
      id: `tag-${Date.now()}`,
      name: trimmed,
      color: color || '#DDD6FE',
    };
    set((state) => {
      if (state.tags.some((t) => t.name === trimmed)) return state;
      const tags = [...state.tags, newTag];
      persistState({ ...state, tags });
      return { tags };
    });
  },

  deleteTag: (id) => {
    sound.playSwoosh();
    set((state) => {
      const tags = state.tags.filter((t) => t.id !== id);
      persistState({ ...state, tags });
      return { tags };
    });
  },

  // Multi-select
  toggleSelectItem: (id) => {
    sound.playClick();
    set((state) => {
      const selected = state.selectedItemIds.includes(id)
        ? state.selectedItemIds.filter((itemId) => itemId !== id)
        : [...state.selectedItemIds, id];
      return {
        selectedItemIds: selected,
        isMultiSelectMode: selected.length > 0,
      };
    });
  },

  selectAllItems: (itemIds) => {
    sound.playClick();
    set({
      selectedItemIds: itemIds,
      isMultiSelectMode: itemIds.length > 0,
    });
  },

  clearSelection: () => {
    set({ selectedItemIds: [], isMultiSelectMode: false });
  },

  bulkComplete: (complete) => {
    sound.playCheck();
    set((state) => {
      const targetIds = new Set(state.selectedItemIds);
      const items = state.items.map((it) =>
        targetIds.has(it.id)
          ? {
              ...it,
              isCompleted: complete,
              status: (complete ? 'completed' : 'not_started') as ItemStatus,
              completedAt: complete ? new Date().toISOString() : undefined,
            }
          : it
      );
      persistState({ ...state, items });
      return { items, selectedItemIds: [], isMultiSelectMode: false };
    });
  },

  bulkDelete: () => {
    sound.playSwoosh();
    set((state) => {
      const targetIds = new Set(state.selectedItemIds);
      const deletedItems = state.items.filter((it) => targetIds.has(it.id));
      const items = state.items.map((it) => (targetIds.has(it.id) ? { ...it, isDeleted: true, deletedAt: new Date().toISOString() } : it));

      if (state.undoTimer) clearTimeout(state.undoTimer);
      const timer = window.setTimeout(() => {
        get().dismissUndo();
      }, 5000);

      persistState({ ...state, items });
      return {
        items,
        selectedItemIds: [],
        isMultiSelectMode: false,
        lastUndo: {
          type: 'bulk_delete',
          items: deletedItems,
          message: `Deleted ${deletedItems.length} items`,
        },
        undoTimer: timer,
      };
    });
  },

  bulkMove: (targetListId) => {
    sound.playClick();
    set((state) => {
      const targetIds = new Set(state.selectedItemIds);
      const items = state.items.map((it) =>
        targetIds.has(it.id)
          ? {
              ...it,
              listId: targetListId,
              sectionId: undefined,
              updatedAt: new Date().toISOString(),
            }
          : it
      );
      persistState({ ...state, items });
      return { items, selectedItemIds: [], isMultiSelectMode: false, isMoveModalOpen: false };
    });
  },

  bulkArchive: () => {
    sound.playSwoosh();
    set((state) => {
      const targetIds = new Set(state.selectedItemIds);
      const items = state.items.map((it) => (targetIds.has(it.id) ? { ...it, isArchived: true, updatedAt: new Date().toISOString() } : it));
      persistState({ ...state, items });
      return { items, selectedItemIds: [], isMultiSelectMode: false };
    });
  },

  // Undo
  undoLastAction: () => {
    const undo = get().lastUndo;
    if (!undo) return;
    sound.playCheck();

    set((state) => {
      let items = state.items;
      let lists = state.lists;

      if (undo.type === 'delete_item' || undo.type === 'bulk_delete' || undo.type === 'archive_item') {
        const itemIds = new Set((undo.items || []).map((i) => i.id));
        items = state.items.map((it) => (itemIds.has(it.id) ? { ...it, isDeleted: false, isArchived: false } : it));
      } else if (undo.type === 'delete_list') {
        const listIds = new Set((undo.lists || []).map((l) => l.id));
        lists = state.lists.map((l) => (listIds.has(l.id) ? { ...l, isDeleted: false } : l));
        items = state.items.map((it) => (listIds.has(it.listId) ? { ...it, isDeleted: false } : it));
      }

      if (state.undoTimer) clearTimeout(state.undoTimer);
      persistState({ ...state, items, lists });
      return { items, lists, lastUndo: null, undoTimer: null };
    });
  },

  dismissUndo: () => {
    set((state) => {
      if (state.undoTimer) clearTimeout(state.undoTimer);
      return { lastUndo: null, undoTimer: null };
    });
  },

  emptyTrash: () => {
    sound.playSwoosh();
    set((state) => {
      const items = state.items.filter((it) => !it.isDeleted);
      const lists = state.lists.filter((l) => !l.isDeleted);
      persistState({ ...state, items, lists });
      return { items, lists };
    });
  },

  restoreAllTrash: () => {
    sound.playCheck();
    set((state) => {
      const items = state.items.map((it) => (it.isDeleted ? { ...it, isDeleted: false } : it));
      const lists = state.lists.map((l) => (l.isDeleted ? { ...l, isDeleted: false } : l));
      persistState({ ...state, items, lists });
      return { items, lists };
    });
  },

  // Settings & Storage
  updateSettings: (newSettings) => {
    sound.playClick();
    set((state) => {
      const settings = { ...state.settings, ...newSettings };
      sound.setEnabled(settings.soundEnabled, settings.hapticsEnabled);
      persistState({ ...state, settings });
      return { settings };
    });
  },

  resetToSampleData: () => {
    sound.playCheck();
    const fresh = {
      lists: DEMO_SAMPLE_LISTS,
      items: DEMO_SAMPLE_ITEMS,
      sections: [],
      tags: [],
      settings: { ...INITIAL_SETTINGS, hasCompletedOnboarding: true },
    };
    persistState(fresh);
    set({
      ...fresh,
      currentScreen: 'home',
      activeListId: null,
      activeItemId: null,
      selectedItemIds: [],
      isMultiSelectMode: false,
    });
  },

  clearAllData: () => {
    sound.playSwoosh();
    const empty = {
      lists: [],
      items: [],
      sections: [],
      tags: [],
      settings: { ...INITIAL_SETTINGS, hasCompletedOnboarding: true },
    };
    persistState(empty);
    set({
      ...empty,
      currentScreen: 'home',
      activeListId: null,
      activeItemId: null,
      selectedItemIds: [],
    });
  },

  importBackupData: (data) => {
    sound.playCheck();
    const updated = {
      lists: data.lists || [],
      items: data.items || [],
      sections: data.sections || [],
      tags: data.tags || [],
      settings: data.settings || INITIAL_SETTINGS,
    };
    persistState(updated);
    set({
      ...updated,
      currentScreen: 'home',
      activeListId: null,
      activeItemId: null,
    });
  },
}));
