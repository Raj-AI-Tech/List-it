import React, { useState } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { ItemCard } from '../components/cards/ItemCard';
import { EmptyState } from '../components/common/EmptyState';
import { Plus, Sparkles } from 'lucide-react';

export const InboxScreen: React.FC = () => {
  const { items, createItem, openItemDetail, settings } = useListStore();
  const [quickInput, setQuickInput] = useState('');
  const isDark = false;

  const inboxItems = items.filter((i) => i.listId === 'inbox' && !i.isDeleted && !i.isArchived);
  const uncompleted = inboxItems.filter((i) => !i.isCompleted);
  const completed = inboxItems.filter((i) => i.isCompleted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    createItem({
      listId: 'inbox',
      title: quickInput.trim(),
    });
    setQuickInput('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingBottom: '16px',
      }}
    >
      <AppHeader
        title="Inbox"
        subtitle={
          uncompleted.length === 0
            ? 'Inbox is clear'
            : `${uncompleted.length} unorganized ${uncompleted.length === 1 ? 'item' : 'items'}`
        }
        headerColor="lavender"
        badge={uncompleted.length > 0 ? String(uncompleted.length) : undefined}
      />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Rapid Capture Input Bar */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: isDark ? '#27272A' : '#FFFFFF',
              borderRadius: '16px',
              border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
              boxShadow: isDark ? '1.5px 1.5px 0px #3F3F46' : '1.5px 1.5px 0px #18181B',
              padding: '10px 14px',
            }}
          >
            <Plus size={18} color={isDark ? '#A1A1AA' : '#71717A'} strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Dump a thought, to-do, or note..."
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                fontWeight: 600,
                color: isDark ? '#F4F4F5' : '#18181B',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 16px',
              borderRadius: '14px',
              backgroundColor: '#A7F3D0',
              border: '1.5px solid #18181B',
              boxShadow: '1.5px 1.5px 0px #18181B',
              fontSize: '13px',
              fontWeight: 800,
              color: '#064E3B',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Capture
          </button>
        </form>

        {/* Explain Card */}
        <div
          style={{
            padding: '10px 14px',
            borderRadius: '14px',
            backgroundColor: isDark ? '#3B2D54' : '#EDE9FE',
            border: isDark ? '1px solid #6B21A8' : '1px solid #C4B5FD',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            fontWeight: 600,
            color: isDark ? '#DDD6FE' : '#4C1D95',
          }}
        >
          <Sparkles size={16} />
          <span>Don't know where it belongs? Drop it here and organize later.</span>
        </div>

        {/* Uncompleted Items */}
        {uncompleted.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: isDark ? '#A1A1AA' : '#52525B',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Pending Items ({uncompleted.length})
            </span>
            {uncompleted.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => openItemDetail(item.id)}
              />
            ))}
          </div>
        )}

        {/* Completed items in Inbox */}
        {completed.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: isDark ? '#71717A' : '#A1A1AA',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Completed ({completed.length})
            </span>
            {completed.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => openItemDetail(item.id)}
              />
            ))}
          </div>
        )}

        {/* 13. Empty Inbox state */}
        {inboxItems.length === 0 && (
          <EmptyState
            title="Your inbox is clear."
            description="Capture something whenever it comes to mind."
            illustration="inbox"
          />
        )}
      </div>
    </div>
  );
};
