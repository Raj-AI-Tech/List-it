import React, { useState, useEffect } from 'react';
import { useListStore } from '../../store/useListStore';
import { parseSmartInput } from '../../utils/smartParser';
import { Priority } from '../../types';
import { TagChip } from '../common/TagChip';
import { PriorityBadge } from '../common/PriorityBadge';
import { X, Plus, Calendar, Tag, AlertCircle, ShoppingCart } from 'lucide-react';

interface QuickAddModalProps {
  initialListId?: string;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({ initialListId }) => {
  const {
    isQuickAddOpen,
    isCreateItemOpen,
    closeQuickAdd,
    closeCreateItem,
    createItem,
    lists,
    activeListId,
    sections,
  } = useListStore();

  const isOpen = isQuickAddOpen || isCreateItemOpen;

  const [rawInput, setRawInput] = useState('');
  const [selectedListId, setSelectedListId] = useState('inbox');
  const [selectedSectionId, setSelectedSectionId] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<Priority>('none');
  const [dueDate, setDueDate] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number | undefined>(undefined);

  // Sync list ID when modal opens
  useEffect(() => {
    if (isOpen) {
      const targetList = initialListId || activeListId || 'inbox';
      setSelectedListId(targetList);
      setRawInput('');
      setNotes('');
      setPriority('none');
      setDueDate('');
      setTags([]);
      setQuantity(undefined);
      setPrice(undefined);
    }
  }, [isOpen, initialListId, activeListId]);

  // Real-time smart parsing preview
  const parsed = parseSmartInput(rawInput);

  const handleSmartParseApply = () => {
    if (parsed.priority !== 'none') setPriority(parsed.priority);
    if (parsed.dueDate) setDueDate(parsed.dueDate);
    if (parsed.tags.length > 0) {
      setTags((prev) => Array.from(new Set([...prev, ...parsed.tags])));
    }
    if (parsed.quantity) setQuantity(parsed.quantity);
    if (parsed.price) setPrice(parsed.price);
  };

  if (!isOpen) return null;

  const handleClose = () => {
    closeQuickAdd();
    closeCreateItem();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = parsed.title.trim() || rawInput.trim();
    if (!finalTitle) return;

    // Apply any detected smart tokens if user didn't override
    const finalPriority = priority !== 'none' ? priority : parsed.priority;
    const finalDueDate = dueDate || parsed.dueDate;
    const finalTags = Array.from(new Set([...tags, ...parsed.tags]));
    const finalQty = quantity !== undefined ? quantity : parsed.quantity;
    const finalPrice = price !== undefined ? price : parsed.price;

    createItem({
      title: finalTitle,
      listId: selectedListId,
      sectionId: selectedSectionId || undefined,
      priority: finalPriority,
      dueDate: finalDueDate || undefined,
      tags: finalTags,
      notes: notes.trim() || undefined,
      quantity: finalQty,
      price: finalPrice,
    });

    handleClose();
  };

  const listSections = sections.filter((s) => s.listId === selectedListId);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 24, 27, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 60,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '430px',
          maxHeight: '90vh',
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
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#18181B' }}>What do you want to List?</h2>
          </div>
          <button
            onClick={handleClose}
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
              boxShadow: '1.5px 1.5px 0px #18181B',
            }}
          >
            <X size={15} color="#18181B" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '16px 20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {/* Main Input */}
          <div>
            <input
              type="text"
              autoFocus
              placeholder="e.g. Buy fresh milk #groceries tomorrow !high"
              value={rawInput}
              onChange={(e) => {
                setRawInput(e.target.value);
              }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '16px',
                border: '2px solid #18181B',
                fontSize: '15px',
                fontWeight: 700,
                color: '#18181B',
                backgroundColor: '#FFFFFF',
                boxShadow: '2px 2px 0px #18181B',
              }}
            />

            {/* Smart Detection Hint / Pill */}
            {(parsed.priority !== 'none' || parsed.dueDate || parsed.tags.length > 0 || parsed.quantity) && (
              <div
                style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  backgroundColor: '#ECFDF5',
                  border: '1px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#064E3B',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span>Detected:</span>
                  {parsed.dueDate && <span style={{ backgroundColor: '#D1FAE5', padding: '1px 6px', borderRadius: '4px' }}>📅 {parsed.dueDate}</span>}
                  {parsed.priority !== 'none' && <span style={{ backgroundColor: '#FEF08A', padding: '1px 6px', borderRadius: '4px' }}>⚡ {parsed.priority}</span>}
                  {parsed.tags.map((t) => (
                    <span key={t} style={{ backgroundColor: '#DDD6FE', padding: '1px 6px', borderRadius: '4px' }}>#{t}</span>
                  ))}
                  {parsed.quantity && <span style={{ backgroundColor: '#FED7AA', padding: '1px 6px', borderRadius: '4px' }}>Qty: {parsed.quantity}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Target List Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Add to List
            </label>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {/* Inbox */}
              <button
                type="button"
                onClick={() => {
                  setSelectedListId('inbox');
                  setSelectedSectionId(undefined);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '12px',
                  border: '1.5px solid #18181B',
                  backgroundColor: selectedListId === 'inbox' ? '#DDD6FE' : '#FAFAFA',
                  boxShadow: selectedListId === 'inbox' ? '1.5px 1.5px 0px #18181B' : 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#18181B',
                  flexShrink: 0,
                }}
              >
                📥 Inbox
              </button>

              {lists
                .filter((l) => !l.isDeleted && !l.isArchived)
                .map((list) => {
                  const isSelected = selectedListId === list.id;
                  return (
                    <button
                      key={list.id}
                      type="button"
                      onClick={() => {
                        setSelectedListId(list.id);
                        setSelectedSectionId(undefined);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        border: '1.5px solid #18181B',
                        backgroundColor: isSelected ? '#A7F3D0' : '#FAFAFA',
                        boxShadow: isSelected ? '1.5px 1.5px 0px #18181B' : 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#18181B',
                        flexShrink: 0,
                      }}
                    >
                      {list.name}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Optional Section Selector if list has sections */}
          {listSections.length > 0 && (
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
                Section
              </label>
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedSectionId(undefined)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '10px',
                    border: '1px solid #18181B',
                    backgroundColor: !selectedSectionId ? '#FEF08A' : '#FAFAFA',
                    fontSize: '11px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  (No section)
                </button>
                {listSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setSelectedSectionId(sec.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '10px',
                      border: '1px solid #18181B',
                      backgroundColor: selectedSectionId === sec.id ? '#FEF08A' : '#FAFAFA',
                      fontSize: '11px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Priority Chips */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Priority
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['none', 'low', 'medium', 'high', 'urgent'] as Priority[]).map((p) => {
                const isSelected = priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
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

          {/* Due Date & Notes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#52525B', marginBottom: '4px', textTransform: 'uppercase' }}>
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
                Add Tag
              </label>
              <input
                type="text"
                placeholder="tag name + enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (tagInput.trim()) {
                      const clean = tagInput.trim().toLowerCase().replace(/^#/, '');
                      if (!tags.includes(clean)) setTags([...tags, clean]);
                      setTagInput('');
                    }
                  }
                }}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '12px',
                  border: '1.5px solid #18181B',
                  fontSize: '12px',
                  backgroundColor: '#FAFAFA',
                }}
              />
            </div>
          </div>

          {/* Selected tags */}
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {tags.map((t) => (
                <TagChip
                  key={t}
                  name={t}
                  size="sm"
                  onRemove={() => setTags(tags.filter((tag) => tag !== t))}
                />
              ))}
            </div>
          )}

          {/* Optional Notes */}
          <div>
            <textarea
              placeholder="Add optional notes or checklist details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '14px',
                border: '1.5px solid #18181B',
                fontSize: '13px',
                backgroundColor: '#FAFAFA',
                resize: 'none',
              }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="neo-btn neo-btn-mint"
            style={{
              padding: '14px',
              fontSize: '16px',
              width: '100%',
            }}
          >
            <Plus size={18} strokeWidth={3} />
            <span>Add Item</span>
          </button>
        </form>
      </div>
    </div>
  );
};
