# from pydantic_settings import BaseSettings, SettingsConfigDict

# class Settings(BaseSettings):
#     DEBUG: bool = True
#     DATABASE_URL: str = "sqlite:///./system/data/tanamao.db"
    
#     model_config = SettingsConfigDict(env_file=".env")

# settings = Settings()

# if __name__ == "__main__":
#     print(f"Debug mode: {settings.DEBUG}")
#     print(f"Database URL: {settings.DATABASE_URL}")