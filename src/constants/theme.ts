export interface ColorTheme {
  id: string;
  name: string;
  bg: string;
  cardBg: string;
  border: string;
  shadow: string;
  text: string;
  textMuted: string;
}

export const LIST_COLORS: Record<string, { bg: string; border: string; text: string; badge: string; lightBg: string }> = {
  mint: {
    bg: '#A7F3D0',
    border: '#18181B',
    text: '#064E3B',
    badge: '#D1FAE5',
    lightBg: '#ECFDF5',
  },
  yellow: {
    bg: '#FEF08A',
    border: '#18181B',
    text: '#713F12',
    badge: '#FEF9C3',
    lightBg: '#FEFCE8',
  },
  peach: {
    bg: '#FED7AA',
    border: '#18181B',
    text: '#7C2D12',
    badge: '#FFEDD5',
    lightBg: '#FFF7ED',
  },
  pink: {
    bg: '#FBCFE8',
    border: '#18181B',
    text: '#831843',
    badge: '#FCE7F3',
    lightBg: '#FDF2F8',
  },
  blue: {
    bg: '#BAE6FD',
    border: '#18181B',
    text: '#0C4A6E',
    badge: '#E0F2FE',
    lightBg: '#F0F9FF',
  },
  lavender: {
    bg: '#DDD6FE',
    border: '#18181B',
    text: '#4C1D95',
    badge: '#EDE9FE',
    lightBg: '#F5F3FF',
  },
  cream: {
    bg: '#FEF3C7',
    border: '#18181B',
    text: '#78350F',
    badge: '#FFFBEB',
    lightBg: '#FFFDF5',
  },
};

export const COLOR_KEYS = Object.keys(LIST_COLORS) as Array<keyof typeof LIST_COLORS>;

export const PRIORITY_CONFIG = {
  none: { label: 'None', color: '#9CA3AF', bg: '#F3F4F6', border: '#D1D5DB' },
  low: { label: 'Low', color: '#059669', bg: '#D1FAE5', border: '#18181B' },
  medium: { label: 'Medium', color: '#D97706', bg: '#FEF08A', border: '#18181B' },
  high: { label: 'High', color: '#EA580C', bg: '#FFEDD5', border: '#18181B' },
  urgent: { label: 'Urgent', color: '#DC2626', bg: '#FEE2E2', border: '#18181B' },
};

export const AVAILABLE_ICONS = [
  'CheckSquare',
  'ShoppingCart',
  'FolderGit2',
  'Lightbulb',
  'GraduationCap',
  'Luggage',
  'Film',
  'BookOpen',
  'Target',
  'Coffee',
  'Heart',
  'Sparkles',
  'Home',
  'Briefcase',
  'Dumbbell',
  'Smile',
  'Compass',
  'Music',
  'DollarSign',
  'Code',
];
