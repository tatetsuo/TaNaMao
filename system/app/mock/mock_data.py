from ..models import Role, User
from ..database import SessionLocal
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DEFAULT_ROLES = [
    {
        "name": "admin",
        "description": "Administrator with full access"
    },
    {
        "name": "user",
        "description": "Regular user with limited access"
    },
    {
        "name": "manager",
        "description": "Manager with moderate access"
    }
]

DEFAULT_USERS = [
    {
        "firstname": "Admin",
        "lastname": "User",
        "email": "admin@tanamao.com",
        "phone": "1234-5678",
        "cpf": "000.000.000-00",
        "password": "admin123",
        "role_id": 1
    }
]

def init_mock_data():
    db = SessionLocal()
    try:
        # Initialize roles if they don't exist
        if not db.query(Role).first():
            for role_data in DEFAULT_ROLES:
                role = Role(**role_data)
                db.add(role)
            db.commit()
            
        # Initialize users if they don't exist
        if not db.query(User).first():
            for user_data in DEFAULT_USERS:
                # Hash password before creating user
                user_data["password"] = pwd_context.hash(user_data["password"])
                user = User(**user_data)
                db.add(user)
            db.commit()
            
    except Exception as e:
        print(f"Error initializing mock data: {e}")
        db.rollback()
    finally:
        db.close()
        
    
