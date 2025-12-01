# Developer Guide

Керівництво для розробників Payroll System.

## Встановлення окремення

### Backend Setup

```bash
cd backend

# 1. Віртуальне середовище
python3.11 -m venv venv
source venv/bin/activate

# 2. Залежності
pip install -r requirements.txt

# 3. .env файл
cp .env.example .env

# 4. Запуск
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

# 1. Залежності
npm install

# 2. Dev сервер
npm run dev

# 3. Перейдіть на http://localhost:5173
```

## Додавання нових можливостей

### Backend - Новий API endpoint

Приклад: Додаємо ендпоїнт для управління зарплатою

1. **Модель** (`backend/app/models/salary.py`):
```python
class Salary(Base):
    __tablename__ = "salaries"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"))
    amount: Mapped[float] = mapped_column(Numeric(10, 2))
    effective_date: Mapped[datetime]
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
```

2. **Схема** (`backend/app/schemas/salary.py`):
```python
from pydantic import BaseModel

class SalaryBase(BaseModel):
    employee_id: int
    amount: float

class SalaryCreate(SalaryBase):
    effective_date: datetime

class SalaryResponse(SalaryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True
```

3. **Сервіс** (`backend/app/services/salary_service.py`):
```python
class SalaryService:
    @staticmethod
    async def create_salary(db: AsyncSession, salary: SalaryCreate) -> Salary:
        db_salary = Salary(**salary.dict())
        db.add(db_salary)
        await db.commit()
        await db.refresh(db_salary)
        return db_salary
```

4. **Маршрут** (`backend/app/routes/salaries.py`):
```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/salaries", tags=["salaries"])

@router.post("/", response_model=SalaryResponse)
async def create_salary(
    salary: SalaryCreate,
    db: AsyncSession = Depends(get_db)
):
    return await SalaryService.create_salary(db, salary)
```

5. **Додайте маршрут в `main.py`**:
```python
from app.routes import salaries

app.include_router(salaries.router)
```

### Frontend - Нова сторінка

1. **Сервіс** (`frontend/src/services/salaries.js`):
```javascript
import api from './api'

export const salaryService = {
  create: (data) => api.post('/salaries', data),
  getById: (id) => api.get(`/salaries/${id}`),
  getAll: () => api.get('/salaries'),
}
```

2. **Сторінка** (`frontend/src/pages/SalariesPage.jsx`):
```jsx
import { useState } from 'react'
import { salaryService } from '../services/salaries'

export default function SalariesPage() {
  const [salaries, setSalaries] = useState([])

  const handleCreate = async (data) => {
    const response = await salaryService.create(data)
    setSalaries([...salaries, response.data])
  }

  return <div>{/* UI */}</div>
}
```

3. **Маршрут** (`frontend/src/App.jsx`):
```jsx
<Route path="/salaries" element={<SalariesPage />} />
```

## Тестування

### Backend

```bash
cd backend

# Запуск тестів
pytest

# З покриттям
pytest --cov=app

# Конкретний тест
pytest tests/test_auth.py -v
```

### Frontend

```bash
cd frontend

# Linting
npm run lint

# Тести (якщо встановлені)
npm test
```

## Стандарти коду

### Backend (Python)

- Слідуйте PEP 8
- Використовуйте type hints
- Письміть docstrings

```python
async def create_user(db: AsyncSession, user: UserCreate) -> User:
    """Create new user in database.
    
    Args:
        db: Database session
        user: User creation schema
        
    Returns:
        Created user instance
    """
```

### Frontend (JavaScript)

- Слідуйте ESLint правилам
- Використовуйте PropTypes або TypeScript
- Компоненти мають бути чистими та перевикористовуваними

## Debugging

### Backend

1. Додайте точки зупину в PyCharm/VS Code
2. Запустіть з `--reload`
3. Фіддлете обирайте: API docs на `/docs`

### Frontend

1. Используйте React Developer Tools
2. `console.log()` для дебага
3. Network tab в браузері для перевірки запитів

## Миграції БД

```bash
cd backend

# Створіть нову міграцію
alembic revision --autogenerate -m "Description"

# Примініть міграцію
alembic upgrade head

# Відкатьте останню міграцію
alembic downgrade -1
```

## Розгортання

### Production Build

```bash
# Backend
docker build -t payroll-backend:latest backend/
docker push your-registry/payroll-backend:latest

# Frontend
npm run build
# Розгорніть dist/ на CDN або веб-сервер
```

### Docker Compose Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```
