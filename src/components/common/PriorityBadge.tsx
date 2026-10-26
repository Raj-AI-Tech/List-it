import React from 'react';
import { Priority } from '../../types';
import { PRIORITY_CONFIG } from '../../constants/theme';
import { AlertCircle, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md';
  onClick?: () => void;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'md',
  onClick,
}) => {
  if (priority === 'none') return null;

  const cfg = PRIORITY_CONFIG[priority];

  const renderIcon = () => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle size={12} strokeWidth={3} />;
      case 'high':
        return <ArrowUp size={12} strokeWidth={3} />;
      case 'medium':
        return <ArrowRight size={12} strokeWidth={3} />;
      case 'low':
        return <ArrowDown size={12} strokeWidth={3} />;
      default:
        return null;
    }
  };

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: size === 'sm' ? '1px 6px' : '3px 8px',
        backgroundColor: cfg.bg,
        color: '#18181B',
        borderRadius: '9999px',
        border: '1.5px solid #18181B',
        boxShadow: '1px 1px 0px #18181B',
        fontSize: size === 'sm' ? '10px' : '11px',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '0.4px',
        cursor: onClick ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
      }}
    >
      {renderIcon()}
      <span>{cfg.label}</span>
    </span>
  );
};
