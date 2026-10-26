import React, { useState } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { ItemCard } from '../components/cards/ItemCard';
import { Plus, X } from 'lucide-react';

export const TagsScreen: React.FC = () => {
  const { tags, items, lists, createTag, openItemDetail } = useListStore();
  const [selectedTagName, setSelectedTagName] = useState<string | null>(null);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor] = useState('#DDD6FE');
  const [isCreating, setIsCreating] = useState(false);

  const activeItems = items.filter((i) => !i.isDeleted && !i.isArchived);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTagName.trim()) {
      createTag(newTagName.trim(), newTagColor);
      setNewTagName('');
      setIsCreating(false);
    }
  };

  const tagCounts = new Map<string, number>();
  activeItems.forEach((it) => {
    (it.tags || []).forEach((t) => {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    });
  });

  const matchingItems = selectedTagName
    ? activeItems.filter((it) => it.tags?.includes(selectedTagName))
    : [];

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingBottom: '24px',
      }}
    >
      <AppHeader
        title="Tags Hub"
        headerColor="lavender"
        rightAction={
          <button
            onClick={() => setIsCreating(true)}
            className="neo-btn neo-btn-yellow"
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            <Plus size={14} />
            <span>New Tag</span>
          </button>
        }
      />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Create Tag Modal / Box */}
        {isCreating && (
          <form
            onSubmit={handleCreate}
            className="neo-card animate-pop"
            style={{
              padding: '14px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800 }}>Create Custom Tag</span>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                autoFocus
                placeholder="tag-name"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '12px',
                  border: '1.5px solid #18181B',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              />
              <button type="submit" className="neo-btn neo-btn-mint" style={{ padding: '8px 14px', fontSize: '12px' }}>
                Save
              </button>
            </div>
          </form>
        )}

        {/* Tags Cloud Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map((tag) => {
            const isSelected = selectedTagName === tag.name;
            const count = tagCounts.get(tag.name) || 0;

            return (
              <button
                key={tag.id}
                onClick={() => setSelectedTagName(isSelected ? null : tag.name)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  backgroundColor: isSelected ? '#18181B' : tag.color,
                  color: isSelected ? '#FFFFFF' : '#18181B',
                  border: '2px solid #18181B',
                  boxShadow: isSelected ? '2.5px 2.5px 0px #FEF08A' : '1.5px 1.5px 0px #18181B',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                }}
              >
                <span>#{tag.name}</span>
                <span
                  style={{
                    fontSize: '10px',
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? '#FFFFFF' : 'rgba(24, 24, 27, 0.15)',
                    color: isSelected ? '#18181B' : '#18181B',
                    fontWeight: 800,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filtered items matching selected tag */}
        {selectedTagName && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#18181B' }}>
                Items tagged #{selectedTagName} ({matchingItems.length})
              </span>
              <button
                onClick={() => setSelectedTagName(null)}
                style={{ fontSize: '11px', fontWeight: 700, color: '#71717A', textDecoration: 'underline' }}
              >
                Clear filter
              </button>
            </div>

            {matchingItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => openItemDetail(item.id)}
                showListBadge={true}
                listName={lists.find((l) => l.id === item.listId)?.name}
              />
            ))}

            {matchingItems.length === 0 && (
              <div style={{ padding: '16px', textAlign: 'center', color: '#71717A', fontSize: '13px' }}>
                No active items tagged with #{selectedTagName}.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
