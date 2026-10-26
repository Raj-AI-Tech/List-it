import React, { useState, useMemo } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { ItemCard } from '../components/cards/ItemCard';
import { ListCard } from '../components/cards/ListCard';
import { EmptyState } from '../components/common/EmptyState';
import { Search, X } from 'lucide-react';

export const SearchScreen: React.FC = () => {
  const { items, lists, navigateTo, openItemDetail } = useListStore();
  const [query, setQuery] = useState('');

  const activeLists = lists.filter((l) => !l.isDeleted && !l.isArchived);
  const activeItems = items.filter((i) => !i.isDeleted && !i.isArchived);

  const trimmed = query.trim().toLowerCase();

  const matchingLists = useMemo(() => {
    if (!trimmed) return [];
    return activeLists.filter(
      (l) => l.name.toLowerCase().includes(trimmed) || (l.description && l.description.toLowerCase().includes(trimmed))
    );
  }, [activeLists, trimmed]);

  const matchingItems = useMemo(() => {
    if (!trimmed) return [];
    return activeItems.filter((i) => {
      const matchTitle = i.title.toLowerCase().includes(trimmed);
      const matchNotes = i.notes && i.notes.toLowerCase().includes(trimmed);
      const matchTags = i.tags && i.tags.some((t) => t.toLowerCase().includes(trimmed));
      const matchSubtasks = i.subtasks && i.subtasks.some((st) => st.title.toLowerCase().includes(trimmed));
      return matchTitle || matchNotes || matchTags || matchSubtasks;
    });
  }, [activeItems, trimmed]);

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
      <AppHeader title="Search Everything" headerColor="white" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            border: '2px solid #18181B',
            boxShadow: '2px 2px 0px #18181B',
            padding: '12px 16px',
          }}
        >
          <Search size={18} color="#18181B" strokeWidth={2.5} />
          <input
            type="text"
            autoFocus
            placeholder="Search tasks, lists, tags, notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              fontSize: '15px',
              fontWeight: 700,
              color: '#18181B',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Results */}
        {trimmed ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Matching Lists */}
            {matchingLists.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#52525B', textTransform: 'uppercase' }}>
                  Matching Lists ({matchingLists.length})
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                  {matchingLists.map((list) => (
                    <ListCard
                      key={list.id}
                      list={list}
                      items={items}
                      onClick={() => navigateTo('list-detail', list.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Matching Items */}
            {matchingItems.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#52525B', textTransform: 'uppercase' }}>
                  Matching Tasks ({matchingItems.length})
                </span>
                {matchingItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => openItemDetail(item.id)}
                    showListBadge={true}
                    listName={lists.find((l) => l.id === item.listId)?.name}
                  />
                ))}
              </div>
            )}

            {matchingLists.length === 0 && matchingItems.length === 0 && (
              <EmptyState
                title="No results found"
                description={`We couldn't find anything matching "${query}". Try searching for groceries, ideas, or projects.`}
                illustration="search"
              />
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#71717A', textTransform: 'uppercase' }}>
              Suggested Searches
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['groceries', 'project', 'milk', 'ideas', 'react', 'books'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #18181B',
                    boxShadow: '1.5px 1.5px 0px #18181B',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  "{term}"
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
