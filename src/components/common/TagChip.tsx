import React from 'react';

interface TagChipProps {
  name: string;
  color?: string;
  onClick?: () => void;
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

export const TagChip: React.FC<TagChipProps> = ({
  name,
  color = '#DDD6FE',
  onClick,
  onRemove,
  size = 'md',
}) => {
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: size === 'sm' ? '2px 8px' : '4px 10px',
        backgroundColor: color,
        borderRadius: '9999px',
        border: '1.5px solid #18181B',
        boxShadow: '1px 1px 0px #18181B',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 700,
        color: '#18181B',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span>#{name}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove tag ${name}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            marginLeft: '2px',
            fontWeight: 800,
            fontSize: '11px',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      )}
    </span>
  );
};
