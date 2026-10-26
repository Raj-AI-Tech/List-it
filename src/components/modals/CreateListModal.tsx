import React, { useState } from 'react';
import { useListStore } from '../../store/useListStore';
import { LIST_COLORS, COLOR_KEYS, AVAILABLE_ICONS } from '../../constants/theme';
import { LIST_TEMPLATES } from '../../constants/templates';
import { IconRenderer } from '../common/IconRenderer';
import { X, Sparkles, Check } from 'lucide-react';
import { ListType, ListLayout } from '../../types';

export const CreateListModal: React.FC = () => {
  const { isCreateListOpen, closeCreateList, createList } = useListStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [selectedIcon, setSelectedIcon] = useState('CheckSquare');
  const [selectedType, setSelectedType] = useState<ListType>('checklist');
  const [selectedLayout, setSelectedLayout] = useState<ListLayout>('checklist');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('blank-list');

  if (!isCreateListOpen) return null;

  const handleTemplateSelect = (tmplId: string) => {
    setSelectedTemplateId(tmplId);
    const tmpl = LIST_TEMPLATES.find((t) => t.id === tmplId);
    if (tmpl && tmpl.id !== 'blank-list') {
      setName(tmpl.name);
      setDescription(tmpl.description);
      setSelectedIcon(tmpl.icon);
      setSelectedColor(tmpl.color);
      setSelectedType(tmpl.type);
      setSelectedLayout(tmpl.layout);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const tmpl = LIST_TEMPLATES.find((t) => t.id === selectedTemplateId);
    const initialSections = tmpl?.defaultSections || [];
    const initialItems = tmpl?.sampleItems || [];

    const newList = createList(
      {
        name: name.trim(),
        description: description.trim(),
        color: selectedColor,
        icon: selectedIcon,
        type: selectedType,
        layout: selectedLayout,
      },
      initialSections,
      initialItems
    );

    // Reset form & close
    setName('');
    setDescription('');
    closeCreateList();
    useListStore.getState().navigateTo('list-detail', newList.id);
  };

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
      onClick={closeCreateList}
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
        {/* Header Pill & Title */}
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #18181B',
            backgroundColor: '#D1FAE5',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '1.5px 1.5px 0px #18181B',
              }}
            >
              <Sparkles size={16} color="#064E3B" />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#18181B' }}>Create a New List</h2>
          </div>

          <button
            onClick={closeCreateList}
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

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '18px 20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Template Quick Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#52525B', marginBottom: '8px', textTransform: 'uppercase' }}>
              Choose a Template
            </label>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                overflowX: 'auto',
                paddingBottom: '6px',
              }}
            >
              {LIST_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplateId === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleTemplateSelect(tmpl.id)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '14px',
                      border: '1.5px solid #18181B',
                      backgroundColor: isSelected ? '#FEF08A' : '#FAFAFA',
                      boxShadow: isSelected ? '2px 2px 0px #18181B' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#18181B',
                      flexShrink: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <IconRenderer name={tmpl.icon} size={14} color="#18181B" />
                    <span>{tmpl.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* List Name */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              List Name *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="e.g. Groceries, Side Project, Movie Watchlist"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '16px',
                border: '2px solid #18181B',
                fontSize: '15px',
                fontWeight: 700,
                color: '#18181B',
                backgroundColor: '#FFFFFF',
                boxShadow: '2px 2px 0px #18181B',
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#52525B', marginBottom: '6px', textTransform: 'uppercase' }}>
              Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Brief summary or purpose"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '14px',
                border: '1.5px solid #18181B',
                fontSize: '13px',
                color: '#18181B',
                backgroundColor: '#FAFAFA',
              }}
            />
          </div>

          {/* Color Palette Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#52525B', marginBottom: '8px', textTransform: 'uppercase' }}>
              Accent Color
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {COLOR_KEYS.map((key) => {
                const colorObj = LIST_COLORS[key];
                const isSelected = selectedColor === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedColor(key)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: colorObj.bg,
                      border: '2px solid #18181B',
                      boxShadow: isSelected ? '3px 3px 0px #18181B' : '1px 1px 0px #18181B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    {isSelected && <Check size={16} strokeWidth={3} color="#18181B" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#52525B', marginBottom: '8px', textTransform: 'uppercase' }}>
              Icon
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '8px',
                maxHeight: '120px',
                overflowY: 'auto',
                padding: '4px',
              }}
            >
              {AVAILABLE_ICONS.map((iconName) => {
                const isSelected = selectedIcon === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      border: '1.5px solid #18181B',
                      backgroundColor: isSelected ? '#FEF08A' : '#FAFAFA',
                      boxShadow: isSelected ? '2px 2px 0px #18181B' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <IconRenderer name={iconName} size={18} color="#18181B" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Layout Mode */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#52525B', marginBottom: '8px', textTransform: 'uppercase' }}>
              Layout Mode
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'checklist', label: 'Checklist' },
                { id: 'sections', label: 'Sections' },
                { id: 'cards', label: 'Cards' },
              ].map((opt) => {
                const isSelected = selectedLayout === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedLayout(opt.id as ListLayout)}
                    style={{
                      padding: '8px',
                      borderRadius: '12px',
                      border: '1.5px solid #18181B',
                      backgroundColor: isSelected ? '#A7F3D0' : '#FAFAFA',
                      boxShadow: isSelected ? '2px 2px 0px #18181B' : 'none',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#18181B',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="neo-btn neo-btn-yellow"
            style={{
              marginTop: '10px',
              padding: '14px',
              fontSize: '16px',
              width: '100%',
            }}
          >
            <Sparkles size={18} />
            <span>Create List</span>
          </button>
        </form>
      </div>
    </div>
  );
};
