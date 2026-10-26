import React, { useState } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { EmptyState } from '../components/common/EmptyState';
import { RotateCcw, Trash2, AlertTriangle } from 'lucide-react';

export const TrashScreen: React.FC = () => {
  const {
    lists,
    items,
    restoreList,
    restoreItem,
    permanentDeleteList,
    permanentDeleteItem,
    emptyTrash,
    restoreAllTrash,
  } = useListStore();

  const [showConfirmEmpty, setShowConfirmEmpty] = useState(false);

  const deletedLists = lists.filter((l) => l.isDeleted);
  const deletedItems = items.filter((i) => i.isDeleted);

  const totalDeleted = deletedLists.length + deletedItems.length;

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
      <AppHeader
        title="Trash Bin"
        headerColor="white"
        rightAction={
          totalDeleted > 0 ? (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={restoreAllTrash}
                style={{
                  padding: '6px 10px',
                  borderRadius: '10px',
                  backgroundColor: '#A7F3D0',
                  border: '1.5px solid #18181B',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Restore All
              </button>
              <button
                onClick={() => setShowConfirmEmpty(true)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '10px',
                  backgroundColor: '#FEE2E2',
                  border: '1.5px solid #18181B',
                  color: '#DC2626',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Empty
              </button>
            </div>
          ) : undefined
        }
      />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Deleted Lists */}
        {deletedLists.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase' }}>
              Deleted Lists ({deletedLists.length})
            </span>
            {deletedLists.map((list) => (
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
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#18181B' }}>
                  {list.name}
                </span>

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

        {/* Deleted Items */}
        {deletedItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase' }}>
              Deleted Items ({deletedItems.length})
            </span>
            {deletedItems.map((item) => (
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

        {totalDeleted === 0 && (
          <EmptyState
            title="Trash is clean"
            description="Nothing in trash. Destructive deletions can always be undone from here."
            illustration="completed"
          />
        )}
      </div>

      {/* Confirmation Dialog for Empty Trash */}
      {showConfirmEmpty && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(24, 24, 27, 0.5)',
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setShowConfirmEmpty(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-pop neo-card"
            style={{
              width: '100%',
              maxWidth: '320px',
              padding: '24px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '14px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                border: '2px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={24} color="#DC2626" />
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#18181B' }}>
              Permanently empty trash?
            </h3>
            <p style={{ fontSize: '13px', color: '#71717A' }}>
              This will remove {totalDeleted} deleted {totalDeleted === 1 ? 'item' : 'items'} permanently. This action cannot be reversed.
            </p>

            <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '6px' }}>
              <button
                onClick={() => setShowConfirmEmpty(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  border: '1.5px solid #18181B',
                  backgroundColor: '#FAFAFA',
                  fontWeight: 700,
                  fontSize: '13px',
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  emptyTrash();
                  setShowConfirmEmpty(false);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '12px',
                  border: '1.5px solid #18181B',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '13px',
                  boxShadow: '1.5px 1.5px 0px #18181B',
                }}
              >
                Empty
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
