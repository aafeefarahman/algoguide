import os
import time
import logging
from collections import defaultdict
from dotenv import load_dotenv

# Ensure load_dotenv() runs BEFORE any module imports read GEMINI_API_KEY
load_dotenv()

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

from recommender import recommend_algorithm
from github_lookup import CATEGORY_GITHUB_LINKS

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("algoguide.api")

app = FastAPI(
    title="AlgoGuide API",
    description="Hybrid Google Gemini + DAA Rule-Based Recommender Engine for AlgoGuide",
    version="2.0.0"
)

@app.on_event("startup")
async def startup_event():
    gemini_key = os.getenv("GEMINI_API_KEY")
    if not gemini_key:
        logger.error("=" * 60)
        logger.error("CRITICAL PRODUCTION WARNING: GEMINI_API_KEY is NOT set in the environment!")
        logger.error("Recommender API calls will fail until GEMINI_API_KEY is configured.")
        logger.error("=" * 60)
    else:
        logger.info("=" * 60)
        logger.info(f"SERVER STARTUP | GEMINI_API_KEY is detected (length: {len(gemini_key)}, starts with: '{gemini_key[:4]}...').")
        logger.info("=" * 60)


# CORS configuration supporting localhost and deployed production origins
custom_origins = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins_list = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

if custom_origins:
    for o in custom_origins.split(","):
        cleaned = o.strip()
        if cleaned and cleaned not in allowed_origins_list:
            allowed_origins_list.append(cleaned)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if not custom_origins else allowed_origins_list,
    allow_origin_regex=r"https?://.*" if not custom_origins else None,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple sliding window rate limiter: 10 requests / minute per client IP
RATE_LIMIT_MAX_REQUESTS = 10
RATE_LIMIT_WINDOW_SECONDS = 60
client_request_timestamps = defaultdict(list)

def enforce_rate_limit(client_ip: str):
    now = time.time()
    cutoff = now - RATE_LIMIT_WINDOW_SECONDS
    # Clean old timestamps
    timestamps = [t for t in client_request_timestamps[client_ip] if t > cutoff]
    
    if len(timestamps) >= RATE_LIMIT_MAX_REQUESTS:
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Maximum 10 algorithm recommendation requests per minute."
        )
    
    timestamps.append(now)
    client_request_timestamps[client_ip] = timestamps


class RecommendRequest(BaseModel):
    description: str = Field(..., min_length=5, max_length=500, description="Problem statement prompt text")
    problem_type: Optional[str] = Field(default="", alias="category", description="Optional DAA syllabus category filter")
    language: Optional[str] = Field(default="python", description="Target programming language")

    class Config:
        populate_by_name = True


@app.get("/api/health")
def health_check():
    api_key_present = bool(os.getenv("GEMINI_API_KEY"))
    return {
        "status": "ok",
        "service": "AlgoGuide Hybrid Recommender API",
        "gemini_configured": api_key_present
    }



@app.post("/api/recommend")
async def get_recommendation(payload: RecommendRequest, request: Request):
    # Enforce 10 req/min rate limit per client IP
    client_ip = request.client.host if request.client else "127.0.0.1"
    enforce_rate_limit(client_ip)

    try:
        res = await recommend_algorithm(
            description=payload.description,
            problem_type=payload.problem_type or "",
            language=payload.language or "python"
        )
        return res
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing recommendation request: {type(e).__name__}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal recommender error: {str(e)}")


@app.get("/api/categories")
def get_categories():
    return {
        "categories": list(CATEGORY_GITHUB_LINKS.keys()),
        "links": CATEGORY_GITHUB_LINKS
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
