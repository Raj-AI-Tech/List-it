import React, { useState, useEffect } from 'react';
import { useListStore } from '../../store/useListStore';
import { Priority, ItemStatus } from '../../types';
import { TagChip } from '../common/TagChip';
import { ProgressBar } from '../common/ProgressBar';
import {
  X,
  Check,
  Calendar,
  Clock,
  Copy,
  FolderInput,
  Archive,
  Trash2,
  Plus,
  CheckSquare,
  AlertCircle,
  Star,
  Repeat,
  DollarSign,
} from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const {
    isItemDetailOpen,
    activeItemId,
    closeItemDetail,
    items,
    lists,
    updateItem,
    toggleCompleteItem,
    duplicateItem,
    archiveItem,
    deleteItem,
    toggleFavoriteItem,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    setMoveModalOpen,
  } = useListStore();

  const item = items.find((i) => i.id === activeItemId);
  const list = item ? lists.find((l) => l.id === item.listId) : null;

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<Priority>('none');
  const [status, setStatus] = useState<ItemStatus>('not_started');
  const [dueDate, setDueDate] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newTagInput, setNewTagInput] = useState('');
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [recurrence, setRecurrence] = useState<string>('none');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setNotes(item.notes || '');
      setPriority(item.priority || 'none');
      setStatus(item.status || 'not_started');
      setDueDate(item.dueDate || '');
      setQuantity(item.quantity);
      setPrice(item.price);
      setRecurrence(item.recurrence || 'none');
    }
  }, [item]);

  if (!isItemDetailOpen || !item) return null;

  const handleSave = () => {
    updateItem(item.id, {
      title: title.trim() || item.title,
      notes: notes.trim(),
      priority,
      status,
      dueDate: dueDate || undefined,
      quantity,
      price,
      recurrence: recurrence as any,
    });
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtaskTitle.trim()) {
      addSubtask(item.id, newSubtaskTitle.trim());
      setNewSubtaskTitle('');
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      const clean = newTagInput.trim().toLowerCase().replace(/^#/, '');
      if (!item.tags.includes(clean)) {
        updateItem(item.id, { tags: [...item.tags, clean] });
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagName: string) => {
    updateItem(item.id, { tags: item.tags.filter((t) => t !== tagName) });
  };

  const subtasks = item.subtasks || [];
  const subtasksDone = subtasks.filter((s) => s.isCompleted).length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 24, 27, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={() => {
        handleSave();
        closeItemDetail();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '430px',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          border: '3px solid #18181B',
          borderBottom: 'none',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header banner */}
        <div
          style={{
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #18181B',
            backgroundColor: '#D1FAE5',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                backgroundColor: '#18181B',
                color: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: '9999px',
              }}
            >
              {list ? list.name : 'Inbox'}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#064E3B' }}>Task Details</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => toggleFavoriteItem(item.id)}
              aria-label="Star"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: item.isFavorite ? '#FEF08A' : '#FFFFFF',
                border: '1.5px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '1.5px 1.5px 0px #18181B',
              }}
            >
              <Star size={15} fill={item.isFavorite ? '#EAB308' : 'none'} color="#18181B" />
            </button>

            <button
              onClick={() => {
                handleSave();
                closeItemDetail();
              }}
              aria-label="Close"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '1.5px 1.5px 0px #18181B',
              }}
            >
              <X size={16} color="#18181B" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Completion Button & Title */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <button
              onClick={() => toggleCompleteItem(item.id)}
              className={`neo-checkbox ${item.isCompleted ? 'checked' : ''}`}
              style={{ width: '32px', height: '32px', borderRadius: '10px', marginTop: '2px' }}
            >
              {item.isCompleted && <Check size={20} color="#064E3B" strokeWidth={3.5} />}
            </button>

            <div style={{ flex: 1 }}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSave}
                placeholder="Item title"
                style={{
                  width: '100%',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#18181B',
                  backgroundColor: 'transparent',
                  textDecoration: item.isCompleted ? 'line-through' : 'none',
                  lineHeight: 1.3,
                }}
              />
            </div>
          </div>

          {/* Priority & Status Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#52525B', textTransform: 'uppercase' }}>
              Priority
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['none', 'low', 'medium', 'high', 'urgent'] as Priority[]).map((p) => {
                const isSelected = priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPriority(p);
                      updateItem(item.id, { priority: p });
                    }}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      borderRadius: '10px',
                      border: '1.5px solid #18181B',
                      backgroundColor: isSelected ? '#18181B' : '#FAFAFA',
                      color: isSelected ? '#FFFFFF' : '#18181B',
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

          {/* Dates & Recurrence */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '4px', textTransform: 'uppercase' }}>
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                  updateItem(item.id, { dueDate: e.target.value || undefined });
                }}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '12px',
                  border: '1.5px solid #18181B',
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: '#FAFAFA',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '4px', textTransform: 'uppercase' }}>
                Repeat
              </label>
              <select
                value={recurrence}
                onChange={(e) => {
                  setRecurrence(e.target.value);
                  updateItem(item.id, { recurrence: e.target.value as any });
                }}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '12px',
                  border: '1.5px solid #18181B',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: '#FAFAFA',
                }}
              >
                <option value="none">Does not repeat</option>
                <option value="daily">Every day</option>
                <option value="weekdays">Weekdays (Mon-Fri)</option>
                <option value="weekly">Every week</option>
                <option value="monthly">Every month</option>
              </select>
            </div>
          </div>

          {/* Subtasks Section */}
          <div
            style={{
              padding: '14px',
              borderRadius: '18px',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #18181B',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#18181B', textTransform: 'uppercase' }}>
                Subtasks ({subtasksDone}/{subtasks.length})
              </span>
              {subtasks.length > 0 && (
                <div style={{ width: '100px' }}>
                  <ProgressBar completed={subtasksDone} total={subtasks.length} showText={false} />
                </div>
              )}
            </div>

            {/* List of subtasks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {subtasks.map((st) => (
                <div
                  key={st.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #18181B',
                  }}
                >
                  <div
                    onClick={() => toggleSubtask(item.id, st.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flex: 1 }}
                  >
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '5px',
                        border: '1.5px solid #18181B',
                        backgroundColor: st.isCompleted ? '#A7F3D0' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {st.isCompleted && <Check size={12} color="#064E3B" strokeWidth={3} />}
                    </div>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        textDecoration: st.isCompleted ? 'line-through' : 'none',
                        color: st.isCompleted ? '#71717A' : '#18181B',
                      }}
                    >
                      {st.title}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteSubtask(item.id, st.id)}
                    aria-label="Delete subtask"
                    style={{ color: '#A1A1AA', padding: '2px', display: 'flex' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add subtask input */}
            <form onSubmit={handleAddSubtask} style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
              <input
                type="text"
                placeholder="Add a step..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '12px',
                  border: '1px solid #18181B',
                  fontSize: '12px',
                  backgroundColor: '#FFFFFF',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 12px',
                  borderRadius: '12px',
                  backgroundColor: '#FEF08A',
                  border: '1px solid #18181B',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Plus size={14} />
              </button>
            </form>
          </div>

          {/* Shopping values if quantity/price exists or list is shopping */}
          {(item.quantity !== undefined || item.price !== undefined || list?.type === 'shopping') && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '16px',
                backgroundColor: '#ECFDF5',
                border: '1.5px solid #18181B',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#064E3B' }}>QTY</label>
                <input
                  type="number"
                  min="1"
                  value={quantity || ''}
                  placeholder="1"
                  onChange={(e) => {
                    const v = e.target.value ? parseInt(e.target.value, 10) : undefined;
                    setQuantity(v);
                    updateItem(item.id, { quantity: v });
                  }}
                  style={{
                    width: '100%',
                    padding: '6px',
                    borderRadius: '8px',
                    border: '1px solid #18181B',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#064E3B' }}>PRICE ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price || ''}
                  placeholder="0.00"
                  onChange={(e) => {
                    const v = e.target.value ? parseFloat(e.target.value) : undefined;
                    setPrice(v);
                    updateItem(item.id, { price: v });
                  }}
                  style={{
                    width: '100%',
                    padding: '6px',
                    borderRadius: '8px',
                    border: '1px solid #18181B',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, color: '#064E3B' }}>EST. TOTAL</label>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#064E3B' }}>
                  ${((quantity || 1) * (price || 0)).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Notes & Thoughts
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSave}
              placeholder="Add links, references, or instructions..."
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '14px',
                border: '1.5px solid #18181B',
                fontSize: '13px',
                backgroundColor: '#FAFAFA',
                lineHeight: 1.45,
              }}
            />
          </div>

          {/* Tags */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Tags
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              {item.tags.map((t) => (
                <TagChip key={t} name={t} size="sm" onRemove={() => handleRemoveTag(t)} />
              ))}
              <input
                type="text"
                placeholder="+ tag name..."
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                style={{
                  padding: '4px 8px',
                  borderRadius: '9999px',
                  border: '1px dashed #18181B',
                  fontSize: '11px',
                  width: '90px',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
          </div>

          {/* Item Actions */}
          <div
            style={{
              paddingTop: '12px',
              borderTop: '1.5px solid #E4E4E7',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
            }}
          >
            <button
              type="button"
              onClick={() => setMoveModalOpen(true)}
              style={{
                padding: '8px 4px',
                borderRadius: '12px',
                border: '1.5px solid #18181B',
                backgroundColor: '#FAFAFA',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#18181B',
              }}
            >
              <FolderInput size={15} />
              <span>Move</span>
            </button>

            <button
              type="button"
              onClick={() => duplicateItem(item.id)}
              style={{
                padding: '8px 4px',
                borderRadius: '12px',
                border: '1.5px solid #18181B',
                backgroundColor: '#FAFAFA',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#18181B',
              }}
            >
              <Copy size={15} />
              <span>Copy</span>
            </button>

            <button
              type="button"
              onClick={() => archiveItem(item.id)}
              style={{
                padding: '8px 4px',
                borderRadius: '12px',
                border: '1.5px solid #18181B',
                backgroundColor: '#FAFAFA',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#18181B',
              }}
            >
              <Archive size={15} />
              <span>Archive</span>
            </button>

            <button
              type="button"
              onClick={() => deleteItem(item.id)}
              style={{
                padding: '8px 4px',
                borderRadius: '12px',
                border: '1.5px solid #18181B',
                backgroundColor: '#FEE2E2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#DC2626',
              }}
            >
              <Trash2 size={15} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
