import React from 'react';
import { useListStore } from '../../store/useListStore';
import { CheckSquare, FolderInput, Archive, Trash2, X } from 'lucide-react';

export const MultiSelectBar: React.FC = () => {
  const {
    isMultiSelectMode,
    selectedItemIds,
    clearSelection,
    bulkComplete,
    bulkDelete,
    bulkArchive,
    setMoveModalOpen,
  } = useListStore();

  if (!isMultiSelectMode || selectedItemIds.length === 0) return null;

  return (
    <div
      className="animate-slide-up"
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: '400px',
        backgroundColor: '#18181B',
        borderRadius: '20px',
        padding: '10px 16px',
        border: '2px solid #FEF08A',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 3px 3px 0px #FEF08A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 55,
        gap: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={clearSelection}
          aria-label="Cancel selection"
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: '#3F3F46',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={14} />
        </button>
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#FEF08A' }}>
          {selectedItemIds.length} selected
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Bulk Complete */}
        <button
          onClick={() => bulkComplete(true)}
          title="Mark Selected Complete"
          style={{
            padding: '6px 10px',
            borderRadius: '10px',
            backgroundColor: '#A7F3D0',
            border: '1.5px solid #18181B',
            color: '#064E3B',
            fontSize: '11px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <CheckSquare size={13} strokeWidth={2.5} />
          <span>Done</span>
        </button>

        {/* Bulk Move */}
        <button
          onClick={() => setMoveModalOpen(true)}
          title="Move Selected Items"
          style={{
            padding: '6px 10px',
            borderRadius: '10px',
            backgroundColor: '#FED7AA',
            border: '1.5px solid #18181B',
            color: '#7C2D12',
            fontSize: '11px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <FolderInput size={13} strokeWidth={2.5} />
          <span>Move</span>
        </button>

        {/* Bulk Archive */}
        <button
          onClick={bulkArchive}
          title="Archive Selected"
          style={{
            padding: '6px',
            borderRadius: '10px',
            backgroundColor: '#3F3F46',
            color: '#F4F4F5',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Archive size={14} />
        </button>

        {/* Bulk Delete */}
        <button
          onClick={bulkDelete}
          title="Delete Selected"
          style={{
            padding: '6px',
            borderRadius: '10px',
            backgroundColor: '#DC2626',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};
