import React from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { EmptyState } from '../components/common/EmptyState';
import { IconRenderer } from '../components/common/IconRenderer';
import { RotateCcw, Trash2 } from 'lucide-react';

export const ArchiveScreen: React.FC = () => {
  const { lists, items, restoreList, restoreItem, permanentDeleteList, permanentDeleteItem } = useListStore();

  const archivedLists = lists.filter((l) => l.isArchived && !l.isDeleted);
  const archivedItems = items.filter((i) => i.isArchived && !i.isDeleted);

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
      <AppHeader title="Archive Vault" headerColor="lavender" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Archived Lists */}
        {archivedLists.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#18181B', textTransform: 'uppercase' }}>
              Archived Lists ({archivedLists.length})
            </span>
            {archivedLists.map((list) => (
              <div
                key={list.id}
                className="neo-card"
                style={{
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <IconRenderer name={list.icon} size={18} color="#18181B" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#18181B' }}>
                    {list.name}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => restoreList(list.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#A7F3D0',
                      border: '1.5px solid #18181B',
                      fontSize: '11px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <RotateCcw size={12} />
                    <span>Restore</span>
                  </button>

                  <button
                    onClick={() => permanentDeleteList(list.id)}
                    style={{
                      padding: '6px',
                      borderRadius: '8px',
                      backgroundColor: '#FEE2E2',
                      border: '1.5px solid #18181B',
                      color: '#DC2626',
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Archived Items */}
        {archivedItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#18181B', textTransform: 'uppercase' }}>
              Archived Items ({archivedItems.length})
            </span>
            {archivedItems.map((item) => (
              <div
                key={item.id}
                className="neo-card"
                style={{
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#18181B' }}>
                  {item.title}
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => restoreItem(item.id)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#A7F3D0',
                      border: '1.5px solid #18181B',
                      fontSize: '11px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <RotateCcw size={12} />
                    <span>Restore</span>
                  </button>

                  <button
                    onClick={() => permanentDeleteItem(item.id)}
                    style={{
                      padding: '6px',
                      borderRadius: '8px',
                      backgroundColor: '#FEE2E2',
                      border: '1.5px solid #18181B',
                      color: '#DC2626',
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {archivedLists.length === 0 && archivedItems.length === 0 && (
          <EmptyState
            title="Nothing is archived."
            description="Finished or shelved lists and items will sleep here safely."
            illustration="lists"
          />
        )}
      </div>
    </div>
  );
};
