import React from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { ItemCard } from '../components/cards/ItemCard';
import { isDueToday, isOverdue } from '../utils/dateUtils';
import { AlertCircle, Clock } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const TodayScreen: React.FC = () => {
  const { items, lists, openItemDetail, openQuickAdd, settings } = useListStore();
  const isDark = false;

  const activeItems = items.filter((i) => !i.isDeleted && !i.isArchived);

  const overdueItems = activeItems.filter((i) => isOverdue(i.dueDate, i.isCompleted));
  const dueTodayItems = activeItems.filter((i) => isDueToday(i.dueDate) && !i.isCompleted);
  const completedTodayItems = activeItems.filter((i) => {
    if (!i.isCompleted || !i.completedAt) return false;
    const todayStr = new Date().toISOString().split('T')[0];
    return i.completedAt.startsWith(todayStr);
  });

  const totalTodayTasks = overdueItems.length + dueTodayItems.length;

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
        title="Today"
        subtitle={new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })}
        headerColor="yellow"
        badge={totalTodayTasks > 0 ? String(totalTodayTasks) : undefined}
      />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Overdue Items Alert Section */}
        {overdueItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} color="#DC2626" strokeWidth={2.5} />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#DC2626',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Overdue ({overdueItems.length})
              </span>
            </div>
            {overdueItems.map((item) => (
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

        {/* Due Today Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={16} color="#D97706" strokeWidth={2.5} />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: isDark ? '#F4F4F5' : '#18181B',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Today's Tasks ({dueTodayItems.length})
            </span>
          </div>

          {dueTodayItems.length > 0 ? (
            dueTodayItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => openItemDetail(item.id)}
                showListBadge={true}
                listName={lists.find((l) => l.id === item.listId)?.name}
              />
            ))
          ) : totalTodayTasks === 0 ? (
            /* 13. Empty State: No Tasks Today */
            <EmptyState
              title="You're all caught up."
              description="No tasks are scheduled for today. Enjoy your day or add something new!"
              actionText="+ Add Task"
              onAction={openQuickAdd}
              illustration="today"
            />
          ) : null}
        </div>

        {/* Completed Today Items */}
        {completedTodayItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: isDark ? '#34D399' : '#059669',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Completed Today ({completedTodayItems.length})
            </span>
            {completedTodayItems.map((item) => (
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
      </div>
    </div>
  );
};
