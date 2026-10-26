import React, { useState, useMemo } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { ItemCard } from '../components/cards/ItemCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { FilterSortModal } from '../components/modals/FilterSortModal';
import { QuickEntryModal } from '../components/modals/QuickEntryModal';
import { EmptyState } from '../components/common/EmptyState';
import type { FilterOptions, SortOptions, ListItem } from '../types';
import { LIST_COLORS } from '../constants/theme';
import {
  Plus,
  SlidersHorizontal,
  MoreVertical,
  ChevronDown,
  ChevronRight,
  ListPlus,
  Copy,
  Archive,
  Trash2,
  FolderPlus,
} from 'lucide-react';

export const ListDetailScreen: React.FC = () => {
  const {
    activeListId,
    lists,
    items,
    sections,
    createItem,
    createSection,
    deleteSection,
    toggleCollapseSection,
    openItemDetail,
    deleteList,
    duplicateList,
    archiveList,
    setFilterModalOpen,
    setQuickEntryOpen,
    goBack,
  } = useListStore();

  const list = lists.find((l) => l.id === activeListId);
  const colorCfg = list ? LIST_COLORS[list.color] || LIST_COLORS.lavender : LIST_COLORS.lavender;

  // Local state
  const [quickInput, setQuickInput] = useState('');
  const [activeSectionId, setActiveSectionId] = useState<string | undefined>(undefined);
  const [searchInList, setSearchInList] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  // Filter & Sort
  const [filter, setFilter] = useState<FilterOptions>({
    isCompleted: 'all',
    priority: 'all',
    dueDate: 'all',
  });
  const [sort, setSort] = useState<SortOptions>({
    by: 'manual',
    direction: 'asc',
  });

  if (!list) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h3>List not found</h3>
        <button onClick={goBack} className="neo-btn neo-btn-yellow" style={{ marginTop: '12px' }}>
          Go Back
        </button>
      </div>
    );
  }

  const listSections = sections.filter((s) => s.listId === list.id).sort((a, b) => a.sortOrder - b.sortOrder);
  const rawListItems = items.filter((i) => i.listId === list.id && !i.isDeleted && !i.isArchived);

  // Filter items
  const filteredItems = useMemo(() => {
    return rawListItems.filter((item) => {
      // Search
      if (searchInList && !item.title.toLowerCase().includes(searchInList.toLowerCase())) {
        return false;
      }
      // Completion
      if (filter.isCompleted !== 'all' && item.isCompleted !== filter.isCompleted) {
        return false;
      }
      // Priority
      if (filter.priority && filter.priority !== 'all' && item.priority !== filter.priority) {
        return false;
      }
      // Due Date
      if (filter.dueDate === 'today' && !item.dueDate) return false;
      if (filter.dueDate === 'noDate' && item.dueDate) return false;

      return true;
    });
  }, [rawListItems, searchInList, filter]);

  // Sort items
  const sortedItems = useMemo(() => {
    const listCopy = [...filteredItems];
    listCopy.sort((a, b) => {
      if (sort.by === 'alpha') {
        return sort.direction === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
      if (sort.by === 'dueDate') {
        const da = a.dueDate || '9999';
        const db = b.dueDate || '9999';
        return sort.direction === 'asc' ? da.localeCompare(db) : db.localeCompare(da);
      }
      if (sort.by === 'priority') {
        const weights = { urgent: 4, high: 3, medium: 2, low: 1, none: 0 };
        const diff = weights[b.priority] - weights[a.priority];
        return sort.direction === 'asc' ? diff : -diff;
      }
      return a.sortOrder - b.sortOrder;
    });
    return listCopy;
  }, [filteredItems, sort]);

  // Overall counters
  const completedCount = rawListItems.filter((i) => i.isCompleted).length;
  const totalCount = rawListItems.length;

  // Shopping mode totals (Section 43)
  const isShoppingMode = list.type === 'shopping';
  const totalShoppingEstimated = rawListItems.reduce((acc, it: ListItem) => acc + (it.price || 0) * (it.quantity || 1), 0);
  const totalShoppingPurchased = rawListItems
    .filter((it: ListItem) => it.isCompleted)
    .reduce((acc, it: ListItem) => acc + (it.price || 0) * (it.quantity || 1), 0);

  // Rapid Enter creation
  const handleRapidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    createItem({
      listId: list.id,
      sectionId: activeSectionId,
      title: quickInput.trim(),
    });
    setQuickInput('');
  };

  const handleCreateSectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      createSection(list.id, newSectionTitle.trim());
      setNewSectionTitle('');
      setIsAddingSection(false);
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingBottom: '20px',
      }}
    >
      {/* List Header */}
      <AppHeader
        title={list.name}
        icon={list.icon}
        showBack={true}
        headerColor="mint"
        rightAction={
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
            <button
              onClick={() => setFilterModalOpen(true)}
              aria-label="Filter"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #18181B',
                boxShadow: '1.5px 1.5px 0px #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <SlidersHorizontal size={16} color="#18181B" strokeWidth={2.5} />
            </button>

            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              aria-label="Options"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #18181B',
                boxShadow: '1.5px 1.5px 0px #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <MoreVertical size={16} color="#18181B" strokeWidth={2.5} />
            </button>

            {/* More Menu Dropdown */}
            {showMoreMenu && (
              <div
                className="neo-card"
                style={{
                  position: 'absolute',
                  top: '44px',
                  right: '0',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '6px',
                  zIndex: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  minWidth: '160px',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.2)',
                }}
              >
                <button
                  onClick={() => {
                    setQuickEntryOpen(true);
                    setShowMoreMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '8px',
                  }}
                >
                  <ListPlus size={14} />
                  <span>Rapid Multi-Line</span>
                </button>

                <button
                  onClick={() => {
                    duplicateList(list.id);
                    setShowMoreMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '8px',
                  }}
                >
                  <Copy size={14} />
                  <span>Duplicate List</span>
                </button>

                <button
                  onClick={() => {
                    archiveList(list.id);
                    setShowMoreMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '8px',
                  }}
                >
                  <Archive size={14} />
                  <span>Archive List</span>
                </button>

                <button
                  onClick={() => {
                    deleteList(list.id);
                    setShowMoreMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#DC2626',
                    borderRadius: '8px',
                  }}
                >
                  <Trash2 size={14} />
                  <span>Delete List</span>
                </button>
              </div>
            )}
          </div>
        }
      />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Progress Card */}
        <div
          className="neo-card"
          style={{
            padding: '14px 16px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <ProgressBar
            completed={completedCount}
            total={totalCount}
            color={colorCfg.bg}
          />
        </div>

        {/* Shopping Mode Tally Banner (Section 43) */}
        {isShoppingMode && totalShoppingEstimated > 0 && (
          <div
            className="neo-card"
            style={{
              padding: '12px 16px',
              backgroundColor: '#FEF08A',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '2px solid #18181B',
            }}
          >
            <div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#713F12', textTransform: 'uppercase' }}>
                Estimated Cost
              </span>
              <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#18181B' }}>
                ${totalShoppingEstimated.toFixed(2)}
              </h4>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#713F12', textTransform: 'uppercase' }}>
                In Cart / Bought
              </span>
              <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#064E3B' }}>
                ${totalShoppingPurchased.toFixed(2)}
              </h4>
            </div>
          </div>
        )}

        {/* Rapid Inline Input Field (Section 58) */}
        <form
          onSubmit={handleRapidSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '2px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
              padding: '10px 14px',
            }}
          >
            <Plus size={18} color="#71717A" strokeWidth={3} />
            <input
              type="text"
              placeholder="Add item (press Enter to rapid add)..."
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                fontSize: '14px',
                fontWeight: 700,
                color: '#18181B',
              }}
            />
          </div>

          <button
            type="submit"
            className="neo-btn neo-btn-yellow"
            style={{
              padding: '11px 16px',
              flexShrink: 0,
            }}
          >
            Add
          </button>
        </form>

        {/* Section Management Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#18181B' }}>
              Items ({sortedItems.length})
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setQuickEntryOpen(true)}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #18181B',
                boxShadow: '1px 1px 0px #18181B',
                fontSize: '11px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              <ListPlus size={12} />
              <span>Bulk Entry</span>
            </button>

            <button
              onClick={() => setIsAddingSection(true)}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: '#A7F3D0',
                border: '1.5px solid #18181B',
                boxShadow: '1px 1px 0px #18181B',
                fontSize: '11px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              <FolderPlus size={12} />
              <span>+ Section</span>
            </button>
          </div>
        </div>

        {/* Add Section inline form */}
        {isAddingSection && (
          <form
            onSubmit={handleCreateSectionSubmit}
            className="animate-pop"
            style={{
              display: 'flex',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              padding: '8px 12px',
              borderRadius: '14px',
              border: '2px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
            }}
          >
            <input
              type="text"
              autoFocus
              placeholder="Section title (e.g. In Progress, Snacks)..."
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              style={{ flex: 1, fontSize: '13px', fontWeight: 700 }}
            />
            <button
              type="submit"
              style={{
                padding: '4px 12px',
                borderRadius: '8px',
                backgroundColor: '#A7F3D0',
                border: '1px solid #18181B',
                fontWeight: 800,
                fontSize: '12px',
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsAddingSection(false)}
              style={{ padding: '4px 8px', fontSize: '12px', color: '#71717A' }}
            >
              Cancel
            </button>
          </form>
        )}

        {/* Items rendered by Sections or Flat List */}
        {listSections.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Sections */}
            {listSections.map((sec) => {
              const secItems = sortedItems.filter((i) => i.sectionId === sec.id);
              const isCollapsed = sec.isCollapsed;

              return (
                <div
                  key={sec.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {/* Section Title Pill Bar */}
                  <div
                    onClick={() => toggleCollapseSection(sec.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: '14px',
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #18181B',
                      boxShadow: '1.5px 1.5px 0px #18181B',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#18181B' }}>
                        {sec.title}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          backgroundColor: '#E4DCFA',
                          padding: '1px 6px',
                          borderRadius: '9999px',
                        }}
                      >
                        {secItems.length}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(sec.id);
                      }}
                      aria-label="Delete section"
                      style={{ color: '#A1A1AA', fontSize: '11px', fontWeight: 700 }}
                    >
                      Delete
                    </button>
                  </div>

                  {/* Section Items */}
                  {!isCollapsed && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' }}>
                      {secItems.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          onClick={() => openItemDetail(item.id)}
                        />
                      ))}
                      {secItems.length === 0 && (
                        <div style={{ padding: '8px 12px', fontSize: '12px', color: '#71717A', fontStyle: 'italic' }}>
                          No items in this section yet.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Unsectioned Items */}
            {sortedItems.filter((i) => !i.sectionId).length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#71717A', textTransform: 'uppercase' }}>
                  Other Items
                </span>
                {sortedItems
                  .filter((i) => !i.sectionId)
                  .map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onClick={() => openItemDetail(item.id)}
                    />
                  ))}
              </div>
            )}
          </div>
        ) : (
          /* Flat Checklist View */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sortedItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={() => openItemDetail(item.id)}
              />
            ))}

            {sortedItems.length === 0 && (
              <EmptyState
                title="Your list is empty"
                description="Type an item above or click below to populate ideas quickly."
                actionText="Rapid Multi-Line Entry"
                onAction={() => setQuickEntryOpen(true)}
                illustration="completed"
              />
            )}
          </div>
        )}
      </div>

      <FilterSortModal filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <QuickEntryModal listId={list.id} />
    </div>
  );
};
