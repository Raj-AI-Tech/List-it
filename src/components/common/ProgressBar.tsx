import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
  color?: string;
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  total,
  color = '#A7F3D0',
  showText = true,
}) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {showText && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#18181B' }}>
            {completed} of {total} completed
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              backgroundColor: percentage === 100 ? '#D1FAE5' : '#F4F4F5',
              padding: '1px 7px',
              borderRadius: '9999px',
              border: '1px solid #18181B',
            }}
          >
            {percentage}%
          </span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: '10px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(24, 24, 27, 0.08)',
          border: '1.5px solid #18181B',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: color,
            borderRadius: '9999px',
            transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </div>
    </div>
  );
};
