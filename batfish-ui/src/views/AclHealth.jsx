import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle, XCircle, Search, Shield, ChevronRight } from 'lucide-react';

const MOCK_FIREWALLS = [
  { id: 'as1border1', name: 'AS1BORDER1', issueCount: 2 },
  { id: 'as1border2', name: 'AS1BORDER2', issueCount: 0 },
  { id: 'as2border1', name: 'AS2BORDER1', issueCount: 5 },
  { id: 'as3border1', name: 'AS3BORDER1', issueCount: 1 },
];

const MOCK_ACL_RULES = [
  { id: 1, name: 'allow-ssh', action: 'PERMIT', source: '10.0.0.0/8', dest: 'Any', protocol: 'tcp/22', status: 'Active' },
  { id: 2, name: 'block-bad-ips', action: 'DENY', source: '198.51.100.0/24', dest: 'Any', protocol: 'ip', status: 'Active' },
  { id: 3, name: 'allow-web', action: 'PERMIT', source: 'Any', dest: '192.168.1.10', protocol: 'tcp/80', status: 'Active' },
  { id: 4, name: 'allow-internal-web', action: 'PERMIT', source: '10.0.0.0/8', dest: '192.168.1.10', protocol: 'tcp/80', status: 'Shadowed', shadowedBy: 3 },
  { id: 5, name: 'block-telnet', action: 'DENY', source: 'Any', dest: 'Any', protocol: 'tcp/23', status: 'Active' },
  { id: 6, name: 'allow-old-db', action: 'PERMIT', source: '172.16.0.0/12', dest: '192.168.100.50', protocol: 'tcp/3306', status: 'Unreachable', note: 'Dest IP not in routing table' },
];

export default function AclHealth() {
  const [selectedFw, setSelectedFw] = useState(MOCK_FIREWALLS[0]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14}/> Active</span>;
      case 'Shadowed':
        return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--accent-red)', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><AlertTriangle size={14}/> Shadowed</span>;
      case 'Unreachable':
        return <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><XCircle size={14}/> Unreachable</span>;
      default:
        return null;
    }
  };

  return (
    <div className="main-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <ShieldAlert size={32} color="var(--accent-red)" />
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>ACL Health Analyzer</h2>
          <p className="text-secondary">Detect unreachable policies, dead code, and shadowed rules across your network firewalls.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        
        {/* Firewall List Sidebar */}
        <div className="glass-panel" style={{ width: '280px', padding: '1rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input type="text" placeholder="Search devices..." className="input-field" style={{ paddingLeft: '2.25rem', paddingRight: '1rem', width: '100%' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {MOCK_FIREWALLS.map(fw => (
              <div 
                key={fw.id}
                onClick={() => setSelectedFw(fw)}
                style={{
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  background: selectedFw.id === fw.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  border: `1px solid ${selectedFw.id === fw.id ? 'var(--accent-blue)' : 'var(--panel-border)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={18} color={fw.issueCount > 0 ? "var(--accent-red)" : "var(--text-secondary)"} />
                  <span style={{ fontWeight: 500, color: selectedFw.id === fw.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{fw.name}</span>
                </div>
                {fw.issueCount > 0 && (
                  <span style={{ background: 'var(--accent-red)', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '1rem', fontWeight: 'bold' }}>
                    {fw.issueCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ACL Rules Table */}
        <div className="glass-panel" style={{ flex: 1, padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--panel-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ color: 'var(--text-primary)' }}>{selectedFw.name} Policies</h3>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Analyzing 6 rules. Found {selectedFw.issueCount} issues.</p>
            </div>
            <button className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem' }}>
              Export Report
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(15, 23, 42, 0.6)', position: 'sticky', top: 0, zIndex: 1 }}>
                <tr>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem', borderBottom: '1px solid var(--panel-border)' }}>Seq</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem', borderBottom: '1px solid var(--panel-border)' }}>Rule Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem', borderBottom: '1px solid var(--panel-border)' }}>Action</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem', borderBottom: '1px solid var(--panel-border)' }}>Source</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem', borderBottom: '1px solid var(--panel-border)' }}>Destination</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem', borderBottom: '1px solid var(--panel-border)' }}>Protocol</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.875rem', borderBottom: '1px solid var(--panel-border)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ACL_RULES.map((rule, idx) => (
                  <tr key={rule.id} style={{ 
                    borderBottom: '1px solid var(--panel-border)',
                    background: rule.status !== 'Active' ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                    transition: 'background 0.2s',
                    cursor: 'pointer'
                  }} className="acl-row">
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{rule.id * 10}</td>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{rule.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: rule.action === 'PERMIT' ? 'var(--accent-green)' : 'var(--accent-red)', fontFamily: 'monospace' }}>
                        {rule.action}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{rule.source}</td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{rule.dest}</td>
                    <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{rule.protocol}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {getStatusBadge(rule.status)}
                        {rule.status === 'Shadowed' && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>by Seq {rule.shadowedBy * 10}</span>
                        )}
                        {rule.status !== 'Active' && <ChevronRight size={16} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <style>{`
        .acl-row:hover {
          background: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
    </div>
  );
}
