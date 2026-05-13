# Batfish Explorer UI 🚀

A modern, premium web interface for [Batfish](https://www.batfish.org/), the open-source network configuration analysis tool. 

This prototype provides an intuitive, glassmorphism-styled dashboard to interact with Batfish's most powerful capabilities, translating raw JSON analysis into stunning visual graphs, diffs, and health metrics.

---

## 🏗️ Architecture

The project is split into two lightweight services:
1. **Frontend (`batfish-ui`)**: A React 19 application built with Vite, utilizing `reactflow` for interactive network topology graphs, `dagre` for anti-hairball hierarchical layouts, and `lucide-react` for iconography.
2. **Backend (`backend`)**: A Python Flask server that parses network configurations (or talks to `pybatfish`) and serves JSON topology data to the frontend.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
*   **Node.js** (v18+ recommended) & npm
*   **Python** (3.8+)
*   *(Optional)* Java 11+ or Docker (if you want to run the actual Batfish engine in the future)

---

## 🚀 Setup & Execution

You will need two terminal windows open to run the application locally.

### 1. Start the Python Backend
The backend serves the dynamic topology data parsed from the `sample_networks`.

Open your first terminal and run:
```bash
# Navigate to the backend directory
cd d:\batfish\backend

# Install the required Python packages
pip install flask flask-cors

# Start the Flask server
python main.py
```
*The backend should now be running on `http://localhost:8000`.*

### 2. Start the React Frontend
The frontend contains all the interactive dashboards and graphing logic.

Open your second terminal and run:
```bash
# Navigate to the frontend directory
cd d:\batfish\batfish-ui

# Install the Node dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend should now be running on `http://localhost:5173`. Open this link in your browser!*

---

## 🌟 Features Overview

Once the application is running, use the slim dark sidebar on the left to navigate between the 6 core modules:

1.  **Path Tracer** (`/path-tracer`): Interactive node-by-node visualizations of packet reachability.
2.  **Topology Map** (`/topology`): A full-network `dagre` hierarchical graph. This view fetches live data from the Python backend!
3.  **Differential Analysis** (`/differential`): A split-screen UI to compare a "Reference" snapshot against a "Proposed" change to catch broken reachability before pushing to production.
4.  **ACL Health Analyzer** (`/acl-health`): A sleek data table that flags "Shadowed" (Red) and "Unreachable" (Yellow) firewall rules.
5.  **Compliance Dashboard** (`/compliance`): Executive-level metrics and drill-down lists validating configurations against standards (NTP, Syslog, SNMP).
6.  **BGP Health Dashboard** (`/bgp-health`): Session status cards that explicitly highlight the Root Cause of peering failures (e.g., mismatched ASNs).

---

## 📁 Directory Structure

```text
d:\batfish\
├── backend/                  # Python API server
│   └── main.py               # FastAPI entrypoint (reads configs)
├── batfish-ui/               # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components (Sidebar, Graph)
│   │   ├── views/            # The 6 core feature dashboards
│   │   ├── App.jsx           # Main routing & layout
│   │   └── index.css         # Global styles & Glassmorphism theme
│   ├── package.json
│   └── vite.config.js
└── sample_networks/          # Official Batfish example configs
```
