import React from 'react';
import { useListStore } from '../store/useListStore';
import { ListCard } from '../components/cards/ListCard';
import { ItemCard } from '../components/cards/ItemCard';
import { isDueToday } from '../utils/dateUtils';
import {
  Plus,
  ArrowRight,
  Search,
  Sparkles,
  FolderPlus,
  LayoutTemplate,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    lists,
    items,
    navigateTo,
    openCreateList,
    openQuickAdd,
    openItemDetail,
    settings,
  } = useListStore();

  const isDark = false;

  const activeLists = lists.filter((l) => !l.isDeleted && !l.isArchived);
  const favoriteLists = activeLists.filter((l) => l.isFavorite);
  const displayLists = (favoriteLists.length > 0 ? favoriteLists : activeLists).slice(0, 3);

  const activeItems = items.filter((i) => !i.isDeleted && !i.isArchived);
  const todayItems = activeItems.filter((i) => isDueToday(i.dueDate));
  const todayRemaining = todayItems.filter((i) => !i.isCompleted).length;
  const todayDone = todayItems.filter((i) => i.isCompleted).length;

  const totalItems = activeItems.length;
  const totalCompleted = activeItems.filter((i) => i.isCompleted).length;
  const totalRemaining = totalItems - totalCompleted;

  // Time-based greeting (Prompt Section 3)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
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
      {/* 3. HEADER */}
      <header
        style={{
          padding: '14px 18px 14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: isDark ? '1.5px solid #27272A' : '1.5px solid #18181B',
          backgroundColor: isDark ? '#1F1B2E' : '#EDE9FE',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: isDark ? '#F4F4F5' : '#18181B',
              margin: 0,
              letterSpacing: '-0.3px',
            }}
          >
            {getGreeting()}
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: isDark ? '#A1A1AA' : '#6B7280',
              margin: '2px 0 0 0',
              fontWeight: 500,
            }}
          >
            Here's what's on your list.
          </p>
        </div>

        <button
          onClick={() => navigateTo('search')}
          aria-label="Search lists and tasks"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
            boxShadow: isDark ? '1.5px 1.5px 0px #3F3F46' : '1.5px 1.5px 0px #18181B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Search size={18} color={isDark ? '#F4F4F5' : '#18181B'} strokeWidth={2.2} />
        </button>
      </header>

      {/* Main Spacious Content */}
      <div
        style={{
          padding: '20px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* 4. QUICK ADD (Extremely simple hero element) */}
        <div
          onClick={openQuickAdd}
          role="button"
          tabIndex={0}
          aria-label="Quick Add task or list"
          style={{
            padding: '16px 18px',
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            borderRadius: '20px',
            border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
            boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'transform 0.1s ease',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#FEF08A',
              border: '1.5px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Plus size={18} color="#18181B" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: isDark ? '#A1A1AA' : '#71717A',
            }}
          >
            What do you want to list?
          </span>
        </div>

        {/* 5. TODAY SECTION */}
        <section aria-labelledby="today-heading">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <div>
              <h2
                id="today-heading"
                style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  color: isDark ? '#F4F4F5' : '#18181B',
                  margin: 0,
                }}
              >
                Today
              </h2>
              <span
                style={{
                  fontSize: '12px',
                  color: isDark ? '#A1A1AA' : '#71717A',
                  fontWeight: 500,
                }}
              >
                {todayItems.length === 0
                  ? "You're all caught up"
                  : `${todayRemaining} ${todayRemaining === 1 ? 'task' : 'tasks'} remaining`}
              </span>
            </div>

            {todayItems.length > 0 && (
              <button
                onClick={() => navigateTo('today')}
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: isDark ? '#34D399' : '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 6px',
                }}
              >
                <span>See all</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          {todayItems.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {todayItems.slice(0, 3).map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onClick={() => openItemDetail(item.id)}
                  showListBadge={true}
                  listName={lists.find((l) => l.id === item.listId)?.name}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '14px 16px',
                backgroundColor: isDark ? '#27272A' : '#FFFFFF',
                borderRadius: '16px',
                border: isDark ? '1px dashed #3F3F46' : '1px dashed #D4D4D8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '13px', color: isDark ? '#A1A1AA' : '#71717A' }}>
                No tasks scheduled for today
              </span>
              <button
                onClick={openQuickAdd}
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isDark ? '#34D399' : '#059669',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                }}
              >
                + Add task
              </button>
            </div>
          )}
        </section>

        {/* 6. FAVORITE LISTS (Max 3-4 cards + See all) */}
        <section aria-labelledby="favorites-heading">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <div>
              <h2
                id="favorites-heading"
                style={{
                  fontSize: '16px',
                  fontWeight: 800,
                  color: isDark ? '#F4F4F5' : '#18181B',
                  margin: 0,
                }}
              >
                {favoriteLists.length > 0 ? 'Favorite Lists' : 'Your Lists'}
              </h2>
              {activeLists.length > 0 && (
                <span
                  style={{
                    fontSize: '12px',
                    color: isDark ? '#A1A1AA' : '#71717A',
                    fontWeight: 500,
                  }}
                >
                  {activeLists.length} total
                </span>
              )}
            </div>

            {activeLists.length > 0 && (
              <button
                onClick={() => navigateTo('lists')}
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: isDark ? '#A78BFA' : '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 6px',
                }}
              >
                <span>See all</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          {activeLists.length === 0 ? (
            /* 10. & 12. Fresh Install Empty State */
            <div
              style={{
                padding: '24px 20px',
                backgroundColor: isDark ? '#27272A' : '#FFFFFF',
                borderRadius: '24px',
                border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
                boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  backgroundColor: '#E9D5FF',
                  border: '1.5px solid #18181B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={24} color="#6B21A8" />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 800,
                    color: isDark ? '#F4F4F5' : '#18181B',
                    margin: 0,
                  }}
                >
                  Welcome to List It
                </h3>
                <p
                  style={{
                    fontSize: '13px',
                    color: isDark ? '#A1A1AA' : '#71717A',
                    margin: '4px 0 0 0',
                    maxWidth: '260px',
                  }}
                >
                  Create your first list and start organizing anything.
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  width: '100%',
                  marginTop: '6px',
                }}
              >
                <button
                  onClick={openCreateList}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    backgroundColor: '#FEF08A',
                    border: '1.5px solid #18181B',
                    boxShadow: '1.5px 1.5px 0px #18181B',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#18181B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <FolderPlus size={16} />
                  <span>Create your first list</span>
                </button>

                <button
                  onClick={() => navigateTo('templates')}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: '14px',
                    backgroundColor: 'transparent',
                    border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #E4E4E7',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: isDark ? '#A1A1AA' : '#52525B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <LayoutTemplate size={15} />
                  <span>Explore templates</span>
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px',
              }}
            >
              {displayLists.map((list) => (
                <ListCard
                  key={list.id}
                  list={list}
                  items={items}
                  onClick={() => navigateTo('list-detail', list.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* 9. & 11. YOUR PROGRESS (Simplified, 100% Real User Data) */}
        <section aria-labelledby="progress-heading">
          <div
            style={{
              padding: '18px 20px',
              backgroundColor: isDark ? '#27272A' : '#FFFFFF',
              borderRadius: '20px',
              border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
              boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h2
                id="progress-heading"
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  color: isDark ? '#F4F4F5' : '#18181B',
                  margin: 0,
                }}
              >
                Your progress
              </h2>
              <button
                onClick={() => navigateTo('insights')}
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isDark ? '#A1A1AA' : '#71717A',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Insights
              </button>
            </div>

            {totalItems === 0 ? (
              /* No fake statistics! */
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <p style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#A1A1AA' : '#71717A', margin: 0 }}>
                  No activity yet.
                </p>
                <p style={{ fontSize: '12px', color: isDark ? '#71717A' : '#A1A1AA', margin: '2px 0 0 0' }}>
                  Complete a few items to see your progress.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 900,
                      color: isDark ? '#34D399' : '#059669',
                    }}
                  >
                    {todayDone}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: isDark ? '#D4D4D8' : '#374151' }}>
                    tasks completed today
                  </span>
                </div>

                {/* Progress track */}
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: isDark ? '#3F3F46' : '#F4F4F5',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    border: isDark ? '1px solid #52525B' : '1px solid #E4E4E7',
                  }}
                >
                  <div
                    style={{
                      width: `${totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0}%`,
                      height: '100%',
                      backgroundColor: '#10B981',
                      borderRadius: '9999px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>

                {/* Secondary stats row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: isDark ? '#A1A1AA' : '#71717A',
                    paddingTop: '4px',
                    borderTop: isDark ? '1px solid #3F3F46' : '1px solid #F4F4F5',
                  }}
                >
                  <span>{todayDone} done today</span>
                  <span>•</span>
                  <span>{totalRemaining} active</span>
                  <span>•</span>
                  <span>{activeLists.length} lists</span>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
