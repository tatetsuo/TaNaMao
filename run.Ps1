$env:ENV="development"
$env:DATABASE_URL="sqlite:///./system/data/tanamao.db"
python -m uvicorn system.app.main:app --reload