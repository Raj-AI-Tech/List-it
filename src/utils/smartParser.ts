import type { Priority } from '../types';

export interface ParsedItemData {
  title: string;
  tags: string[];
  priority: Priority;
  dueDate?: string; // YYYY-MM-DD
  quantity?: number;
  price?: number;
}

export function parseSmartInput(rawInput: string): ParsedItemData {
  let text = rawInput.trim();
  const tags: string[] = [];
  let priority: Priority = 'none';
  let dueDate: string | undefined = undefined;
  let quantity: number | undefined = undefined;
  let price: number | undefined = undefined;

  // 1. Extract hashtags #groceries, #work, #ideas
  const tagRegex = /#([\w-]+)/g;
  let tagMatch;
  while ((tagMatch = tagRegex.exec(text)) !== null) {
    const tag = tagMatch[1].toLowerCase();
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  text = text.replace(tagRegex, '').trim();

  // 2. Extract priority flags (!urgent, !high, !med, !medium, !low)
  if (/\b!urgent\b/i.test(text) || /\burgent\b/i.test(text)) {
    priority = 'urgent';
    text = text.replace(/\b!urgent\b|\burgent\b/gi, '').trim();
  } else if (/\b!high\b/i.test(text) || /\bhigh priority\b/i.test(text)) {
    priority = 'high';
    text = text.replace(/\b!high\b|\bhigh priority\b/gi, '').trim();
  } else if (/\b!med(ium)?\b/i.test(text) || /\bmedium priority\b/i.test(text)) {
    priority = 'medium';
    text = text.replace(/\b!med(ium)?\b|\bmedium priority\b/gi, '').trim();
  } else if (/\b!low\b/i.test(text) || /\blow priority\b/i.test(text)) {
    priority = 'low';
    text = text.replace(/\b!low\b|\blow priority\b/gi, '').trim();
  }

  // 3. Extract quantity: x4, *3, qty 2
  const qtyMatch = text.match(/(?:x|\*|\bqty:\s*|\bqty\s+)(\d+)\b/i);
  if (qtyMatch) {
    quantity = parseInt(qtyMatch[1], 10);
    text = text.replace(qtyMatch[0], '').trim();
  }

  // 4. Extract price: $25.50, ₹150, 45$
  const priceMatch = text.match(/(?:[$€£₹]\s*(\d+(?:\.\d{1,2})?)|(\d+(?:\.\d{1,2})?)\s*[$€£₹])/);
  if (priceMatch) {
    const val = priceMatch[1] || priceMatch[2];
    price = parseFloat(val);
    text = text.replace(priceMatch[0], '').trim();
  }

  // 5. Extract dates: today, tomorrow, next week, in X days, day of week
  const now = new Date();

  if (/\btomorrow\b/i.test(text)) {
    const d = new Date(now);
    d.setDate(d.getDate() + 1);
    dueDate = d.toISOString().split('T')[0];
    text = text.replace(/\btomorrow\b/gi, '').trim();
  } else if (/\btoday\b|\btonight\b/i.test(text)) {
    dueDate = now.toISOString().split('T')[0];
    text = text.replace(/\btoday\b|\btonight\b/gi, '').trim();
  } else if (/\bnext week\b/i.test(text)) {
    const d = new Date(now);
    d.setDate(d.getDate() + 7);
    dueDate = d.toISOString().split('T')[0];
    text = text.replace(/\bnext week\b/gi, '').trim();
  } else if (/\bthis weekend\b/i.test(text)) {
    const d = new Date(now);
    const day = d.getDay();
    const diff = (6 - day + 7) % 7 || 7; // Nearest Saturday
    d.setDate(d.getDate() + diff);
    dueDate = d.toISOString().split('T')[0];
    text = text.replace(/\bthis weekend\b/gi, '').trim();
  } else {
    const inDaysMatch = text.match(/\bin\s+(\d+)\s+days?\b/i);
    if (inDaysMatch) {
      const days = parseInt(inDaysMatch[1], 10);
      const d = new Date(now);
      d.setDate(d.getDate() + days);
      dueDate = d.toISOString().split('T')[0];
      text = text.replace(inDaysMatch[0], '').trim();
    }
  }

  // Clean double spaces or leading/trailing punctuation left over
  const cleanTitle = text.replace(/\s+/g, ' ').replace(/^[-:,\s]+|[-:,\s]+$/g, '').trim() || rawInput.trim();

  return {
    title: cleanTitle,
    tags,
    priority,
    dueDate,
    quantity,
    price,
  };
}
