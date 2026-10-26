import React, { useState } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import {
  User,
  Volume2,
  Vibrate,
  Shield,
  RotateCcw,
  Trash2,
  FileDown,
  Info,
  Archive,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, resetToSampleData, clearAllData, navigateTo } = useListStore();
  const [name, setName] = useState(settings.userName || 'Alex');
  const isDark = false;

  const handleNameBlur = () => {
    updateSettings({ userName: name.trim() || 'Alex' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        paddingBottom: '16px',
      }}
    >
      <AppHeader title="Settings" subtitle="Preferences & storage" headerColor="mint" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Profile Card */}
        <div
          style={{
            padding: '16px 18px',
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            borderRadius: '20px',
            border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
            boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#A7F3D0',
              border: '1.5px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <User size={22} color="#064E3B" strokeWidth={2.2} />
          </div>

          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 800,
                color: isDark ? '#A1A1AA' : '#71717A',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
              style={{
                width: '100%',
                fontSize: '16px',
                fontWeight: 800,
                color: isDark ? '#F4F4F5' : '#18181B',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                marginTop: '2px',
              }}
            />
          </div>
        </div>

        {/* 1. PREFERENCES */}
        <div
          style={{
            padding: '18px 20px',
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            borderRadius: '22px',
            border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
            boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: isDark ? '#A1A1AA' : '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Preferences
          </span>


          {/* Tactile Sound FX Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Volume2 size={18} color={isDark ? '#A1A1AA' : '#52525B'} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#F4F4F5' : '#18181B', display: 'block' }}>
                  Sound Effects
                </span>
                <span style={{ fontSize: '11px', color: isDark ? '#A1A1AA' : '#71717A' }}>
                  Pops, clicks, and chimes
                </span>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              aria-label="Toggle sound"
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '9999px',
                border: '1.5px solid #18181B',
                backgroundColor: settings.soundEnabled ? '#A7F3D0' : isDark ? '#3F3F46' : '#E4E4E7',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#18181B',
                  position: 'absolute',
                  top: '1.5px',
                  left: settings.soundEnabled ? '22px' : '2px',
                  transition: 'left 0.2s ease',
                }}
              />
            </button>
          </div>

          {/* Haptics Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Vibrate size={18} color={isDark ? '#A1A1AA' : '#52525B'} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#F4F4F5' : '#18181B', display: 'block' }}>
                  Haptics
                </span>
                <span style={{ fontSize: '11px', color: isDark ? '#A1A1AA' : '#71717A' }}>
                  Subtle mobile vibrations
                </span>
              </div>
            </div>
            <button
              onClick={() => updateSettings({ hapticsEnabled: !settings.hapticsEnabled })}
              aria-label="Toggle haptics"
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '9999px',
                border: '1.5px solid #18181B',
                backgroundColor: settings.hapticsEnabled ? '#A7F3D0' : isDark ? '#3F3F46' : '#E4E4E7',
                position: 'relative',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#18181B',
                  position: 'absolute',
                  top: '1.5px',
                  left: settings.hapticsEnabled ? '22px' : '2px',
                  transition: 'left 0.2s ease',
                }}
              />
            </button>
          </div>
        </div>

        {/* 2. DATA */}
        <div
          style={{
            padding: '18px 20px',
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            borderRadius: '22px',
            border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
            boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: isDark ? '#A1A1AA' : '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Data & Storage
          </span>

          <button
            onClick={() => navigateTo('export-import')}
            style={{
              padding: '12px 14px',
              backgroundColor: isDark ? '#3F3F46' : '#F4F4F5',
              borderRadius: '14px',
              border: isDark ? '1.5px solid #52525B' : '1.5px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileDown size={18} color={isDark ? '#F4F4F5' : '#18181B'} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#F4F4F5' : '#18181B' }}>
                Import & Export Backup (JSON/CSV)
              </span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#A1A1AA' : '#71717A' }}>→</span>
          </button>

          <button
            onClick={() => navigateTo('trash')}
            style={{
              padding: '12px 14px',
              backgroundColor: isDark ? '#3F3F46' : '#F4F4F5',
              borderRadius: '14px',
              border: isDark ? '1.5px solid #52525B' : '1.5px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Trash2 size={18} color={isDark ? '#F4F4F5' : '#18181B'} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#F4F4F5' : '#18181B' }}>
                Trash & Recently Deleted
              </span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#A1A1AA' : '#71717A' }}>→</span>
          </button>

          <button
            onClick={() => navigateTo('archive')}
            style={{
              padding: '12px 14px',
              backgroundColor: isDark ? '#3F3F46' : '#F4F4F5',
              borderRadius: '14px',
              border: isDark ? '1.5px solid #52525B' : '1.5px solid #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Archive size={18} color={isDark ? '#F4F4F5' : '#18181B'} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#F4F4F5' : '#18181B' }}>
                Archived Lists & Items
              </span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: isDark ? '#A1A1AA' : '#71717A' }}>→</span>
          </button>

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              onClick={resetToSampleData}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '12px',
                border: '1.5px solid #18181B',
                backgroundColor: '#FEF08A',
                fontSize: '12px',
                fontWeight: 800,
                color: '#18181B',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <RotateCcw size={14} />
              <span>Load Sample</span>
            </button>

            <button
              onClick={clearAllData}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '12px',
                border: '1.5px solid #18181B',
                backgroundColor: '#FEE2E2',
                fontSize: '12px',
                fontWeight: 800,
                color: '#DC2626',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Trash2 size={14} />
              <span>Clear All Data</span>
            </button>
          </div>
        </div>

        {/* 3. APP & PRIVACY */}
        <div
          style={{
            padding: '18px 20px',
            backgroundColor: isDark ? '#27272A' : '#FFFFFF',
            borderRadius: '22px',
            border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #18181B',
            boxShadow: isDark ? '2px 2px 0px #3F3F46' : '2px 2px 0px #18181B',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: isDark ? '#A1A1AA' : '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            About & Privacy
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Info size={18} color={isDark ? '#A78BFA' : '#7C3AED'} />
            <div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: isDark ? '#F4F4F5' : '#18181B', display: 'block' }}>
                List It — Universal List Manager
              </span>
              <span style={{ fontSize: '11px', color: isDark ? '#A1A1AA' : '#71717A' }}>
                Version 2.0 (Clean & Spacious Edition)
              </span>
            </div>
          </div>

          <div
            style={{
              padding: '12px 14px',
              borderRadius: '14px',
              backgroundColor: isDark ? '#064E3B22' : '#ECFDF5',
              border: isDark ? '1px solid #059669' : '1px solid #10B981',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            <Shield size={16} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <h5 style={{ fontSize: '12px', fontWeight: 800, color: isDark ? '#34D399' : '#064E3B', margin: 0 }}>
                100% Offline-First Privacy
              </h5>
              <p style={{ fontSize: '11px', color: isDark ? '#A7F3D0' : '#065F46', margin: '2px 0 0 0', lineHeight: 1.4 }}>
                Your lists and tasks stay strictly in your device's local storage. No trackers, telemetry, or external accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
