import React from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { ListCard } from '../components/cards/ListCard';
import { ItemCard } from '../components/cards/ItemCard';
import { EmptyState } from '../components/common/EmptyState';

export const FavoritesScreen: React.FC = () => {
  const { lists, items, navigateTo, openItemDetail, settings } = useListStore();
  const isDark = false;

  const favoriteLists = lists.filter((l) => l.isFavorite && !l.isDeleted && !l.isArchived);
  const favoriteItems = items.filter((i) => i.isFavorite && !i.isDeleted && !i.isArchived);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingBottom: '16px',
      }}
    >
      <AppHeader title="Favorites" subtitle="Starred lists & tasks" headerColor="yellow" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Favorite Lists */}
        {favoriteLists.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: isDark ? '#A1A1AA' : '#71717A',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Starred Lists ({favoriteLists.length})
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {favoriteLists.map((list) => (
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

        {/* Favorite Items */}
        {favoriteItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: isDark ? '#A1A1AA' : '#71717A',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Starred Tasks ({favoriteItems.length})
            </span>
            {favoriteItems.map((item) => (
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

        {favoriteLists.length === 0 && favoriteItems.length === 0 && (
          <EmptyState
            title="Your favorite lists will appear here."
            description="Star your most important lists and items for quick 1-tap access."
            illustration="lists"
          />
        )}
      </div>
    </div>
  );
};
