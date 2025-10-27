# # app/database.py

# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from .config import settings
# import os

# if settings.DATABASE_URL.startswith("sqlite"):
#     DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
#     os.makedirs(DB_DIR, exist_ok=True)

# engine = create_engine(
#     settings.DATABASE_URL,
#     connect_args={"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}
# )

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()