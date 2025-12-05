"""Application configuration"""

import os
from pathlib import Path
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator


class Settings(BaseSettings):
    """Application settings"""
    
    model_config = SettingsConfigDict(
        case_sensitive=True,
    )

    # API
    API_TITLE: str = "Payroll System API"
    API_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Database
    DATABASE_URL: str

    # JWT
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS - Store as string, parse in validator
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:5173"

    def __init__(self, **data):
        # Load .env from root directory if it exists
        env_file = None
        for env_path in [Path("/app/.env"), Path(".env"), Path("../../.env")]:
            if env_path.exists():
                env_file = str(env_path)
                break
        
        if env_file:
            from dotenv import load_dotenv
            load_dotenv(env_file)
        
        super().__init__(**data)
    
    @property
    def allowed_origins_list(self) -> List[str]:
        """Get ALLOWED_ORIGINS as a list"""
        if isinstance(self.ALLOWED_ORIGINS, str):
            return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
        return self.ALLOWED_ORIGINS


settings = Settings()
