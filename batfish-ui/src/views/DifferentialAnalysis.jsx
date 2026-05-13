import React, { useState } from 'react';
import { MarkerType } from 'reactflow';
import { UploadCloud, CheckCircle, AlertTriangle, GitCompare, ArrowRight, ShieldAlert } from 'lucide-react';
import NetworkGraph from '../components/NetworkGraph';

const BEFORE_NODES = [
  { id: 'src', type: 'custom', data: { label: 'Web Server', ip: '10.0.1.50', type: 'host' }, position: { x: 50, y: 150 } },
  { id: 'core', type: 'custom', data: { label: 'Core Router', ip: '10.0.1.1', type: 'router' }, position: { x: 250, y: 150 } },
  { id: 'fw', type: 'custom', data: { label: 'Firewall', ip: '192.168.1.1', type: 'firewall' }, position: { x: 450, y: 150 } },
  { id: 'db', type: 'custom', data: { label: 'Database', ip: '192.168.100.10', type: 'host' }, position: { x: 650, y: 150 } }
];

const BEFORE_EDGES = [
  { id: 'e1', source: 'src', target: 'core', animated: true, style: { stroke: 'var(--accent-green)', strokeWidth: 2 } },
  { id: 'e2', source: 'core', target: 'fw', animated: true, style: { stroke: 'var(--accent-green)', strokeWidth: 2 } },
  { id: 'e3', source: 'fw', target: 'db', animated: true, label: 'PERMIT: allow-db', labelClassName: 'edge-label', style: { stroke: 'var(--accent-green)', strokeWidth: 2 } }
];

const AFTER_NODES = [
  { id: 'src', type: 'custom', data: { label: 'Web Server', ip: '10.0.1.50', type: 'host' }, position: { x: 50, y: 150 } },
  { id: 'core', type: 'custom', data: { label: 'Core Router', ip: '10.0.1.1', type: 'router' }, position: { x: 250, y: 150 } },
  { id: 'fw', type: 'custom', data: { label: 'Firewall', ip: '192.168.1.1', type: 'firewall' }, position: { x: 450, y: 150 } },
  { id: 'db', type: 'custom', data: { label: 'Database', ip: '192.168.100.10', type: 'host' }, position: { x: 650, y: 150 }, style: { opacity: 0.5 } }
];

const AFTER_EDGES = [
  { id: 'e1', source: 'src', target: 'core', animated: true, style: { stroke: 'var(--accent-green)', strokeWidth: 2 } },
  { id: 'e2', source: 'core', target: 'fw', animated: true, style: { stroke: 'var(--accent-green)', strokeWidth: 2 } },
  { id: 'e3', source: 'fw', target: 'db', animated: false, label: 'DENY: drop-all-db', labelClassName: 'edge-label denied', style: { stroke: 'var(--accent-red)', strokeWidth: 2, strokeDasharray: '5 5' } }
];

export default function DifferentialAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const handleCompare = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setHasResults(true);
    }, 2000);
  };

  return (
    <div className="main-content" style={{ padding: '2rem', overflowY: 'auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <GitCompare size={32} color="var(--accent-blue)" />
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Differential Analysis</h2>
          <p className="text-secondary">Compare a proposed change against the current network state to identify broken reachability.</p>
        </div>
      </div>

      {/* Setup Area */}
      {!hasResults && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} color="var(--accent-green)" /> Reference Snapshot
              </h3>
              <div className="upload-zone">
                <UploadCloud size={32} className="upload-icon" />
                <p><strong>example_network_current</strong></p>
                <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Snapshot active in production</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRight size={24} color="var(--text-secondary)" />
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#eab308" /> Proposed Snapshot
              </h3>
              <div className="upload-zone" style={{ borderColor: '#eab308' }}>
                <UploadCloud size={32} style={{ color: '#eab308' }} />
                <p><strong>example_network_proposed_v2</strong></p>
                <p className="text-secondary" style={{ fontSize: '0.75rem' }}>Contains new firewall rules</p>
              </div>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" style={{ width: '200px' }} onClick={handleCompare} disabled={analyzing}>
              {analyzing ? 'Analyzing Configurations...' : 'Compare Snapshots'}
            </button>
          </div>
        </div>
      )}

      {/* Results Area */}
      {hasResults && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 150px)' }}>
          <div className="glass-panel" style={{ padding: '1rem', borderLeft: '4px solid var(--accent-red)', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <ShieldAlert size={24} color="var(--accent-red)" style={{ marginTop: '0.25rem' }} />
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Reachability Broken</h3>
                <p className="text-secondary">The proposed change drops traffic from <strong>Web Server (10.0.1.50)</strong> to <strong>Database (192.168.100.10)</strong> on TCP/5432.</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
            
            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--panel-border)', background: 'rgba(16, 185, 129, 0.1)' }}>
                <h4 style={{ color: 'var(--accent-green)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reference State (Allowed)</h4>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <NetworkGraph nodes={BEFORE_NODES} edges={BEFORE_EDGES} />
              </div>
            </div>

            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--panel-border)', background: 'rgba(239, 68, 68, 0.1)' }}>
                <h4 style={{ color: 'var(--accent-red)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proposed State (Denied)</h4>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <NetworkGraph nodes={AFTER_NODES} edges={AFTER_EDGES} />
              </div>
            </div>

          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--panel-border)', color: 'var(--text-secondary)' }} onClick={() => setHasResults(false)}>
              ← Back to Snapshot Selection
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
