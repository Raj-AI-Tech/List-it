import type { List, ListItem, ListSection, Tag, AppSettings } from '../types';

export interface FullBackupData {
  version: number;
  exportedAt: string;
  lists: List[];
  items: ListItem[];
  sections: ListSection[];
  tags: Tag[];
  settings?: AppSettings;
}

export function exportToJSON(
  lists: List[],
  items: ListItem[],
  sections: ListSection[],
  tags: Tag[],
  settings: AppSettings
) {
  const data: FullBackupData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    lists,
    items,
    sections,
    tags,
    settings,
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `ListIt_Backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToCSV(lists: List[], items: ListItem[]) {
  const listMap = new Map<string, string>();
  lists.forEach((l) => listMap.set(l.id, l.name));
  listMap.set('inbox', 'Inbox');

  const headers = ['List', 'Title', 'Completed', 'Priority', 'Status', 'Due Date', 'Tags', 'Notes'];
  const rows = items
    .filter((item) => !item.isDeleted)
    .map((item) => {
      const listName = listMap.get(item.listId) || 'Unknown List';
      const tagsStr = item.tags ? item.tags.join(';') : '';
      const notesClean = (item.notes || '').replace(/"/g, '""');
      const titleClean = item.title.replace(/"/g, '""');

      return [
        `"${listName}"`,
        `"${titleClean}"`,
        item.isCompleted ? 'YES' : 'NO',
        `"${item.priority}"`,
        `"${item.status}"`,
        `"${item.dueDate || ''}"`,
        `"${tagsStr}"`,
        `"${notesClean}"`,
      ].join(',');
    });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', encodedUri);
  downloadAnchor.setAttribute('download', `ListIt_Tasks_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToTXT(lists: List[], items: ListItem[]) {
  const listMap = new Map<string, string>();
  lists.forEach((l) => listMap.set(l.id, l.name));
  listMap.set('inbox', 'Inbox');

  let text = `==============================\nLIST IT — EXPORTED LISTS & TASKS\nDate: ${new Date().toLocaleDateString()}\n==============================\n\n`;

  const groups = new Map<string, ListItem[]>();
  items
    .filter((it) => !it.isDeleted)
    .forEach((it) => {
      const lid = it.listId;
      if (!groups.has(lid)) groups.set(lid, []);
      groups.get(lid)!.push(it);
    });

  // Inbox first
  if (groups.has('inbox')) {
    text += `📥 INBOX\n------------------------------\n`;
    groups.get('inbox')!.forEach((item) => {
      const check = item.isCompleted ? '[X]' : '[ ]';
      text += `${check} ${item.title}${item.dueDate ? ` (Due: ${item.dueDate})` : ''}\n`;
    });
    text += `\n`;
  }

  lists.forEach((l) => {
    const listItems = groups.get(l.id) || [];
    text += `📋 ${l.name.toUpperCase()}\n------------------------------\n`;
    if (listItems.length === 0) {
      text += `  (No items in this list)\n`;
    } else {
      listItems.forEach((item) => {
        const check = item.isCompleted ? '[X]' : '[ ]';
        text += `  ${check} ${item.title}${item.priority !== 'none' ? ` [${item.priority.toUpperCase()}]` : ''}${
          item.dueDate ? ` (Due: ${item.dueDate})` : ''
        }\n`;
        if (item.subtasks && item.subtasks.length > 0) {
          item.subtasks.forEach((st) => {
            text += `      ${st.isCompleted ? '✓' : '•'} ${st.title}\n`;
          });
        }
      });
    }
    text += `\n`;
  });

  const encoded = `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', encoded);
  downloadAnchor.setAttribute('download', `ListIt_Summary_${new Date().toISOString().split('T')[0]}.txt`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseImportJSON(fileContent: string): FullBackupData {
  const parsed = JSON.parse(fileContent);
  if (!parsed.lists || !parsed.items) {
    throw new Error('Invalid List It backup format: missing lists or items array.');
  }
  return parsed as FullBackupData;
}
