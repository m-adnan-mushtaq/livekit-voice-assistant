from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .core.config_loader import settings
from fastapi.exceptions import RequestValidationError
from app.utils.exception_utils import validation_exception_handler
from app.modules.auth.routes.auth_router import auth_router
from app.modules.bookings.routes.booking_router import booking_router
from app.modules.livekitai.routes.token_router import livekitai_router
from app.modules.notifications.routes.notification_router import notification_router
from app.modules.shift_settings.routes.slot_router import slot_router
from app.modules.user.routes.user_router import public_user_router, user_router

openapi_tags = [
    {"name": "Health Checks", "description": "Application health checks"},
    {"name": "Auth", "description": "Authentication"},
    {"name": "Users", "description": "User management"},
    {"name": "Bookings", "description": "Booking management"},
    {"name": "LiveKit AI", "description": "LiveKit AI management"},
    {"name": "Notifications", "description": "Notification management"},
    {"name": "Shift Settings", "description": "Shift settings management"},
]

app = FastAPI(title="Alexa AI", openapi_tags=openapi_tags)

if settings.BACKEND_CORS_ORIGINS:
    origins = [o.strip()
               for o in settings.BACKEND_CORS_ORIGINS.split(",") if o.strip()]
    if origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_methods=["*"],
            allow_headers=["*"],
        )

app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(auth_router)
app.include_router(public_user_router)
app.include_router(user_router)
app.include_router(booking_router)
app.include_router(livekitai_router)
app.include_router(notification_router)
app.include_router(slot_router)


@app.get("/health", tags=["Health Checks"])
def read_root():
    return {"status": "ok"}
