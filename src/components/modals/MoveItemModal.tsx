import React from 'react';
import { useListStore } from '../../store/useListStore';
import { X, FolderInput, Check } from 'lucide-react';
import { IconRenderer } from '../common/IconRenderer';

export const MoveItemModal: React.FC = () => {
  const {
    isMoveModalOpen,
    setMoveModalOpen,
    activeItemId,
    items,
    lists,
    moveItem,
    bulkMove,
    selectedItemIds,
  } = useListStore();

  if (!isMoveModalOpen) return null;

  const handleSelectTargetList = (targetListId: string) => {
    if (selectedItemIds.length > 0) {
      bulkMove(targetListId);
    } else if (activeItemId) {
      moveItem(activeItemId, targetListId);
    }
    setMoveModalOpen(false);
  };

  const currentItem = items.find((i) => i.id === activeItemId);
  const currentListId = currentItem?.listId;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 24, 27, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={() => setMoveModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-pop"
        style={{
          width: '100%',
          maxWidth: '360px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '3px solid #18181B',
          boxShadow: '4px 4px 0px #18181B',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '14px 16px',
            borderBottom: '2px solid #18181B',
            backgroundColor: '#FED7AA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FolderInput size={18} color="#18181B" strokeWidth={2.5} />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#18181B' }}>
              Move {selectedItemIds.length > 0 ? `${selectedItemIds.length} Items` : 'Item'} to...
            </h3>
          </div>
          <button
            onClick={() => setMoveModalOpen(false)}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '320px', overflowY: 'auto' }}>
          {/* Inbox Option */}
          <button
            onClick={() => handleSelectTargetList('inbox')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '14px',
              border: '1.5px solid #18181B',
              backgroundColor: currentListId === 'inbox' ? '#DDD6FE' : '#FAFAFA',
              boxShadow: currentListId === 'inbox' ? '2px 2px 0px #18181B' : 'none',
              fontSize: '13px',
              fontWeight: 700,
              color: '#18181B',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📥</span>
              <span>Inbox</span>
            </div>
            {currentListId === 'inbox' && <Check size={16} strokeWidth={3} />}
          </button>

          {lists
            .filter((l) => !l.isDeleted && !l.isArchived)
            .map((list) => {
              const isCurrent = currentListId === list.id;
              return (
                <button
                  key={list.id}
                  onClick={() => handleSelectTargetList(list.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    border: '1.5px solid #18181B',
                    backgroundColor: isCurrent ? '#A7F3D0' : '#FAFAFA',
                    boxShadow: isCurrent ? '2px 2px 0px #18181B' : 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#18181B',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconRenderer name={list.icon} size={16} color="#18181B" />
                    <span>{list.name}</span>
                  </div>
                  {isCurrent && <Check size={16} strokeWidth={3} />}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
