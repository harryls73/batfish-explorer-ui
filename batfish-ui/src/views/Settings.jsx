import React, { useState } from 'react';
import { Settings as SettingsIcon, Server, UploadCloud, CheckCircle, Database, Network } from 'lucide-react';

export default function Settings() {
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('9997');
  const [testStatus, setTestStatus] = useState('idle'); // idle, testing, success, error

  const handleTestConnection = () => {
    setTestStatus('testing');
    // Simulate API call to test connection
    setTimeout(() => {
      setTestStatus('success');
    }, 1500);
  };

  return (
    <div className="main-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <SettingsIcon size={32} color="var(--accent-blue)" />
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Engine Configuration</h2>
          <p className="text-secondary">Manage your connection to the Batfish analysis engine and network snapshots.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', maxWidth: '1000px' }}>
        
        {/* Left Column: Connection Settings */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              <Server size={20} color="var(--accent-blue)" />
              Batfish Server Connection
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Host / IP Address</label>
              <input 
                type="text" 
                className="input-field" 
                value={host}
                onChange={(e) => setHost(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Port</label>
              <input 
                type="text" 
                className="input-field" 
                value={port}
                onChange={(e) => setPort(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                className="btn-primary" 
                onClick={handleTestConnection}
                disabled={testStatus === 'testing'}
                style={{ flex: 1 }}
              >
                {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
              </button>
              
              {testStatus === 'success' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontWeight: 500, fontSize: '0.875rem' }}>
                  <CheckCircle size={18} />
                  Connected
                </div>
              )}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
             <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              <Database size={20} color="#eab308" />
              Active Network Snapshot
            </h3>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0.5rem', border: '1px solid var(--panel-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="text-secondary">Current Network:</span>
                <strong style={{ color: 'var(--text-primary)' }}>example_network</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="text-secondary">Active Snapshot:</span>
                <strong style={{ color: 'var(--text-primary)' }}>snapshot-2026-05-12</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-secondary">Nodes Parsed:</span>
                <strong style={{ color: 'var(--accent-green)' }}>13 Devices</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Upload Snapshot */}
        <div style={{ flex: 1 }}>
          <div className="glass-panel" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              <Network size={20} color="var(--accent-green)" />
              Initialize New Network
            </h3>
            <p className="text-secondary" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Upload a .zip file containing your raw configuration files (Cisco, Juniper, Palo Alto) to initialize a new Batfish analysis snapshot.
            </p>

            <div style={{ 
              flex: 1, 
              border: '2px dashed var(--panel-border)', 
              borderRadius: '0.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.2)',
              cursor: 'pointer',
              minHeight: '200px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--panel-border)'}
            >
              <UploadCloud size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.25rem' }}>Drag & Drop Snapshot Zip</p>
              <p className="text-secondary" style={{ fontSize: '0.75rem' }}>or click to browse files</p>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', background: 'var(--accent-green)' }}>
              Upload & Initialize Engine
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
