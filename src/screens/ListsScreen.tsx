import React, { useState } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { ListCard } from '../components/cards/ListCard';
import { EmptyState } from '../components/common/EmptyState';
import { LayoutGrid, List as ListIcon, Plus, Search, X } from 'lucide-react';

export const ListsScreen: React.FC = () => {
  const { lists, items, openCreateList, navigateTo, settings } = useListStore();
  const [layout, setLayout] = useState<'grid' | 'compact'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const isDark = false;
  const activeLists = lists.filter((l) => !l.isDeleted && !l.isArchived);

  const filteredLists = activeLists.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.description && l.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'favorites' && l.isFavorite) ||
      l.type === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
        title="My Lists"
        subtitle={
          activeLists.length === 0
            ? 'No lists yet'
            : `${activeLists.length} ${activeLists.length === 1 ? 'list' : 'lists'}`
        }
        headerColor="mint"
        rightAction={
          <button
            onClick={openCreateList}
            aria-label="Create new list"
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 800,
              borderRadius: '12px',
              backgroundColor: '#FEF08A',
              border: '1.5px solid #18181B',
              boxShadow: '1.5px 1.5px 0px #18181B',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: '#18181B',
            }}
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>New List</span>
          </button>
        }
      />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Search & Layout Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isDark ? '#27272A' : '#FFFFFF',
              borderRadius: '16px',
              border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
              padding: '8px 12px',
              boxShadow: isDark ? '1.5px 1.5px 0px #3F3F46' : '1.5px 1.5px 0px #18181B',
            }}
          >
            <Search size={16} color={isDark ? '#A1A1AA' : '#71717A'} />
            <input
              type="text"
              placeholder="Search lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                fontWeight: 600,
                color: isDark ? '#F4F4F5' : '#18181B',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={14} color={isDark ? '#A1A1AA' : '#71717A'} />
              </button>
            )}
          </div>

          {/* Grid / Compact Toggle */}
          <div
            style={{
              display: 'flex',
              borderRadius: '14px',
              border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
              backgroundColor: isDark ? '#27272A' : '#FFFFFF',
              padding: '2px',
              boxShadow: isDark ? '1.5px 1.5px 0px #3F3F46' : '1.5px 1.5px 0px #18181B',
            }}
          >
            <button
              onClick={() => setLayout('grid')}
              aria-label="Grid layout"
              style={{
                padding: '6px 8px',
                borderRadius: '10px',
                backgroundColor: layout === 'grid' ? (isDark ? '#3F3F46' : '#FEF08A') : 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <LayoutGrid size={16} color={isDark ? '#F4F4F5' : '#18181B'} />
            </button>
            <button
              onClick={() => setLayout('compact')}
              aria-label="Compact list layout"
              style={{
                padding: '6px 8px',
                borderRadius: '10px',
                backgroundColor: layout === 'compact' ? (isDark ? '#3F3F46' : '#FEF08A') : 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ListIcon size={16} color={isDark ? '#F4F4F5' : '#18181B'} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'all', label: 'All Lists' },
            { id: 'favorites', label: '★ Favorites' },
            { id: 'checklist', label: 'Checklists' },
            { id: 'shopping', label: 'Shopping' },
            { id: 'project', label: 'Projects' },
            { id: 'ideas', label: 'Ideas' },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '12px',
                  border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
                  backgroundColor: isSelected
                    ? isDark
                      ? '#34D399'
                      : '#18181B'
                    : isDark
                    ? '#27272A'
                    : '#FFFFFF',
                  color: isSelected
                    ? isDark
                      ? '#064E3B'
                      : '#FFFFFF'
                    : isDark
                    ? '#D4D4D8'
                    : '#18181B',
                  boxShadow: isSelected ? '1.5px 1.5px 0px #18181B' : 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Collection Display */}
        {filteredLists.length === 0 ? (
          <EmptyState
            title="You don't have any lists yet."
            description="Create one for anything."
            actionText="Create List"
            onAction={openCreateList}
            illustration="lists"
          />
        ) : (
          <div
            style={
              layout === 'grid'
                ? {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '12px',
                  }
                : {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }
            }
          >
            {filteredLists.map((list) => (
              <ListCard
                key={list.id}
                list={list}
                items={items}
                layout={layout}
                onClick={() => navigateTo('list-detail', list.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
