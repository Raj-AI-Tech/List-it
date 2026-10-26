import React from 'react';
import { Home, FolderHeart, Inbox, Plus, Grid } from 'lucide-react';
import { useListStore } from '../../store/useListStore';
import { sound } from '../../utils/sound';

export const BottomNavigation: React.FC = () => {
  const { currentScreen, navigateTo, openActionSheet, items } = useListStore();
  const isDark = false;

  const inboxCount = items.filter(
    (i) => i.listId === 'inbox' && !i.isCompleted && !i.isDeleted && !i.isArchived
  ).length;

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'lists', label: 'Lists', icon: FolderHeart },
    { id: 'add-action', label: 'Add', icon: Plus, isAction: true },
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: inboxCount > 0 ? inboxCount : undefined },
    { id: 'more', label: 'More', icon: Grid },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      style={{
        flexShrink: 0,
        width: '100%',
        padding: '6px 12px 8px 12px',
        paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderTop: '1.5px solid #18181B',
        boxShadow: '0 -3px 12px rgba(0, 0, 0, 0.04)',
        zIndex: 30,
        position: 'relative',
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;

        if (tab.isAction) {
          return (
            <button
              key={tab.id}
              onClick={openActionSheet}
              onPointerDown={() => sound.warmUp()}
              onTouchStart={(e) => {
                sound.warmUp();
                e.currentTarget.style.transform = 'scale(0.92)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Create new list or task"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#FEF08A',
                border: '2px solid #18181B',
                boxShadow: '2px 2px 0px #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '-18px',
                cursor: 'pointer',
                transition: 'transform 0.15s ease',
                flexShrink: 0,
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.94)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Plus size={26} color="#18181B" strokeWidth={2.5} />
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => navigateTo(tab.id)}
            onPointerDown={() => sound.warmUp()}
            onTouchStart={(e) => {
              sound.warmUp();
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            aria-label={tab.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              minWidth: '56px',
              minHeight: '44px',
              padding: '4px 8px',
              borderRadius: '12px',
              backgroundColor: isActive
                ? isDark
                  ? '#064E3B'
                  : '#D1FAE5'
                : 'transparent',
              border: isActive
                ? isDark
                  ? '1.5px solid #34D399'
                  : '1.5px solid #18181B'
                : '1.5px solid transparent',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Icon
                size={20}
                color={isActive ? (isDark ? '#34D399' : '#18181B') : isDark ? '#A1A1AA' : '#52525B'}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {tab.badge !== undefined && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-10px',
                    backgroundColor: '#FEF08A',
                    color: '#713F12',
                    border: '1px solid #18181B',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '0 5px',
                    borderRadius: '9999px',
                    lineHeight: '14px',
                    minWidth: '16px',
                    textAlign: 'center',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: isActive ? 800 : 600,
                color: isActive
                  ? isDark
                    ? '#F4F4F5'
                    : '#18181B'
                  : isDark
                  ? '#A1A1AA'
                  : '#71717A',
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

