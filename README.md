# Serene Flow Yoga AI Assistant

A realtime AI voice assistant for a yoga studio.  
Users can talk with Alexa, ask yoga workshop FAQs, check available Cal.com slots, and book a 30-minute online yoga session.

## Project Structure

```bash
.
├── client/   # React + LiveKit frontend
└── server/   # FastAPI token server + LiveKit agent
```

## Requirements

- Python 3.11+
- Node.js 18+
- pnpm
- LiveKit Cloud account
- OpenAI API key
- Deepgram API key
- Cal.com API key

## Environment Variables

Create `.env` files from the examples:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

## Server `.env.example`

```env
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret

OPENAI_API_KEY=your_openai_api_key
DEEPGRAM_API_KEY=your_deepgram_api_key

CAL_API_KEY=your_cal_api_key
CAL_EVENT_TYPE_ID=your_cal_event_type_id
```

## Client `.env.example`

```env
VITE_LIVEKIT_URL=wss://your-project.livekit.cloud
VITE_TOKEN_SERVER_URL=http://localhost:8001
```

## Run Server

From the `server` folder:

```bash
cd server
pip install -r requirements.txt
```

Run the LiveKit agent:

```bash
python -m agent.main dev
```

Run the FastAPI token server:

```bash
python app.main
```

Or with uvicorn:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

## Run Client

From the `client` folder:

```bash
cd client
pnpm install
pnpm dev
```

Open:

```bash
http://localhost:5173
```

## Main Features

- Realtime voice call with Alexa
- LiveKit audio room
- AI yoga workshop FAQ assistant
- Cal.com available slot lookup
- Booking by name and email
- Realtime transcript UI
- Dark Tailwind landing page

## Notes

If you get SSL certificate issues on macOS, install `certifi` and set:

```bash
export SSL_CERT_FILE=$(python -m certifi)
```

## Docker Deployment Guide

```bash
cp .env.example .env
docker compose up --build -d
```
