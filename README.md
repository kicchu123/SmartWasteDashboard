# Smart Waste Management Dashboard — Full Project (IoT + React + Node + MongoDB + Simulator)

## What is inside
- `backend/` — Node.js + Express API + Socket.IO, MongoDB model and routes.
- `frontend/` — React (Vite) + Tailwind dashboard connecting to the backend via REST and Socket.IO.
- `iot-simulator/` — Node script to simulate IoT bins sending telemetry.

## Quickstart (Local, manual — ideal for college demo)

### 1) Prerequisites
- Node.js (v16+), npm
- MongoDB (local) — or change `backend/.env.example` to point to MongoDB Atlas.

### 2) Start backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env if you use Atlas or different port
npm run dev
```

Backend listens on port 4000 by default.

### 3) Start frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4) Start IoT simulator (separate terminal)
```bash
cd iot-simulator
npm install
node simulator.js --count 6 --interval 3000
```

The simulator will POST telemetry to the backend and you will see live updates on the dashboard.

## Notes for the demo
- For presentation, show the `simulator.js` terminal sending data and the dashboard updating in real-time.
- Optionally show MongoDB documents with `mongo` shell or MongoDB Compass.

## Screenshots
A sample dashboard preview SVG is included as `assets/sample_screenshot.svg` for use in slides.
