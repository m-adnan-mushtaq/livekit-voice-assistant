#!/bin/sh
set -e

echo "Starting LiveKit agent..."
python -m agent.main start &

echo "Starting FastAPI server..."
uvicorn app.main:app --host 0.0.0.0 --port 8000