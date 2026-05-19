from app.routes.voice_ai_routes import router as voice_ai_router
from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

_ = load_dotenv(override=True)


app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/health')
async def health():
    return {'status': 'ok'}

app.include_router(voice_ai_router, prefix='/voice-ai', tags=['voice-ai'])
