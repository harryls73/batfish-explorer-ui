import React, { useState } from 'react';
import MainSidebar from './components/MainSidebar';
import PathTracer from './views/PathTracer';
import DifferentialAnalysis from './views/DifferentialAnalysis';
import TopologyMap from './views/TopologyMap';
import AclHealth from './views/AclHealth';
import Compliance from './views/Compliance';
import BgpHealth from './views/BgpHealth';
import PlaceholderView from './views/PlaceholderView';
import './index.css';

export default function App() {
  const [currentView, setCurrentView] = useState('path-tracer');

  const renderView = () => {
    switch (currentView) {
      case 'path-tracer':
        return <PathTracer />;
      case 'topology':
        return <TopologyMap />;
      case 'differential':
        return <DifferentialAnalysis />;
      case 'acl-health':
        return <AclHealth />;
      case 'compliance':
        return <Compliance />;
      case 'bgp-health':
        return <BgpHealth />;
      default:
        return <PathTracer />;
    }
  };

  return (
    <div className="app-container">
      <MainSidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="view-container">
        {renderView()}
      </div>
    </div>
  );
}
