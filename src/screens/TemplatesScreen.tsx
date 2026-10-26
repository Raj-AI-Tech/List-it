import React from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { LIST_TEMPLATES } from '../constants/templates';
import { LIST_COLORS } from '../constants/theme';
import { IconRenderer } from '../components/common/IconRenderer';
import { Plus } from 'lucide-react';

export const TemplatesScreen: React.FC = () => {
  const { createListFromTemplate, navigateTo } = useListStore();

  const handleUseTemplate = (tmpl: (typeof LIST_TEMPLATES)[0]) => {
    const newList = createListFromTemplate(tmpl);
    navigateTo('list-detail', newList.id);
  };

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
      <AppHeader title="Smart Templates" headerColor="mint" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.45 }}>
          Jumpstart your productivity with curated templates designed for instant organization.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {LIST_TEMPLATES.map((tmpl) => {
            const colorCfg = LIST_COLORS[tmpl.color] || LIST_COLORS.lavender;
            return (
              <div
                key={tmpl.id}
                className="neo-card"
                style={{
                  padding: '16px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        backgroundColor: colorCfg.bg,
                        border: '2px solid #18181B',
                        boxShadow: '2px 2px 0px #18181B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IconRenderer name={tmpl.icon} size={22} color="#18181B" strokeWidth={2.5} />
                    </div>

                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#18181B' }}>
                        {tmpl.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#71717A', marginTop: '2px' }}>
                        {tmpl.description}
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: colorCfg.badge,
                      color: colorCfg.text,
                      border: '1px solid #18181B',
                      textTransform: 'capitalize',
                      flexShrink: 0,
                    }}
                  >
                    {tmpl.layout}
                  </span>
                </div>

                {/* Default sections preview */}
                {tmpl.defaultSections && tmpl.defaultSections.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {tmpl.defaultSections.map((sec) => (
                      <span
                        key={sec}
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          backgroundColor: '#F8FAFC',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: '1px solid #E4E4E7',
                          color: '#52525B',
                        }}
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handleUseTemplate(tmpl)}
                  className="neo-btn neo-btn-yellow"
                  style={{
                    padding: '10px',
                    fontSize: '13px',
                    width: '100%',
                  }}
                >
                  <Plus size={15} strokeWidth={3} />
                  <span>Use This Template</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
