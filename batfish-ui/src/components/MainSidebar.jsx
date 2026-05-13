import React from 'react';
import { 
  Network, 
  Map, 
  ShieldAlert, 
  GitCompare, 
  CheckCircle, 
  Activity,
  Settings
} from 'lucide-react';

export default function MainSidebar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'path-tracer', label: 'Path Tracer', icon: Network },
    { id: 'topology', label: 'Topology Map', icon: Map },
    { id: 'differential', label: 'Diff Analysis', icon: GitCompare },
    { id: 'acl-health', label: 'ACL Health', icon: ShieldAlert },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'bgp-health', label: 'BGP Health', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="main-sidebar">
      <div className="logo-container">
        <Network className="logo-icon" size={32} />
      </div>
      <nav className="nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
              title={item.label}
            >
              <Icon size={24} />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
