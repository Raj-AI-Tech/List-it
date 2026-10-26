import React from 'react';
import { useListStore } from '../store/useListStore';
import { Sparkles, FolderPlus } from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo, updateSettings, openCreateList, settings } = useListStore();
  const isDark = false;

  const handleCreateFirstList = () => {
    updateSettings({ hasCompletedOnboarding: true });
    navigateTo('home');
    setTimeout(() => {
      openCreateList();
    }, 100);
  };

  const handleMaybeLater = () => {
    updateSettings({ hasCompletedOnboarding: true });
    navigateTo('home');
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 24px',
        textAlign: 'center',
        backgroundColor: isDark ? '#1E1B2E' : '#E4DCFA',
        minHeight: '100%',
        gap: '28px',
      }}
    >
      {/* Central Welcome Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '350px',
          padding: '36px 24px',
          backgroundColor: isDark ? '#27272A' : '#FFFFFF',
          borderRadius: '28px',
          border: isDark ? '2px solid #3F3F46' : '2px solid #18181B',
          boxShadow: isDark ? '3px 3px 0px #3F3F46' : '3px 3px 0px #18181B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Brand Icon */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '22px',
            backgroundColor: '#A7F3D0',
            border: '2px solid #18181B',
            boxShadow: '2.5px 2.5px 0px #18181B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Sparkles size={36} color="#065F46" strokeWidth={2.5} />
        </div>

        <div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: isDark ? '#F4F4F5' : '#18181B',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            LIST IT
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: isDark ? '#A1A1AA' : '#52525B',
              margin: '8px 0 0 0',
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Everything you need to remember, in one place.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={handleCreateFirstList}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '16px',
              backgroundColor: '#FEF08A',
              border: '2px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
              fontSize: '15px',
              fontWeight: 800,
              color: '#18181B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <FolderPlus size={18} />
            <span>Create your first list</span>
          </button>

          <button
            onClick={handleMaybeLater}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: 'transparent',
              border: isDark ? '1.5px solid #3F3F46' : '1.5px solid #E4E4E7',
              fontSize: '14px',
              fontWeight: 700,
              color: isDark ? '#A1A1AA' : '#71717A',
              cursor: 'pointer',
            }}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};
