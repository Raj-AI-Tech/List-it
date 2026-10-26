import React from 'react';
import { useListStore } from '../../store/useListStore';
import { RotateCcw, X } from 'lucide-react';

export const UndoSnackbar: React.FC = () => {
  const { lastUndo, undoLastAction, dismissUndo } = useListStore();

  if (!lastUndo) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '84px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: '92%',
        maxWidth: '380px',
      }}
    >
      <div
        className="animate-slide-up"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: '#18181B',
          color: '#FFFFFF',
          borderRadius: '18px',
          border: '2px solid #FEF08A',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), 3px 3px 0px #FEF08A',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: '#F4F4F5',
          }}
        >
          {lastUndo.message}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={undoLastAction}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: '#FEF08A',
              color: '#18181B',
              border: '1.5px solid #18181B',
              fontWeight: 800,
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '1.5px 1.5px 0px #FFFFFF',
            }}
          >
            <RotateCcw size={13} strokeWidth={3} />
            <span>Undo</span>
          </button>

          <button
            onClick={dismissUndo}
            aria-label="Dismiss undo notification"
            style={{
              background: 'none',
              border: 'none',
              color: '#A1A1AA',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px',
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
