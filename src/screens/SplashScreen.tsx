import React from 'react';
import { useListStore } from '../store/useListStore';
import { sound } from '../utils/sound';

export const SplashScreen: React.FC = () => {
  const { navigateTo, updateSettings } = useListStore();

  const handleGetStarted = () => {
    sound.playClick();
    navigateTo('onboarding');
  };

  const handleSkip = () => {
    sound.playClick();
    updateSettings({ hasCompletedOnboarding: true });
    navigateTo('home');
  };

  return (
    <div
      className="grid-bg-pattern animate-fade-in"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '36px 24px 28px 24px',
        position: 'relative',
        minHeight: '100%',
      }}
    >
      {/* Top subtle decorative pill */}
      <div
        style={{
          padding: '6px 14px',
          borderRadius: '9999px',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #18181B',
          boxShadow: '1.5px 1.5px 0px #18181B',
          fontSize: '11px',
          fontWeight: 800,
          color: '#18181B',
        }}
      >
        UNIVERSAL ORGANIZER
      </div>

      {/* Central Illustration matching Reference Middle Screen */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          marginTop: '10px',
        }}
      >
        <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Organic wavy purple blob */}
          <svg viewBox="0 0 200 200" width="220" height="220" style={{ position: 'absolute' }}>
            <path
              d="M45,-65.7C58.3,-58.5,69.2,-46.7,75.4,-32.8C81.6,-18.9,83.1,-2.9,79.5,11.8C75.9,26.5,67.2,40,55.5,49.9C43.8,59.8,29.1,66.1,13.6,69.8C-1.9,73.5,-18.2,74.5,-31.6,68.4C-45,62.3,-55.5,49,-64.1,34.5C-72.7,20,-79.4,4.3,-77.7,-10.8C-76.1,-25.9,-66,-40.4,-53.4,-48.1C-40.8,-55.8,-25.6,-56.8,-10.7,-60.7C4.2,-64.7,31.7,-72.9,45,-65.7Z"
              transform="translate(100 100)"
              fill="#C4B5FD"
              stroke="#18181B"
              strokeWidth="3.5"
            />
            {/* Center hole illusion */}
            <circle cx="85" cy="115" r="16" fill="#E4DCFA" stroke="#18181B" strokeWidth="3" />
          </svg>

          {/* Hand holding device illustration */}
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" style={{ position: 'relative', zIndex: 2 }}>
            {/* Arm sleeve */}
            <path d="M10 80 Q 40 75 60 70 L 65 95 Q 35 100 10 95 Z" fill="#FBCFE8" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Hand */}
            <path d="M55 65 C65 60, 85 60, 95 68 C100 72, 100 80, 95 85 L 85 92 C 75 98, 65 95, 60 90 Z" fill="#FED7AA" stroke="#18181B" strokeWidth="3" strokeLinejoin="round" />
            
            {/* Smartphone device with list checkmark */}
            <rect x="75" y="30" width="55" height="85" rx="14" fill="#18181B" transform="rotate(18 80 40)" stroke="#18181B" strokeWidth="3" />
            
            {/* Screen glowing white line */}
            <rect x="80" y="38" width="45" height="70" rx="10" fill="#27272A" transform="rotate(18 80 40)" />
            
            {/* Checkmark antenna inside screen */}
            <g transform="translate(94, 60) rotate(18)">
              {/* Waves */}
              <path d="M-8 -12 A 15 15 0 0 1 8 -12" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M-13 -17 A 22 22 0 0 1 13 -17" stroke="#FEF08A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Checkmark */}
              <path d="M-6 2 L -1 7 L 8 -3" stroke="#A7F3D0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </svg>
        </div>

        {/* Brand Header Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              padding: '10px 24px',
              backgroundColor: '#D1FAE5',
              borderRadius: '20px',
              border: '2.5px solid #18181B',
              boxShadow: '3px 3px 0px #18181B',
            }}
          >
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 900,
                letterSpacing: '1px',
                color: '#18181B',
                textAlign: 'center',
              }}
            >
              LIST IT
            </h1>
          </div>

          <div
            style={{
              padding: '6px 18px',
              backgroundColor: '#FFFFFF',
              borderRadius: '9999px',
              border: '1.5px solid #18181B',
              boxShadow: '2px 2px 0px #18181B',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#52525B' }}>
              Your universal list system
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={handleGetStarted}
          className="neo-btn neo-btn-yellow"
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 800,
          }}
        >
          Get started
        </button>

        <button
          onClick={handleSkip}
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#52525B',
            padding: '6px',
            cursor: 'pointer',
          }}
        >
          Skip
        </button>
      </div>
    </div>
  );
};
