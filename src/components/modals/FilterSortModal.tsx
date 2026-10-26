import React from 'react';
import { useListStore } from '../../store/useListStore';
import { FilterOptions, SortOptions, Priority } from '../../types';
import { X, SlidersHorizontal, Check } from 'lucide-react';

interface FilterSortModalProps {
  filter: FilterOptions;
  setFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
  sort: SortOptions;
  setSort: React.Dispatch<React.SetStateAction<SortOptions>>;
}

export const FilterSortModal: React.FC<FilterSortModalProps> = ({
  filter,
  setFilter,
  sort,
  setSort,
}) => {
  const { isFilterModalOpen, setFilterModalOpen, tags } = useListStore();

  if (!isFilterModalOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 24, 27, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 65,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={() => setFilterModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '430px',
          maxHeight: '85vh',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          border: '3px solid #18181B',
          borderBottom: 'none',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #18181B',
            backgroundColor: '#FEF08A',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={18} color="#18181B" strokeWidth={2.5} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#18181B' }}>Filter & Sort</h3>
          </div>
          <button
            onClick={() => setFilterModalOpen(false)}
            aria-label="Close"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={15} color="#18181B" />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '18px 20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Status Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Completion Status
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { label: 'All', value: 'all' },
                { label: 'Incomplete', value: false },
                { label: 'Completed', value: true },
              ].map((opt) => {
                const isSelected = filter.isCompleted === opt.value;
                return (
                  <button
                    key={opt.label}
                    onClick={() => setFilter((prev) => ({ ...prev, isCompleted: opt.value as any }))}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: '12px',
                      border: '1.5px solid #18181B',
                      backgroundColor: isSelected ? '#A7F3D0' : '#FAFAFA',
                      boxShadow: isSelected ? '2px 2px 0px #18181B' : 'none',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#18181B',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Priority Filter
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['all', 'none', 'low', 'medium', 'high', 'urgent'].map((p) => {
                const isSelected = (filter.priority || 'all') === p;
                return (
                  <button
                    key={p}
                    onClick={() => setFilter((prev) => ({ ...prev, priority: p as any }))}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #18181B',
                      backgroundColor: isSelected ? '#FEF08A' : '#FAFAFA',
                      boxShadow: isSelected ? '1.5px 1.5px 0px #18181B' : 'none',
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'capitalize',
                    }}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Due Date Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Due Date Filter
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'Any Date' },
                { id: 'today', label: 'Due Today' },
                { id: 'upcoming', label: 'Upcoming' },
                { id: 'overdue', label: 'Overdue' },
                { id: 'noDate', label: 'No Due Date' },
              ].map((opt) => {
                const isSelected = (filter.dueDate || 'all') === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setFilter((prev) => ({ ...prev, dueDate: opt.id as any }))}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #18181B',
                      backgroundColor: isSelected ? '#DDD6FE' : '#FAFAFA',
                      boxShadow: isSelected ? '1.5px 1.5px 0px #18181B' : 'none',
                      fontSize: '11px',
                      fontWeight: 800,
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort By */}
          <div style={{ paddingTop: '8px', borderTop: '1.5px solid #E4E4E7' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Sort Items By
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {[
                { id: 'manual', label: 'Default / Manual' },
                { id: 'alpha', label: 'Alphabetical (A-Z)' },
                { id: 'dueDate', label: 'Due Date' },
                { id: 'priority', label: 'Priority Level' },
                { id: 'created', label: 'Recently Added' },
              ].map((opt) => {
                const isSelected = sort.by === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setSort((prev) => ({
                        by: opt.id as any,
                        direction: prev.by === opt.id && prev.direction === 'asc' ? 'desc' : 'asc',
                      }))
                    }
                    style={{
                      padding: '8px 10px',
                      borderRadius: '12px',
                      border: '1.5px solid #18181B',
                      backgroundColor: isSelected ? '#FEF08A' : '#FAFAFA',
                      boxShadow: isSelected ? '1.5px 1.5px 0px #18181B' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#18181B',
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear Filters / Apply */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={() => {
                setFilter({ isCompleted: 'all', priority: 'all', dueDate: 'all' });
                setSort({ by: 'manual', direction: 'asc' });
              }}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '9999px',
                border: '1.5px solid #18181B',
                backgroundColor: '#FAFAFA',
                fontSize: '13px',
                fontWeight: 700,
                color: '#71717A',
              }}
            >
              Reset Filters
            </button>

            <button
              onClick={() => setFilterModalOpen(false)}
              className="neo-btn neo-btn-mint"
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '13px',
              }}
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
