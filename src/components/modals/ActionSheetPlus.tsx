import React from 'react';
import { FolderPlus, CheckSquare, Lightbulb, Zap, X } from 'lucide-react';
import { useListStore } from '../../store/useListStore';

export const ActionSheetPlus: React.FC = () => {
  const {
    isActionSheetOpen,
    closeActionSheet,
    openCreateList,
    openCreateItem,
    openQuickAdd,
    lists,
    createList,
  } = useListStore();

  if (!isActionSheetOpen) return null;

  const handleNewList = () => {
    closeActionSheet();
    openCreateList();
  };

  const handleNewTask = () => {
    closeActionSheet();
    openCreateItem();
  };

  const handleNewIdea = () => {
    closeActionSheet();
    // Check if an "Ideas" list already exists, or create one if none
    let ideasList = lists.find(
      (l) => l.name.toLowerCase().includes('idea') && !l.isArchived && !l.isDeleted
    );
    if (!ideasList) {
      ideasList = createList({
        name: 'Ideas & Thoughts',
        icon: 'Lightbulb',
        color: 'yellow',
        type: 'ideas',
        layout: 'cards',
      });
    }
    openCreateItem(ideasList.id);
  };

  const handleQuickItem = () => {
    closeActionSheet();
    openQuickAdd();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="action-sheet-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(3px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={closeActionSheet}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          borderTop: '2px solid #18181B',
          borderLeft: '2px solid #18181B',
          borderRight: '2px solid #18181B',
          boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.15)',
          padding: '16px 20px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '36px',
              height: '4px',
              backgroundColor: '#E4E4E7',
              borderRadius: '9999px',
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '4px',
          }}
        >
          <div>
            <h3
              id="action-sheet-title"
              style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#18181B',
                margin: 0,
              }}
            >
              What do you want to add?
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: '#71717A',
                margin: '2px 0 0 0',
              }}
            >
              Choose what to create right now
            </p>
          </div>
          <button
            onClick={closeActionSheet}
            aria-label="Close"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#F4F4F5',
              border: '1.5px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} color="#18181B" />
          </button>
        </div>

        {/* Action Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* New List */}
          <button
            onClick={handleNewList}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: '16px',
              backgroundColor: '#F3E8FF',
              border: '1.5px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'transform 0.1s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FolderPlus size={22} color="#7E22CE" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#18181B' }}>
                New List
              </div>
              <div style={{ fontSize: '12px', color: '#6B21A8', fontWeight: 500 }}>
                Groceries, projects, packing, or custom
              </div>
            </div>
          </button>

          {/* New Task */}
          <button
            onClick={handleNewTask}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: '16px',
              backgroundColor: '#D1FAE5',
              border: '1.5px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'transform 0.1s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <CheckSquare size={22} color="#065F46" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#18181B' }}>
                New Task
              </div>
              <div style={{ fontSize: '12px', color: '#047857', fontWeight: 500 }}>
                Add to today, inbox, or a specific list
              </div>
            </div>
          </button>

          {/* New Idea */}
          <button
            onClick={handleNewIdea}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: '16px',
              backgroundColor: '#FEF08A',
              border: '1.5px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'transform 0.1s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Lightbulb size={22} color="#854D0E" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#18181B' }}>
                New Idea
              </div>
              <div style={{ fontSize: '12px', color: '#854D0E', fontWeight: 500 }}>
                Capture quick inspiration before it slips away
              </div>
            </div>
          </button>

          {/* Quick Item */}
          <button
            onClick={handleQuickItem}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 14px',
              borderRadius: '16px',
              backgroundColor: '#E0F2FE',
              border: '1.5px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'transform 0.1s ease',
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Zap size={22} color="#0369A1" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#18181B' }}>
                Quick Item
              </div>
              <div style={{ fontSize: '12px', color: '#0284C7', fontWeight: 500 }}>
                Rapid-fire multi-item entry
              </div>
            </div>
          </button>
        </div>

        {/* Cancel button */}
        <button
          onClick={closeActionSheet}
          style={{
            marginTop: '4px',
            padding: '12px',
            borderRadius: '14px',
            backgroundColor: '#F4F4F5',
            border: '1.5px solid #18181B',
            fontSize: '14px',
            fontWeight: 700,
            color: '#18181B',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
