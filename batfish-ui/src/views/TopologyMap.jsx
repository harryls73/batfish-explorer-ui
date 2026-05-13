import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, MarkerType, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { Layers, Server, Network, Shield, Search } from 'lucide-react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));



const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 180, height: 80 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = direction === 'TB' ? 'top' : 'left';
    node.sourcePosition = direction === 'TB' ? 'bottom' : 'right';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - 180 / 2,
      y: nodeWithPosition.y - 80 / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const CustomNode = ({ data }) => {
  const getIcon = () => {
    if (data.type === 'router') return <Network size={20} />;
    if (data.type === 'firewall') return <Shield size={20} color="#fca5a5" />;
    return <Server size={20} />;
  };

  return (
    <div className={`custom-node ${data.type === 'firewall' ? 'firewall' : ''}`} style={{ width: '180px', height: '80px', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
        {getIcon()}
        <span className="node-label" style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{data.label}</span>
      </div>
      <span className="node-ip">{data.ip}</span>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function TopologyMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeLayer, setActiveLayer] = useState('L3');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/topology');
        const data = await response.json();
        
        // Add types and styles
        const styledNodes = data.nodes.map(n => ({...n, type: 'custom'}));
        const styledEdges = data.edges.map(e => ({
          ...e,
          type: 'smoothstep',
          style: { stroke: 'var(--text-secondary)', strokeWidth: 1.5, opacity: 0.6 },
          animated: activeLayer === 'L3', // Visual effect based on layer
        }));
        
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
          styledNodes,
          styledEdges,
          'TB'
        );

        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
      } catch (error) {
        console.error("Failed to fetch topology from backend:", error);
      }
    };
    
    fetchData();
  }, [activeLayer, setNodes, setEdges]);

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '1rem', overflow: 'hidden' }}>
      
      {/* Top Toolbar */}
      <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Layers size={24} color="var(--accent-blue)" />
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Topology Map</h2>
        </div>

        {/* Layer Toggles */}
        <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid var(--panel-border)' }}>
          {['L1', 'L2', 'L3'].map((layer) => (
            <button 
              key={layer}
              onClick={() => setActiveLayer(layer)}
              style={{
                padding: '0.5rem 1.5rem',
                border: 'none',
                background: activeLayer === layer ? 'var(--accent-blue)' : 'transparent',
                color: activeLayer === layer ? '#fff' : 'var(--text-secondary)',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              {layer}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search nodes..." 
            className="input-field" 
            style={{ paddingLeft: '2.5rem', width: '250px' }}
          />
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="glass-panel" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="rgba(255, 255, 255, 0.05)" gap={16} />
          <Controls style={{ background: 'var(--panel-bg)', borderColor: 'var(--panel-border)', fill: 'var(--text-primary)' }} />
        </ReactFlow>
      </div>

    </div>
  );
}
