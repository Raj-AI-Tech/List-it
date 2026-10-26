import React from 'react';
import { ArrowLeft, MoreHorizontal, Search, SlidersHorizontal, Plus } from 'lucide-react';
import { useListStore } from '../../store/useListStore';
import { IconRenderer } from './IconRenderer';

interface AppHeaderProps {
  title: string;
  icon?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  subtitle?: string;
  badge?: string;
  headerColor?: 'mint' | 'yellow' | 'lavender' | 'white';
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  icon,
  showBack = false,
  onBack,
  rightAction,
  subtitle,
  badge,
  headerColor = 'mint',
}) => {
  const { goBack } = useListStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  const getHeaderBg = () => {
    switch (headerColor) {
      case 'mint':
        return '#D1FAE5';
      case 'yellow':
        return '#FEF08A';
      case 'lavender':
        return '#DDD6FE';
      case 'white':
      default:
        return '#FFFFFF';
    }
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        gap: '12px',
        position: 'sticky',
        top: 0,
        zIndex: 25,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Left section: Back button or icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
        {showBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
            }}
          >
            <ArrowLeft size={18} color="#18181B" strokeWidth={2.5} />
          </button>
        )}

        {/* Central Title Pill (Matches reference top bar "Living room" style!) */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: getHeaderBg(),
            padding: '8px 16px',
            borderRadius: '16px',
            border: '2px solid #18181B',
            boxShadow: '2px 2px 0px #18181B',
            minWidth: 0,
          }}
        >
          {icon && <IconRenderer name={icon} size={18} color="#18181B" />}
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <h1
              style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#18181B',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.15,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'rgba(24, 24, 27, 0.7)',
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
          {badge && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                backgroundColor: '#18181B',
                color: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: '9999px',
                marginLeft: '4px',
              }}
            >
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Right actions */}
      {rightAction && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {rightAction}
        </div>
      )}
    </header>
  );
};
