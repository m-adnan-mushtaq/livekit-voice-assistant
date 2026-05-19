from dotenv import load_dotenv
import os
from dataclasses import dataclass
load_dotenv()


@dataclass
class Settings:
    PROJECT_NAME: str = "Voice AI"
    PROJECT_VERSION: str = "1.0.0"
    LIVEKIT_API_KEY: str = os.getenv("LIVEKIT_API_KEY")
    LIVEKIT_API_SECRET: str = os.getenv("LIVEKIT_API_SECRET")
    SSL_CERT_FILE: str = os.getenv("SSL_CERT_FILE")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
    DEEPGRAM_API_KEY: str = os.getenv("DEEPGRAM_API_KEY")
    CAL_API_KEY: str = os.getenv("CAL_API_KEY")


settings = Settings()
