from unittest.mock import Base
from sqlalchemy import Boolean, Column, Integer, String, Enum, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

class UserType(str, enum.Enum):
    CLIENT = "CLIENTE"
    COLLABORATOR = "COLABORADOR"
    BOTH = "AMBOS"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    cpf = Column(String, unique=True, nullable=False)
    birth_date = Column(DateTime)
    user_type = Column(Enum(UserType), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    wallet = relationship("Wallet", back_populates="user", uselist=False)
    services = relationship("Service", back_populates="collaborator")

class Wallet(Base):
    __tablename__ = "wallets"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    balance = Column(Float, default=0.0)
    transaction_limit = Column(Float)
    preferred_method = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="wallet")

class Service(Base):
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    collaborator_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    description = Column(String)
    base_price = Column(Float, nullable=False)
    category_id = Column(Integer, ForeignKey("service_categories.id"))
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    collaborator = relationship("User", back_populates="services")
    category = relationship("ServiceCategory")
    