import React from 'react';
import { Sparkles, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  illustration?: 'lists' | 'inbox' | 'completed' | 'search' | 'today';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  illustration = 'lists',
}) => {
  const renderIllustration = () => {
    switch (illustration) {
      case 'inbox':
        return (
          <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
            <rect x="15" y="25" width="70" height="50" rx="14" fill="#DDD6FE" stroke="#18181B" strokeWidth="2.5" />
            <path d="M15 48 H36 C38 48 40 54 44 54 H56 C60 54 62 48 64 48 H85" stroke="#18181B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="20" r="10" fill="#FEF08A" stroke="#18181B" strokeWidth="2.5" />
            <path d="M47 20 L50 23 L55 17" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'completed':
        return (
          <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
            <circle cx="50" cy="45" r="32" fill="#D1FAE5" stroke="#18181B" strokeWidth="2.5" />
            <path d="M38 46 L46 54 L62 38" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="24" cy="20" r="4" fill="#FEF08A" stroke="#18181B" strokeWidth="1.5" />
            <circle cx="78" cy="28" r="5" fill="#FBCFE8" stroke="#18181B" strokeWidth="1.5" />
          </svg>
        );
      case 'today':
        return (
          <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
            <rect x="20" y="18" width="60" height="60" rx="14" fill="#FEF08A" stroke="#18181B" strokeWidth="2.5" />
            <rect x="28" y="32" width="44" height="6" rx="3" fill="#18181B" />
            <rect x="28" y="46" width="32" height="6" rx="3" fill="#18181B" />
            <rect x="28" y="60" width="24" height="6" rx="3" fill="#18181B" />
            <path d="M35 12 V22 M65 12 V22" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
      case 'search':
        return (
          <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
            <circle cx="44" cy="40" r="22" fill="#BAE6FD" stroke="#18181B" strokeWidth="2.5" />
            <path d="M60 56 L76 72" stroke="#18181B" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="44" cy="40" r="10" stroke="#18181B" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        );
      case 'lists':
      default:
        return (
          <svg width="100" height="90" viewBox="0 0 100 90" fill="none">
            <rect x="22" y="18" width="56" height="60" rx="14" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
            <rect x="18" y="14" width="56" height="60" rx="14" fill="#A7F3D0" stroke="#18181B" strokeWidth="2.5" />
            <rect x="28" y="28" width="36" height="6" rx="3" fill="#18181B" />
            <rect x="28" y="42" width="28" height="6" rx="3" fill="#18181B" />
            <rect x="28" y="56" width="32" height="6" rx="3" fill="#18181B" />
          </svg>
        );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 20px',
        textAlign: 'center',
        gap: '12px',
      }}
    >
      <div style={{ marginBottom: '4px' }}>{renderIllustration()}</div>
      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#18181B' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: '#52525B', maxWidth: '280px', lineHeight: 1.45 }}>
        {description}
      </p>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="neo-btn neo-btn-yellow"
          style={{
            marginTop: '8px',
            fontSize: '13px',
            padding: '10px 18px',
          }}
        >
          <Plus size={16} strokeWidth={3} />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
