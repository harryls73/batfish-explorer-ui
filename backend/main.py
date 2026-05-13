from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os
import glob

# Set the path to the compiled React build folder
DIST_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "batfish-ui", "dist"))

app = Flask(__name__, static_folder=DIST_DIR, static_url_path="/")
CORS(app)

CONFIGS_DIR = r"d:\batfish\sample_networks\example\configs"

# Serve the React application
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

@app.route("/api/topology", methods=["GET"])
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

    return jsonify({"nodes": nodes, "edges": edges})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
