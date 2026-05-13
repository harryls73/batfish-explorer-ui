import React from 'react';
import { UploadCloud, Play, Settings2 } from 'lucide-react';

export default function Sidebar({ onAnalyze, isLoading }) {
  return (
    <div className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--accent-blue)', padding: '0.5rem', borderRadius: '0.5rem' }}>
          <Settings2 size={24} color="white" />
        </div>
        <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Batfish UI</h1>
      </div>

      <div className="glass-panel">
        <h2 style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>NETWORK SNAPSHOT</h2>
        <div className="upload-zone">
          <UploadCloud className="upload-icon" size={32} />
          <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>Upload Config Zip</div>
          <div className="text-secondary" style={{ fontSize: '0.75rem' }}>Drag & drop or click to browse</div>
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.875rem', display: 'flex', justifyContent: 'space-between' }}>
          <span className="text-secondary">Active Snapshot:</span>
          <span style={{ color: 'var(--accent-green)', fontWeight: 500 }}>prod-net-v2.zip</span>
        </div>
      </div>

      <div className="glass-panel">
        <h2 style={{ fontSize: '0.875rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>REACHABILITY QUERY</h2>
        
        <div className="form-group">
          <label>Source IP</label>
          <input type="text" className="input-field" placeholder="e.g. 10.0.1.50" defaultValue="10.0.1.50" />
        </div>

        <div className="form-group">
          <label>Destination IP</label>
          <input type="text" className="input-field" placeholder="e.g. 192.168.100.10" defaultValue="192.168.100.10" />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Protocol</label>
            <select className="input-field" defaultValue="tcp">
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
              <option value="icmp">ICMP</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Dest Port</label>
            <input type="text" className="input-field" placeholder="e.g. 443" defaultValue="443" />
          </div>
        </div>

        <button 
          className="btn-primary" 
          style={{ marginTop: '1rem' }} 
          onClick={onAnalyze}
          disabled={isLoading}
        >
          {isLoading ? (
            <span>Analyzing...</span>
          ) : (
            <>
              <Play size={18} />
              <span>Analyze Path</span>
            </>
          )}
        </button>
      </div>

      <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        Mockup UI - Backend Disconnected
      </div>
    </div>
  );
}
