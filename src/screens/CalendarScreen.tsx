import React, { useState } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { ItemCard } from '../components/cards/ItemCard';
import { getMonthMatrix, formatDateFriendly } from '../utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarScreen: React.FC = () => {
  const { items, lists, openItemDetail, openQuickAdd } = useListStore();

  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0-11
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split('T')[0]);

  const activeItems = items.filter((i) => !i.isDeleted && !i.isArchived);

  // Group items by date string
  const itemsByDate = new Map<string, typeof activeItems>();
  activeItems.forEach((i) => {
    if (i.dueDate) {
      if (!itemsByDate.has(i.dueDate)) itemsByDate.set(i.dueDate, []);
      itemsByDate.get(i.dueDate)!.push(i);
    }
  });

  const matrix = getMonthMatrix(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthName = new Date(currentYear, currentMonth, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const selectedDateItems = itemsByDate.get(selectedDate) || [];

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
      <AppHeader title="Calendar" headerColor="yellow" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Calendar Card */}
        <div
          className="neo-card"
          style={{
            padding: '16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Month Header with Prev/Next */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#18181B' }}>{monthName}</h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={handlePrevMonth}
                aria-label="Previous month"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '10px',
                  border: '1.5px solid #18181B',
                  backgroundColor: '#FAFAFA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNextMonth}
                aria-label="Next month"
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '10px',
                  border: '1.5px solid #18181B',
                  backgroundColor: '#FAFAFA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center' }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <span key={idx} style={{ fontSize: '11px', fontWeight: 800, color: '#71717A' }}>
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {matrix.map((week, wIdx) => (
              <div key={wIdx} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                {week.map((cell) => {
                  const isSelected = selectedDate === cell.dateStr;
                  const dayItems = itemsByDate.get(cell.dateStr) || [];
                  const hasItems = dayItems.length > 0;
                  const isToday = cell.dateStr === now.toISOString().split('T')[0];

                  return (
                    <button
                      key={cell.dateStr}
                      onClick={() => setSelectedDate(cell.dateStr)}
                      style={{
                        height: '38px',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #18181B' : '1px solid transparent',
                        backgroundColor: isSelected
                          ? '#FEF08A'
                          : isToday
                          ? '#D1FAE5'
                          : 'transparent',
                        boxShadow: isSelected ? '1.5px 1.5px 0px #18181B' : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        opacity: cell.isCurrentMonth ? 1 : 0.35,
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: isSelected || isToday ? 800 : 600,
                          color: '#18181B',
                        }}
                      >
                        {cell.day}
                      </span>
                      {hasItems && (
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#059669',
                            marginTop: '1px',
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Date Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#18181B' }}>
              Scheduled for {formatDateFriendly(selectedDate)} ({selectedDateItems.length})
            </span>
          </div>

          {selectedDateItems.length > 0 ? (
            selectedDateItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => openItemDetail(item.id)}
                showListBadge={true}
                listName={lists.find((l) => l.id === item.listId)?.name}
              />
            ))
          ) : (
            <div
              className="neo-card"
              style={{
                padding: '16px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
              }}
            >
              <p style={{ fontSize: '12px', color: '#71717A' }}>
                No tasks scheduled for this day.
              </p>
              <button
                onClick={openQuickAdd}
                style={{
                  marginTop: '6px',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#059669',
                  textDecoration: 'underline',
                }}
              >
                + Schedule a task here
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
