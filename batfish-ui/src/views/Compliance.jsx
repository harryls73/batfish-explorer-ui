import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, ShieldCheck, Server, AlertCircle, ChevronDown, ChevronRight, XCircle } from 'lucide-react';

const MOCK_RULES = [
  { 
    id: 'rule-ntp', 
    name: 'Standard NTP Servers Configured', 
    description: 'All core and edge routers must be configured with internal NTP servers 10.0.0.5 and 10.0.0.6.',
    category: 'Infrastructure',
    passed: 42,
    failed: 2,
    severity: 'Medium',
    failures: ['as2dept1 (Missing 10.0.0.6)', 'as3border2 (No NTP configured)']
  },
  { 
    id: 'rule-plaintext', 
    name: 'No Plaintext Passwords', 
    description: 'Ensure no type 7 or plaintext passwords exist in the configuration.',
    category: 'Security',
    passed: 44,
    failed: 0,
    severity: 'Critical',
    failures: []
  },
  { 
    id: 'rule-snmp', 
    name: 'SNMPv3 Required', 
    description: 'SNMPv2c communities should be removed; only SNMPv3 is permitted.',
    category: 'Security',
    passed: 38,
    failed: 6,
    severity: 'High',
    failures: ['as1core1', 'as1border1', 'as1border2', 'as2core1', 'as2core2', 'as2border1']
  },
  { 
    id: 'rule-syslog', 
    name: 'Centralized Syslog Logging', 
    description: 'Logging trap warnings must be sent to the centralized SIEM at 10.0.0.100.',
    category: 'Monitoring',
    passed: 43,
    failed: 1,
    severity: 'High',
    failures: ['as3core1 (Logging disabled)']
  }
];

export default function Compliance() {
  const [expandedRule, setExpandedRule] = useState(null);

  const totalChecks = MOCK_RULES.reduce((acc, rule) => acc + rule.passed + rule.failed, 0);
  const passedChecks = MOCK_RULES.reduce((acc, rule) => acc + rule.passed, 0);
  const complianceScore = Math.round((passedChecks / totalChecks) * 100);

  const toggleRule = (id) => {
    if (expandedRule === id) {
      setExpandedRule(null);
    } else {
      setExpandedRule(id);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'var(--accent-red)';
      case 'High': return '#f97316'; // orange
      case 'Medium': return '#eab308'; // yellow
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="main-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <ShieldCheck size={32} color="var(--accent-green)" />
        <div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Compliance Dashboard</h2>
          <p className="text-secondary">Audit your network configurations against internal policies and security standards.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: 0 }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"/>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeDasharray={`${complianceScore}, 100`} />
            </svg>
            <span style={{ position: 'absolute', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>{complianceScore}%</span>
          </div>
          <div>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Overall Compliance</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Good</p>
          </div>
        </div>

        <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 0 }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.5rem' }}>
            <CheckCircle size={32} color="var(--accent-green)" />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Checks Passed</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{passedChecks}</p>
          </div>
        </div>

        <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 0 }}>
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem' }}>
            <AlertCircle size={32} color="var(--accent-red)" />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Checks Failed</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{totalChecks - passedChecks}</p>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Policy Evaluation Results</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingBottom: '2rem' }}>
        {MOCK_RULES.map(rule => (
          <div key={rule.id} className="glass-panel" style={{ marginBottom: 0, padding: 0, overflow: 'hidden' }}>
            
            <div 
              onClick={() => toggleRule(rule.id)}
              style={{ 
                padding: '1.25rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: expandedRule === rule.id ? 'rgba(255,255,255,0.02)' : 'transparent',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {rule.failed === 0 ? (
                  <CheckCircle size={24} color="var(--accent-green)" />
                ) : (
                  <XCircle size={24} color="var(--accent-red)" />
                )}
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {rule.name}
                    <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '1rem', border: `1px solid ${getSeverityColor(rule.severity)}`, color: getSeverityColor(rule.severity) }}>
                      {rule.severity}
                    </span>
                  </h4>
                  <p className="text-secondary" style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>{rule.category} • {rule.failed === 0 ? 'All devices compliant' : `${rule.failed} devices failed`}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Passed</div>
                    <div style={{ color: 'var(--accent-green)', fontWeight: 600 }}>{rule.passed}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Failed</div>
                    <div style={{ color: rule.failed > 0 ? 'var(--accent-red)' : 'var(--text-secondary)', fontWeight: 600 }}>{rule.failed}</div>
                  </div>
                </div>
                {expandedRule === rule.id ? <ChevronDown color="var(--text-secondary)" /> : <ChevronRight color="var(--text-secondary)" />}
              </div>
            </div>

            {expandedRule === rule.id && (
              <div style={{ padding: '1.25rem', borderTop: '1px solid var(--panel-border)', background: 'rgba(0,0,0,0.2)' }}>
                <p style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '0.9rem' }}>{rule.description}</p>
                
                {rule.failures.length > 0 ? (
                  <div>
                    <h5 style={{ color: 'var(--accent-red)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Failed Devices:</h5>
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.5rem' }}>
                      {rule.failures.map((failure, idx) => (
                        <li key={idx} style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', borderLeft: '2px solid var(--accent-red)', fontSize: '0.875rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Server size={14} color="var(--accent-red)" />
                          {failure}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0.5rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={18} />
                    All evaluated devices passed this policy check.
                  </div>
                )}
              </div>
            )}
            
          </div>
        ))}
      </div>

    </div>
  );
}
