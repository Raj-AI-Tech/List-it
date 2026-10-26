import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { useListStore } from '../../store/useListStore';
import { sound } from '../../utils/sound';

interface DeviceFrameProps {
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children }) => {
  const { settings, updateSettings, resetToSampleData } = useListStore();
  const [currentTime, setCurrentTime] = useState('9:41');
  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleFrame = () => {
    updateSettings({ deviceFrame: !settings.deviceFrame });
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
    sound.setEnabled(!settings.soundEnabled, settings.hapticsEnabled);
  };

  const isDark = false;

  // Real Mobile Device: Full-Screen Native UI with Safe Areas
  if (isMobileScreen) {
    return (
      <div
        style={{
          width: '100%',
          height: '100dvh',
          minHeight: '100vh',
          backgroundColor: '#E4DCFA',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? 'radial-gradient(circle at 50% 20%, #1e1b2e 0%, #0d0c15 100%)'
          : 'radial-gradient(circle at 50% 20%, #E8E1FC 0%, #D8CEF6 100%)',
        padding: settings.deviceFrame ? '20px 12px' : '0',
        transition: 'background 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Floating Demo Control Header */}
      <header
        style={{
          width: '100%',
          maxWidth: settings.deviceFrame ? '450px' : '900px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: settings.deviceFrame ? '14px' : '0',
          padding: settings.deviceFrame ? '0 4px' : '12px 18px',
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: '#A7F3D0',
              border: '1.5px solid #18181B',
              boxShadow: '1.5px 1.5px 0px #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={16} color="#064E3B" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '15px', color: isDark ? '#F4F4F5' : '#18181B' }}>
            List It
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '9999px',
              backgroundColor: '#FEF08A',
              border: '1px solid #18181B',
              color: '#713F12',
            }}
          >
            Pro
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Reset Demo Data Button */}
          <button
            onClick={resetToSampleData}
            title="Reset to Demo Data"
            style={{
              padding: '6px 10px',
              borderRadius: '9999px',
              border: '1.5px solid #18181B',
              backgroundColor: '#FFFFFF',
              boxShadow: '1.5px 1.5px 0px #18181B',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#18181B',
            }}
          >
            <RotateCcw size={13} />
            <span>Reset Demo</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={settings.soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              border: '1.5px solid #18181B',
              backgroundColor: '#FFFFFF',
              boxShadow: '1.5px 1.5px 0px #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#18181B',
            }}
          >
            {settings.soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} color="#DC2626" />}
          </button>


          {/* Frame Toggle */}
          <button
            onClick={toggleFrame}
            title={settings.deviceFrame ? 'Switch to Full Width Mode' : 'Switch to iPhone Frame'}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9999px',
              border: '1.5px solid #18181B',
              backgroundColor: settings.deviceFrame ? '#A7F3D0' : '#FFFFFF',
              boxShadow: '1.5px 1.5px 0px #18181B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#18181B',
            }}
          >
            {settings.deviceFrame ? <Monitor size={15} /> : <Smartphone size={15} />}
          </button>
        </div>
      </header>

      {/* Screen Container */}
      {settings.deviceFrame ? (
        <div
          style={{
            width: '100%',
            maxWidth: '414px',
            height: '860px',
            backgroundColor: isDark ? '#1E1B2E' : '#E4DCFA',
            borderRadius: '48px',
            border: '8px solid #18181B',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.2) inset',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* iPhone Status Bar */}
          <div
            style={{
              width: '100%',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              fontSize: '13px',
              fontWeight: 700,
              color: isDark ? '#F4F4F5' : '#18181B',
              zIndex: 35,
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <span style={{ letterSpacing: '-0.3px' }}>{currentTime}</span>

            {/* Dynamic Island Pill */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '10px',
                transform: 'translateX(-50%)',
                width: '110px',
                height: '26px',
                backgroundColor: '#000000',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#18181B', border: '2px solid #27272A' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800 }}>5G</span>
              {/* Battery indicator */}
              <div
                style={{
                  width: '20px',
                  height: '11px',
                  borderRadius: '3px',
                  border: isDark ? '1.5px solid #F4F4F5' : '1.5px solid #18181B',
                  padding: '1px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ width: '85%', height: '100%', backgroundColor: '#10B981', borderRadius: '1.5px' }} />
              </div>
            </div>
          </div>

          {/* App View Area */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative',
              minHeight: 0,
            }}
          >
            {children}
          </div>

          {/* iPhone Home Indicator */}
          <div
            style={{
              width: '100%',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              zIndex: 35,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '130px',
                height: '4px',
                borderRadius: '9999px',
                backgroundColor: isDark ? 'rgba(255,255,255,0.4)' : '#18181B',
              }}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            maxWidth: '640px',
            minHeight: '100vh',
            backgroundColor: isDark ? '#1E1B2E' : '#E4DCFA',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
