import React, { useState } from 'react';
import type { List, ListItem } from '../../types';
import { LIST_COLORS } from '../../constants/theme';
import { IconRenderer } from '../common/IconRenderer';
import { Star, MoreVertical, Copy, Archive, Trash2, Edit3, FolderOpen } from 'lucide-react';
import { useListStore } from '../../store/useListStore';

interface ListCardProps {
  list: List;
  items: ListItem[];
  layout?: 'grid' | 'compact';
  onClick: () => void;
}

export const ListCard: React.FC<ListCardProps> = ({
  list,
  items,
  layout = 'grid',
  onClick,
}) => {
  const { toggleFavoriteList, duplicateList, deleteList, archiveList, updateList, settings } =
    useListStore();
  const [showMenu, setShowMenu] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(list.name);

  const isDark = false;
  const listItems = items.filter((i) => i.listId === list.id && !i.isDeleted && !i.isArchived);
  const completedCount = listItems.filter((i) => i.isCompleted).length;
  const totalCount = listItems.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const colorCfg = LIST_COLORS[list.color] || LIST_COLORS.lavender;

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (renameValue.trim()) {
      updateList(list.id, { name: renameValue.trim() });
    }
    setIsRenaming(false);
  };

  if (layout === 'compact') {
    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`Open list ${list.name}`}
        style={{
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          backgroundColor: isDark ? '#27272A' : '#FFFFFF',
          borderRadius: '18px',
          border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
          boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.1s ease',
        }}
      >
        {/* Left Color Icon Pill */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: colorCfg.bg,
            border: '1.5px solid #18181B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconRenderer name={list.icon} size={20} color="#18181B" />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h4
              style={{
                fontSize: '15px',
                fontWeight: 800,
                color: isDark ? '#F4F4F5' : '#18181B',
                margin: 0,
                lineHeight: 1.3,
                wordBreak: 'break-word',
              }}
            >
              {list.name}
            </h4>
            {list.isFavorite && <Star size={13} fill="#FEF08A" color="#CA8A04" />}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 500, color: isDark ? '#A1A1AA' : '#71717A' }}>
            {totalCount === 0
              ? 'No items'
              : `${completedCount} of ${totalCount} completed`}
          </span>
        </div>

        {/* Progress pill if items exist */}
        {totalCount > 0 && (
          <div
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: completedCount === totalCount ? '#D1FAE5' : colorCfg.badge,
              border: '1px solid #18181B',
              fontSize: '11px',
              fontWeight: 800,
              color: completedCount === totalCount ? '#065F46' : colorCfg.text,
              flexShrink: 0,
            }}
          >
            {Math.round(progressPercent)}%
          </div>
        )}
      </div>
    );
  }

  // Spacious Default Card (Home & Lists Grid)
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Open list ${list.name}`}
      style={{
        padding: '16px 18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: isDark ? '#27272A' : '#FFFFFF',
        borderRadius: '20px',
        border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
        boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
        position: 'relative',
        cursor: 'pointer',
        gap: '14px',
        transition: 'transform 0.15s ease',
      }}
    >
      {/* Top Row: Icon + Star + Three-dot Menu */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: colorCfg.bg,
            border: '1.5px solid #18181B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconRenderer name={list.icon} size={22} color="#18181B" strokeWidth={2.2} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {list.isFavorite && (
            <div
              title="Favorite list"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: '#FEF08A',
                border: '1px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Star size={14} fill="#CA8A04" color="#854D0E" />
            </div>
          )}

          {/* 3-dot options menu */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            aria-label="List options"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              border: isDark ? '1px solid #52525B' : '1px solid #E4E4E7',
              backgroundColor: isDark ? '#3F3F46' : '#F4F4F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <MoreVertical size={15} color={isDark ? '#F4F4F5' : '#18181B'} />
          </button>
        </div>
      </div>

      {/* Secondary dropdown menu */}
      {showMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: '52px',
            right: '16px',
            backgroundColor: isDark ? '#18181B' : '#FFFFFF',
            borderRadius: '14px',
            border: '1.5px solid #18181B',
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            padding: '6px',
            zIndex: 30,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            minWidth: '140px',
          }}
        >
          <button
            onClick={() => {
              setShowMenu(false);
              onClick();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              fontSize: '13px',
              fontWeight: 700,
              color: isDark ? '#F4F4F5' : '#18181B',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <FolderOpen size={14} />
            <span>Open</span>
          </button>

          <button
            onClick={() => {
              setShowMenu(false);
              setIsRenaming(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              fontSize: '13px',
              fontWeight: 700,
              color: isDark ? '#F4F4F5' : '#18181B',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Edit3 size={14} />
            <span>Rename</span>
          </button>

          <button
            onClick={() => {
              duplicateList(list.id);
              setShowMenu(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              fontSize: '13px',
              fontWeight: 700,
              color: isDark ? '#F4F4F5' : '#18181B',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Copy size={14} />
            <span>Duplicate</span>
          </button>

          <button
            onClick={() => {
              toggleFavoriteList(list.id);
              setShowMenu(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              fontSize: '13px',
              fontWeight: 700,
              color: isDark ? '#F4F4F5' : '#18181B',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Star size={14} fill={list.isFavorite ? 'none' : '#CA8A04'} color="#CA8A04" />
            <span>{list.isFavorite ? 'Unfavorite' : 'Favorite'}</span>
          </button>

          <button
            onClick={() => {
              archiveList(list.id);
              setShowMenu(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              fontSize: '13px',
              fontWeight: 700,
              color: isDark ? '#F4F4F5' : '#18181B',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Archive size={14} />
            <span>Archive</span>
          </button>

          <button
            onClick={() => {
              deleteList(list.id);
              setShowMenu(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#DC2626',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Middle Row: List Name (Wraps 1-2 lines, never clipped awkwardly) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {isRenaming ? (
          <form onSubmit={handleRenameSubmit} onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              autoFocus
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={() => setIsRenaming(false)}
              style={{
                width: '100%',
                padding: '4px 8px',
                fontSize: '15px',
                fontWeight: 800,
                borderRadius: '8px',
                border: '1.5px solid #18181B',
                outline: 'none',
              }}
            />
          </form>
        ) : (
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 800,
              color: isDark ? '#F4F4F5' : '#18181B',
              margin: 0,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}
          >
            {list.name}
          </h3>
        )}

        {list.description ? (
          <p
            style={{
              fontSize: '12px',
              color: isDark ? '#A1A1AA' : '#71717A',
              margin: 0,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {list.description}
          </p>
        ) : null}
      </div>

      {/* Bottom Row: Simple Progress (Prompt Section 6: "2 of 5 completed [━━━━━]") */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '13px',
            fontWeight: 600,
            color: isDark ? '#A1A1AA' : '#71717A',
          }}
        >
          <span>
            {totalCount === 0
              ? '0 items'
              : `${completedCount} of ${totalCount} completed`}
          </span>
          {totalCount > 0 && (
            <span style={{ fontSize: '12px', fontWeight: 700, color: isDark ? '#D4D4D8' : '#3F3F46' }}>
              {Math.round(progressPercent)}%
            </span>
          )}
        </div>

        {/* Clean Progress Track */}
        <div
          style={{
            width: '100%',
            height: '6px',
            backgroundColor: isDark ? '#3F3F46' : '#F4F4F5',
            borderRadius: '9999px',
            overflow: 'hidden',
            border: isDark ? '1px solid #52525B' : '1px solid #E4E4E7',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor:
                completedCount === totalCount && totalCount > 0
                  ? '#10B981'
                  : colorCfg.bg === '#FEF08A'
                  ? '#EAB308'
                  : '#8B5CF6',
              borderRadius: '9999px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
};
