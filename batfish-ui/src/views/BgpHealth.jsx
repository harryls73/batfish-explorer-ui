import React, { useState } from 'react';
import { Activity, CheckCircle, XCircle, Search, Server, ArrowRight, Zap, RefreshCw } from 'lucide-react';

const MOCK_BGP_SESSIONS = [
  { id: 1, node: 'as1border1', vrf: 'default', localIp: '10.12.11.1', remoteAs: '2', remoteIp: '10.12.11.2', status: 'ESTABLISHED' },
  { id: 2, node: 'as1border2', vrf: 'default', localIp: '10.13.22.1', remoteAs: '3', remoteIp: '10.13.22.3', status: 'ESTABLISHED' },
  { id: 3, node: 'as2border1', vrf: 'default', localIp: '10.12.11.2', remoteAs: '1', remoteIp: '10.12.11.1', status: 'ESTABLISHED' },
  { id: 4, node: 'as2border2', vrf: 'default', localIp: '10.23.21.2', remoteAs: '3', remoteIp: '10.23.21.3', status: 'NOT_ESTABLISHED', reason: 'Remote AS mismatch (Expected 4, Found 3)' },
  { id: 5, node: 'as3border1', vrf: 'default', localIp: '10.14.22.3', remoteAs: '1', remoteIp: '10.14.22.1', status: 'NOT_ESTABLISHED', reason: 'No route to peer' },
  { id: 6, node: 'as3border2', vrf: 'default', localIp: '10.23.21.3', remoteAs: '2', remoteIp: '10.23.21.2', status: 'ESTABLISHED' },
];

export default function BgpHealth() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSessions = MOCK_BGP_SESSIONS.filter(s => 
    s.node.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.remoteIp.includes(searchTerm)
  );

  const totalSessions = MOCK_BGP_SESSIONS.length;
  const establishedCount = MOCK_BGP_SESSIONS.filter(s => s.status === 'ESTABLISHED').length;
  const failedCount = totalSessions - establishedCount;

  return (
    <div className="main-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Activity size={32} color="var(--accent-blue)" />
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>BGP Session Health</h2>
            <p className="text-secondary">Predict and analyze BGP peering states directly from configuration files.</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle size={20} color="var(--accent-green)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Established</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{establishedCount}</div>
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <XCircle size={20} color="var(--accent-red)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Failed</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{failedCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        
        {/* Toolbar */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search by Node or IP..." 
              className="input-field" 
              style={{ paddingLeft: '2.5rem', width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}>
            <RefreshCw size={16} /> Re-Analyze Sessions
          </button>
        </div>

        {/* Sessions Grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredSessions.map((session) => (
            <div key={session.id} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '0.5rem', 
              border: '1px solid var(--panel-border)',
              background: session.status === 'ESTABLISHED' ? 'rgba(16, 185, 129, 0.02)' : 'rgba(239, 68, 68, 0.05)',
              overflow: 'hidden'
            }}>
              
              <div style={{ display: 'flex', alignItems: 'center', padding: '1.25rem' }}>
                {/* Left Side: Local Node */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.75rem', background: 'var(--panel-bg)', borderRadius: '0.5rem', border: '1px solid var(--panel-border)' }}>
                    <Server size={24} color="var(--accent-blue)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--text-primary)' }}>{session.node}</h4>
                    <p className="text-secondary" style={{ margin: '0.25rem 0 0 0', fontFamily: 'monospace', fontSize: '0.875rem' }}>{session.localIp} (VRF: {session.vrf})</p>
                  </div>
                </div>

                {/* Middle: Connection Status */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  {session.status === 'ESTABLISHED' ? (
                    <>
                      <div style={{ height: '2px', width: '100px', background: 'var(--accent-green)', position: 'relative', marginBottom: '0.5rem' }}>
                        <div style={{ position: 'absolute', right: '-5px', top: '-4px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-green)', borderRight: '2px solid var(--accent-green)', transform: 'rotate(45deg)' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>ESTABLISHED</span>
                    </>
                  ) : (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ height: '2px', width: '40px', background: 'var(--accent-red)', borderStyle: 'dashed' }} />
                        <XCircle size={20} color="var(--accent-red)" />
                        <div style={{ height: '2px', width: '40px', background: 'var(--accent-red)', borderStyle: 'dashed' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>FAILED</span>
                    </>
                  )}
                </div>

                {/* Right Side: Remote Peer */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end' }}>
                  <div style={{ textAlign: 'right' }}>
                    <h4 style={{ fontSize: '1.125rem', margin: 0, color: 'var(--text-primary)' }}>AS {session.remoteAs} Peer</h4>
                    <p className="text-secondary" style={{ margin: '0.25rem 0 0 0', fontFamily: 'monospace', fontSize: '0.875rem' }}>{session.remoteIp}</p>
                  </div>
                  <div style={{ padding: '0.75rem', background: 'var(--panel-bg)', borderRadius: '0.5rem', border: '1px solid var(--panel-border)' }}>
                    <Zap size={24} color="#eab308" />
                  </div>
                </div>
              </div>

              {/* Error Reason Banner (if failed) */}
              {session.status === 'NOT_ESTABLISHED' && (
                <div style={{ width: '100%', background: 'rgba(239, 68, 68, 0.1)', borderTop: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                  <XCircle size={16} color="var(--accent-red)" />
                  <strong style={{ color: 'var(--accent-red)' }}>Root Cause:</strong> {session.reason}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
