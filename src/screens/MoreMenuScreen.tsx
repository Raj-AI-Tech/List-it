import React from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import {
  Calendar,
  BarChart3,
  Tag,
  Sparkles,
  Archive,
  Trash2,
  Settings,
  ChevronRight,
} from 'lucide-react';

export const MoreMenuScreen: React.FC = () => {
  const { navigateTo, items, lists, settings } = useListStore();
  const isDark = false;

  const archivedCount =
    lists.filter((l) => l.isArchived).length + items.filter((i) => i.isArchived).length;
  const trashCount =
    lists.filter((l) => l.isDeleted).length + items.filter((i) => i.isDeleted).length;

  const primaryItems = [
    {
      id: 'calendar',
      label: 'Calendar',
      desc: 'Schedule and due date matrix',
      icon: Calendar,
      color: '#A7F3D0',
      iconColor: '#065F46',
    },
    {
      id: 'insights',
      label: 'Insights',
      desc: 'Real completion stats and progress',
      icon: BarChart3,
      color: '#FBCFE8',
      iconColor: '#9D174D',
    },
    {
      id: 'tags',
      label: 'Tags',
      desc: 'Organize items by labels',
      icon: Tag,
      color: '#DDD6FE',
      iconColor: '#5B21B6',
    },
    {
      id: 'templates',
      label: 'Templates',
      desc: 'Curated list starters',
      icon: Sparkles,
      color: '#FEF08A',
      iconColor: '#854D0E',
    },
    {
      id: 'archive',
      label: 'Archive',
      desc: 'Shelved lists and completed items',
      icon: Archive,
      color: '#BAE6FD',
      iconColor: '#0369A1',
      badge: archivedCount > 0 ? `${archivedCount}` : undefined,
    },
    {
      id: 'trash',
      label: 'Trash',
      desc: 'Recently deleted items and lists',
      icon: Trash2,
      color: '#FEE2E2',
      iconColor: '#991B1B',
      badge: trashCount > 0 ? `${trashCount}` : undefined,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingBottom: '16px',
      }}
    >
      <AppHeader title="More" subtitle="Tools and secondary features" headerColor="lavender" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Main List Group (Prompt Section 46) */}
        <div
          style={{
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            borderRadius: '22px',
            border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
            boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
            overflow: 'hidden',
          }}
        >
          {primaryItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === primaryItems.length - 1;

            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: isLast
                    ? 'none'
                    : isDark
                    ? '1px solid #3F3F46'
                    : '1px solid #F4F4F5',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '12px',
                      backgroundColor: item.color,
                      border: '1.5px solid #18181B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} color={item.iconColor} strokeWidth={2.2} />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 800,
                        color: isDark ? '#F4F4F5' : '#18181B',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: isDark ? '#A1A1AA' : '#71717A',
                        fontWeight: 500,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        backgroundColor: '#18181B',
                        color: '#FFFFFF',
                        padding: '2px 7px',
                        borderRadius: '9999px',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={18} color={isDark ? '#71717A' : '#A1A1AA'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Settings Group */}
        <div
          style={{
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            borderRadius: '20px',
            border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
            boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => navigateTo('settings')}
            style={{
              width: '100%',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: '#FEF08A',
                  border: '1.5px solid #18181B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Settings size={18} color="#713F12" strokeWidth={2.2} />
              </div>

              <div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: isDark ? '#F4F4F5' : '#18181B',
                  }}
                >
                  Settings
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: isDark ? '#A1A1AA' : '#71717A',
                    fontWeight: 500,
                  }}
                >
                  Preferences, data backup & app info
                </div>
              </div>
            </div>

            <ChevronRight size={18} color={isDark ? '#71717A' : '#A1A1AA'} />
          </button>
        </div>
      </div>
    </div>
  );
};
