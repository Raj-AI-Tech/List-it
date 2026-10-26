import React, { useRef, useState } from 'react';
import { useListStore } from '../store/useListStore';
import { AppHeader } from '../components/common/AppHeader';
import { exportToJSON, exportToCSV, exportToTXT, parseImportJSON } from '../utils/exportImport';
import { Download, Upload, FileText, Table, Database, CheckCircle2, AlertCircle } from 'lucide-react';

export const ExportImportScreen: React.FC = () => {
  const { lists, items, sections, tags, settings, importBackupData } = useListStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleExportJSON = () => {
    exportToJSON(lists, items, sections, tags, settings);
    setSuccessMsg('JSON Backup downloaded successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleExportCSV = () => {
    exportToCSV(lists, items);
    setSuccessMsg('CSV Spreadsheet exported successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleExportTXT = () => {
    exportToTXT(lists, items);
    setSuccessMsg('Text Summary exported successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const backup = parseImportJSON(content);
        importBackupData(backup);
        setSuccessMsg(`Restored ${backup.lists.length} lists and ${backup.items.length} tasks!`);
        setErrorMsg('');
        setTimeout(() => setSuccessMsg(''), 4000);
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to parse backup file');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
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
      <AppHeader title="Import & Export" headerColor="mint" />

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {successMsg && (
          <div
            className="animate-pop"
            style={{
              padding: '12px 14px',
              borderRadius: '14px',
              backgroundColor: '#D1FAE5',
              border: '2px solid #064E3B',
              color: '#064E3B',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div
            className="animate-pop"
            style={{
              padding: '12px 14px',
              borderRadius: '14px',
              backgroundColor: '#FEE2E2',
              border: '2px solid #DC2626',
              color: '#DC2626',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.45 }}>
          Your data belongs completely to you. Export your lists anytime in open formats or restore backups offline.
        </p>

        {/* Export Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#18181B', textTransform: 'uppercase' }}>
            Export Options
          </span>

          {/* JSON Full Backup */}
          <div
            className="neo-card"
            style={{
              padding: '14px 16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: '#A7F3D0',
                  border: '1.5px solid #18181B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Database size={18} color="#064E3B" />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800 }}>Full JSON Backup</h4>
                <p style={{ fontSize: '11px', color: '#71717A' }}>Complete lists, tasks, sections & tags</p>
              </div>
            </div>

            <button
              onClick={handleExportJSON}
              className="neo-btn neo-btn-yellow"
              style={{ padding: '8px 12px', fontSize: '12px' }}
            >
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>

          {/* CSV Spreadsheet */}
          <div
            className="neo-card"
            style={{
              padding: '14px 16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: '#FEF08A',
                  border: '1.5px solid #18181B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Table size={18} color="#713F12" />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800 }}>CSV Spreadsheet</h4>
                <p style={{ fontSize: '11px', color: '#71717A' }}>Compatible with Excel, Sheets, Notion</p>
              </div>
            </div>

            <button
              onClick={handleExportCSV}
              className="neo-btn neo-btn-yellow"
              style={{ padding: '8px 12px', fontSize: '12px' }}
            >
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>

          {/* TXT Checklist */}
          <div
            className="neo-card"
            style={{
              padding: '14px 16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: '#FED7AA',
                  border: '1.5px solid #18181B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FileText size={18} color="#7C2D12" />
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800 }}>Plain Text (TXT)</h4>
                <p style={{ fontSize: '11px', color: '#71717A' }}>Human-readable markdown-style checklists</p>
              </div>
            </div>

            <button
              onClick={handleExportTXT}
              className="neo-btn neo-btn-yellow"
              style={{ padding: '8px 12px', fontSize: '12px' }}
            >
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Restore Backup Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: '#18181B', textTransform: 'uppercase' }}>
            Restore Backup
          </span>

          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="neo-card neo-card-interactive"
            style={{
              padding: '24px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '2px dashed #18181B',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#DDD6FE',
                border: '2px solid #18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Upload size={20} color="#4C1D95" strokeWidth={2.5} />
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800 }}>Upload List It JSON Backup</h4>
              <p style={{ fontSize: '12px', color: '#71717A', marginTop: '2px' }}>
                Select a previously exported .json file to restore all lists and settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
