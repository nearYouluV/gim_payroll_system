# Payroll System - Backend

FastAPI backend for Payroll System з PostgreSQL та AsyncPG.

## Структура проекту

```
backend/
├── app/
│   ├── core/              # Конфігурація, безпека
│   ├── db/                # Бази даних, сесії
│   ├── models/            # SQLAlchemy моделі
│   ├── schemas/           # Pydantic схеми
│   ├── routes/            # API маршрути
│   ├── services/          # Бізнес-логіка
│   └── __init__.py
├── migrations/            # Alembic міграції
├── main.py               # Точка входу
├── requirements.txt      # Залежності
└── Dockerfile            # Docker образ
```

## Установка

### Локально

1. Створіть віртуальне середовище:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

2. Встановіть залежності:
```bash
pip install -r requirements.txt
```

3. Установіть змінні середовища (.env):
```bash
cp .env.example .env
```

4. Запустіть сервер:
```bash
uvicorn main:app --reload
```

### Docker

```bash
docker build -t payroll-backend .
docker run -p 8000:8000 --env-file .env payroll-backend
```

## API Endpoints

### Auth
- `POST /auth/register` - Реєстрація користувача
- `POST /auth/login` - Вхід користувача

### Employees
- `GET /employees` - Список всіх співробітників
- `GET /employees/{id}` - Деталі співробітника
- `POST /employees` - Створення нового співробітника
- `PUT /employees/{id}` - Оновлення співробітника
- `DELETE /employees/{id}` - Видалення співробітника

### Health
- `GET /health` - Перевірка здоров'я API
- `GET /` - Корінь API

## Документація

Запустіть сервер і откройте:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Тестування

```bash
pytest
pytest --cov=app tests/
```
