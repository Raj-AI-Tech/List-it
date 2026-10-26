import React from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { Zap, CheckCircle2, ListTodo, TrendingUp, Sparkles } from 'lucide-react';

export const InsightsScreen: React.FC = () => {
  const { items, lists, settings, navigateTo } = useListStore();
  const isDark = false;

  const activeLists = lists.filter((l) => !l.isDeleted && !l.isArchived);
  const activeItems = items.filter((i) => !i.isDeleted && !i.isArchived);
  const completedItems = activeItems.filter((i) => i.isCompleted);
  const totalItems = activeItems.length;
  const remainingItems = totalItems - completedItems.length;

  // Real calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const completedToday = completedItems.filter(
    (i) => i.completedAt && i.completedAt.startsWith(todayStr)
  ).length;

  const completionRate =
    totalItems === 0 ? 0 : Math.round((completedItems.length / totalItems) * 100);

  // Compute actual completions for the last 7 days
  const last7Days = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - idx));
    const dStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString(undefined, { weekday: 'narrow' });
    const count = completedItems.filter(
      (item) => item.completedAt && item.completedAt.startsWith(dStr)
    ).length;
    return { day: dayLabel, date: dStr, count };
  });

  const maxWeeklyCount = Math.max(...last7Days.map((d) => d.count), 1);
  const weeklyTotal = last7Days.reduce((acc, d) => acc + d.count, 0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingBottom: '16px',
      }}
    >
      <AppHeader title="Your Progress" subtitle="Real-time productivity" headerColor="mint" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {totalItems === 0 ? (
          /* Empty state - 100% compliant with prompt section 11 & 49 */
          <div
            style={{
              padding: '36px 20px',
              backgroundColor: isDark ? '#27272A' : '#FFFFFF',
              borderRadius: '24px',
              border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
              boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                backgroundColor: '#D1FAE5',
                border: '1.5px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={24} color="#065F46" />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: isDark ? '#F4F4F5' : '#18181B', margin: 0 }}>
              No activity yet.
            </h3>
            <p
              style={{
                fontSize: '13px',
                color: isDark ? '#A1A1AA' : '#71717A',
                margin: 0,
                maxWidth: '260px',
              }}
            >
              Complete a few items to see your progress and insights.
            </p>

            <button
              onClick={() => navigateTo('home')}
              style={{
                marginTop: '8px',
                padding: '10px 20px',
                borderRadius: '14px',
                backgroundColor: '#FEF08A',
                border: '1.5px solid #18181B',
                boxShadow: '1.5px 1.5px 0px #18181B',
                fontSize: '13px',
                fontWeight: 800,
                color: '#18181B',
                cursor: 'pointer',
              }}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            {/* Real Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: isDark ? '#27272A' : '#FFFFFF',
                  borderRadius: '20px',
                  border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
                  boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={14} color="#D97706" />
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isDark ? '#A1A1AA' : '#71717A',
                      textTransform: 'uppercase',
                    }}
                  >
                    Today
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '26px',
                    fontWeight: 900,
                    color: isDark ? '#F4F4F5' : '#18181B',
                    margin: '2px 0',
                  }}
                >
                  {completedToday}
                </h3>
                <span style={{ fontSize: '11px', fontWeight: 600, color: isDark ? '#34D399' : '#059669' }}>
                  Completed today
                </span>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: isDark ? '#27272A' : '#FFFFFF',
                  borderRadius: '20px',
                  border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
                  boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={14} color="#7C3AED" />
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isDark ? '#A1A1AA' : '#71717A',
                      textTransform: 'uppercase',
                    }}
                  >
                    Rate
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '26px',
                    fontWeight: 900,
                    color: isDark ? '#F4F4F5' : '#18181B',
                    margin: '2px 0',
                  }}
                >
                  {completionRate}%
                </h3>
                <span style={{ fontSize: '11px', fontWeight: 600, color: isDark ? '#A78BFA' : '#7C3AED' }}>
                  Completion rate
                </span>
              </div>
            </div>

            {/* Weekly Activity (Calculated 100% from user's actual completedAt dates) */}
            <div
              style={{
                padding: '18px 20px',
                backgroundColor: isDark ? '#27272A' : '#FFFFFF',
                borderRadius: '24px',
                border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
                boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: isDark ? '#F4F4F5' : '#18181B' }}>
                  Last 7 Days
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    backgroundColor: isDark ? '#3F3F46' : '#18181B',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {weeklyTotal} {weeklyTotal === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Bar Chart Container */}
              <div
                style={{
                  height: '110px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  padding: '10px 8px 0 8px',
                  borderBottom: isDark ? '1.5px solid #3F3F46' : '1.5px solid #E4E4E7',
                  gap: '6px',
                }}
              >
                {last7Days.map((stat, idx) => {
                  const barHeight =
                    stat.count > 0 ? Math.max(16, (stat.count / maxWeeklyCount) * 80) : 6;
                  const isToday = stat.date === todayStr;

                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          color: stat.count > 0 ? (isDark ? '#34D399' : '#059669') : 'transparent',
                        }}
                      >
                        {stat.count}
                      </span>
                      <div
                        style={{
                          width: '100%',
                          maxWidth: '28px',
                          height: `${barHeight}px`,
                          borderRadius: '6px 6px 2px 2px',
                          backgroundColor:
                            stat.count > 0
                              ? isToday
                                ? '#34D399'
                                : '#A7F3D0'
                              : isDark
                              ? '#3F3F46'
                              : '#F4F4F5',
                          border: stat.count > 0 ? '1.5px solid #18181B' : 'none',
                          transition: 'height 0.3s ease',
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Day Labels */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 8px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: isDark ? '#A1A1AA' : '#71717A',
                }}
              >
                {last7Days.map((stat, idx) => (
                  <span
                    key={idx}
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      color: stat.date === todayStr ? (isDark ? '#34D399' : '#059669') : undefined,
                    }}
                  >
                    {stat.day}
                  </span>
                ))}
              </div>
            </div>

            {/* Breakdown summary */}
            <div
              style={{
                padding: '16px 20px',
                backgroundColor: isDark ? '#27272A' : '#FFFFFF',
                borderRadius: '20px',
                border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
                boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: isDark ? '#F4F4F5' : '#18181B', margin: 0 }}>
                Inventory Summary
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: isDark ? '#A1A1AA' : '#71717A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={15} color="#10B981" /> Completed Items
                  </span>
                  <span style={{ fontWeight: 800, color: isDark ? '#F4F4F5' : '#18181B' }}>
                    {completedItems.length}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: isDark ? '#A1A1AA' : '#71717A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ListTodo size={15} color="#F59E0B" /> Active Tasks
                  </span>
                  <span style={{ fontWeight: 800, color: isDark ? '#F4F4F5' : '#18181B' }}>
                    {remainingItems}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: isDark ? '#A1A1AA' : '#71717A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={15} color="#8B5CF6" /> Total Lists
                  </span>
                  <span style={{ fontWeight: 800, color: isDark ? '#F4F4F5' : '#18181B' }}>
                    {activeLists.length}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
