import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Server, ShieldAlert, Router } from 'lucide-react';

// Custom node components
const CustomNode = ({ data }) => {
  const isFirewall = data.type === 'firewall';
  const Icon = isFirewall ? ShieldAlert : (data.type === 'host' ? Server : Router);
  
  return (
    <div className={`custom-node ${isFirewall ? 'firewall' : ''}`}>
      <Icon className="node-icon" />
      <div className="node-label">{data.label}</div>
      <div className="node-ip">{data.ip}</div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export default function NetworkGraph({ nodes: initialNodes, edges: initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update state when props change
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {nodes.length === 0 ? (
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Router size={48} style={{ opacity: 0.5 }} />
          <p>Enter query parameters and click Analyze Path to visualize.</p>
        </div>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          minZoom={0.2}
          maxZoom={4}
        >
          <Background color="#334155" gap={16} />
          <Controls style={{ button: { backgroundColor: 'var(--panel-bg)', fill: 'white', borderBottom: '1px solid var(--panel-border)' } }} />
        </ReactFlow>
      )}
    </div>
  );
}
