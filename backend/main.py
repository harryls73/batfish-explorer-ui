from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import glob

app = FastAPI()

# Allow CORS for the React UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONFIGS_DIR = r"d:\batfish\sample_networks\example\configs"

@app.get("/api/topology")
def get_topology():
    # Simulate a Batfish parse of the network configurations
    nodes = []
    edges = []
    
    # 1. Read the config files to dynamically create nodes
    config_files = glob.glob(os.path.join(CONFIGS_DIR, "*.cfg"))
    
    for file_path in config_files:
        filename = os.path.basename(file_path)
        hostname = filename.replace('.cfg', '')
        
        # Simple heuristic to determine type for the UI
        node_type = "router"
        if "border" in hostname:
            node_type = "firewall" # Just to show different icons
        
        nodes.append({
            "id": hostname,
            "data": {
                "label": hostname.upper(),
                "type": node_type,
                "ip": "Auto-Parsed"
            }
        })
        
    # 2. Simulate Batfish computing the edges/topology
    # For a real backend, we would use pybatfish: bf.q.layer3Edges().answer().frame()
    # Here we'll just mock some connections based on AS numbers to form a cohesive graph
    
    edges = [
        {"id": "e-as1c1-as1b1", "source": "as1core1", "target": "as1border1"},
        {"id": "e-as1c1-as1b2", "source": "as1core1", "target": "as1border2"},
        {"id": "e-as2c1-as2b1", "source": "as2core1", "target": "as2border1"},
        {"id": "e-as2c2-as2b2", "source": "as2core2", "target": "as2border2"},
        {"id": "e-as2c1-as2d1", "source": "as2core1", "target": "as2dist1"},
        {"id": "e-as2c2-as2d2", "source": "as2core2", "target": "as2dist2"},
        {"id": "e-as2d1-as2dept1", "source": "as2dist1", "target": "as2dept1"},
        {"id": "e-as3c1-as3b1", "source": "as3core1", "target": "as3border1"},
        {"id": "e-as3c1-as3b2", "source": "as3core1", "target": "as3border2"},
        # eBGP connections
        {"id": "e-as1b1-as2b1", "source": "as1border1", "target": "as2border1"},
        {"id": "e-as1b2-as3b2", "source": "as1border2", "target": "as3border2"},
    ]

    return {"nodes": nodes, "edges": edges}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
