import React, { useState } from 'react';
import { MarkerType } from 'reactflow';
import PathTracerSidebar from '../components/PathTracerSidebar';
import NetworkGraph from '../components/NetworkGraph';

const MOCK_NODES = [
  {
    id: 'src-host',
    type: 'custom',
    data: { label: 'Source Server', ip: '10.0.1.50', type: 'host' },
    position: { x: 50, y: 200 },
  },
  {
    id: 'core-router',
    type: 'custom',
    data: { label: 'Core Router', ip: '10.0.1.1', type: 'router' },
    position: { x: 300, y: 200 },
  },
  {
    id: 'edge-firewall',
    type: 'custom',
    data: { label: 'Edge Firewall', ip: '192.168.1.1', type: 'firewall' },
    position: { x: 550, y: 200 },
  },
  {
    id: 'dst-host',
    type: 'custom',
    data: { label: 'Dest Server', ip: '192.168.100.10', type: 'host' },
    position: { x: 800, y: 200 },
  }
];

const MOCK_EDGES = [
  {
    id: 'e1',
    source: 'src-host',
    target: 'core-router',
    animated: true,
    style: { stroke: 'var(--accent-green)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--accent-green)' },
  },
  {
    id: 'e2',
    source: 'core-router',
    target: 'edge-firewall',
    animated: true,
    label: 'Routed via OSPF',
    labelStyle: { fill: 'var(--text-secondary)', fontSize: 12 },
    labelBgStyle: { fill: 'var(--panel-bg)' },
    style: { stroke: 'var(--accent-green)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--accent-green)' },
  },
  {
    id: 'e3',
    source: 'edge-firewall',
    target: 'dst-host',
    animated: true,
    label: 'PERMIT: allow-web-in',
    labelClassName: 'edge-label',
    style: { stroke: 'var(--accent-green)', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--accent-green)' },
  }
];

export default function PathTracer() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    setIsLoading(true);
    setNodes([]);
    setEdges([]);
    
    // Simulate network latency / backend processing
    setTimeout(() => {
      setNodes(MOCK_NODES);
      setEdges(MOCK_EDGES);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <PathTracerSidebar onAnalyze={handleAnalyze} isLoading={isLoading} />
      <div className="main-content">
        <NetworkGraph nodes={nodes} edges={edges} />
      </div>
    </>
  );
}
