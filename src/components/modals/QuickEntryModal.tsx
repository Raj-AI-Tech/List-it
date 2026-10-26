import React, { useState } from 'react';
import { useListStore } from '../../store/useListStore';
import { X, Sparkles, ListPlus } from 'lucide-react';

interface QuickEntryModalProps {
  listId: string;
}

export const QuickEntryModal: React.FC<QuickEntryModalProps> = ({ listId }) => {
  const { isQuickEntryOpen, setQuickEntryOpen, quickEntryBatch, lists } = useListStore();
  const [text, setText] = useState('');

  if (!isQuickEntryOpen) return null;

  const currentList = lists.find((l) => l.id === listId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = text.split('\n');
    quickEntryBatch(listId, lines);
    setText('');
    setQuickEntryOpen(false);
  };

  const lineCount = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0).length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 24, 27, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 65,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={() => setQuickEntryOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '430px',
          maxHeight: '85vh',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          border: '3px solid #18181B',
          borderBottom: 'none',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #18181B',
            backgroundColor: '#A7F3D0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ListPlus size={18} color="#064E3B" strokeWidth={2.5} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#064E3B' }}>
                Rapid Multi-Line Entry
              </h3>
              <span style={{ fontSize: '11px', color: '#065F46', fontWeight: 600 }}>
                Adding to {currentList?.name || 'List'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setQuickEntryOpen(false)}
            aria-label="Close"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={15} color="#18181B" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '12px', color: '#52525B', lineHeight: 1.4 }}>
            Type or paste multiple items separated by new lines. Each line creates a new item!
          </p>

          <textarea
            autoFocus
            rows={8}
            placeholder={"Almond Milk\nEggs\nSourdough Bread\nAvocados\nGreek Yogurt"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '16px',
              border: '2px solid #18181B',
              fontSize: '14px',
              fontFamily: 'var(--font-main)',
              lineHeight: 1.6,
              backgroundColor: '#FAFAFA',
              boxShadow: '2px 2px 0px #18181B',
              resize: 'none',
            }}
          />

          <button
            type="submit"
            disabled={lineCount === 0}
            className="neo-btn neo-btn-yellow"
            style={{
              padding: '12px',
              fontSize: '14px',
              width: '100%',
              opacity: lineCount === 0 ? 0.6 : 1,
            }}
          >
            <Sparkles size={16} />
            <span>Create {lineCount} {lineCount === 1 ? 'Item' : 'Items'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
