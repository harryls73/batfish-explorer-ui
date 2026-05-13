import React from 'react';

export default function PlaceholderView({ title, description }) {
  return (
    <div className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ textAlign: 'center', maxWidth: '600px', padding: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{title}</h2>
        <p className="text-secondary" style={{ lineHeight: '1.6' }}>{description}</p>
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed var(--panel-border)', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.2)' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--accent-blue)' }}>Coming Soon - We will connect this to the sample networks data!</p>
        </div>
      </div>
    </div>
  );
}
