import React from 'react';
import type { ListItem } from '../../types';
import { formatDateFriendly, isOverdue } from '../../utils/dateUtils';
import { Check, Calendar, CheckSquare } from 'lucide-react';
import { useListStore } from '../../store/useListStore';

interface ItemCardProps {
  item: ListItem;
  onClick?: () => void;
  showListBadge?: boolean;
  listName?: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onClick,
  showListBadge = false,
  listName,
}) => {
  const {
    toggleCompleteItem,
    isMultiSelectMode,
    selectedItemIds,
    toggleSelectItem,
    settings,
  } = useListStore();

  const isDark = false;
  const isSelected = selectedItemIds.includes(item.id);
  const overdue = isOverdue(item.dueDate, item.isCompleted);

  const subtasksTotal = item.subtasks?.length || 0;
  const subtasksDone = item.subtasks?.filter((s) => s.isCompleted).length || 0;

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMultiSelectMode) {
      toggleSelectItem(item.id);
    } else {
      toggleCompleteItem(item.id);
    }
  };

  return (
    <div
      onClick={isMultiSelectMode ? () => toggleSelectItem(item.id) : onClick}
      role="button"
      tabIndex={0}
      aria-label={`Task: ${item.title}`}
      style={{
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: isSelected
          ? isDark
            ? '#3E3824'
            : '#FEF9C3'
          : item.isCompleted
          ? isDark
            ? '#1F1F23'
            : '#F9FAFB'
          : isDark
          ? '#27272A'
          : '#FFFFFF',
        opacity: item.isCompleted ? 0.65 : 1,
        borderRadius: '16px',
        border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
        boxShadow: isSelected
          ? '2.5px 2.5px 0px #18181B'
          : isDark
          ? '1.5px 1.5px 0px #3F3F46'
          : '1.5px 1.5px 0px #18181B',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
        position: 'relative',
        minHeight: '48px',
      }}
    >
      {/* Checkbox Touch Target */}
      <div
        onClick={handleCheckboxClick}
        role="checkbox"
        aria-checked={item.isCompleted}
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '7px',
            border: isDark ? '1.5px solid #E4E4E7' : '1.5px solid #18181B',
            backgroundColor: item.isCompleted
              ? '#A7F3D0'
              : isDark
              ? '#18181B'
              : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.15s ease',
          }}
        >
          {item.isCompleted && (
            <Check size={15} color="#065F46" strokeWidth={3} />
          )}
        </div>
      </div>

      {/* Main Content: Simple Title */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {showListBadge && listName && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 6px',
                borderRadius: '9999px',
                backgroundColor: isDark ? '#3B2D54' : '#EDE9FE',
                color: isDark ? '#DDD6FE' : '#5B21B6',
                border: '1px solid #18181B',
              }}
            >
              {listName}
            </span>
          )}

          <span
            style={{
              fontSize: '15px',
              fontWeight: 600,
              color: isDark ? '#F4F4F5' : '#18181B',
              textDecoration: item.isCompleted ? 'line-through' : 'none',
              wordBreak: 'break-word',
              lineHeight: 1.35,
            }}
          >
            {item.title}
          </span>
        </div>

        {/* Minimal secondary tags only if critical */}
        {(overdue || item.priority === 'urgent' || subtasksTotal > 0) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1px' }}>
            {item.priority === 'urgent' && !item.isCompleted && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  border: '1px solid #18181B',
                }}
              >
                Urgent
              </span>
            )}

            {item.dueDate && overdue && !item.isCompleted && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  border: '1px solid #18181B',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                <Calendar size={10} />
                <span>Overdue ({formatDateFriendly(item.dueDate)})</span>
              </span>
            )}

            {subtasksTotal > 0 && !item.isCompleted && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '1px 6px',
                  borderRadius: '9999px',
                  backgroundColor: subtasksDone === subtasksTotal ? '#D1FAE5' : '#F4F4F5',
                  color: '#18181B',
                  border: '1px solid #18181B',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                <CheckSquare size={10} />
                <span>
                  {subtasksDone}/{subtasksTotal}
                </span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
