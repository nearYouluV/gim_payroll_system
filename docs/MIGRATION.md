# Payroll System

Новий проект на **FastAPI** та **React** з **PostgreSQL**.

## Що створено? ✨

- ✅ **Backend**: FastAPI з SQLAlchemy, asyncpg
- ✅ **Frontend**: React 18 з Vite, Zustand, Axios
- ✅ **Database**: PostgreSQL 16
- ✅ **Docker**: Docker Compose для всіх сервісів
- ✅ **Documentation**: API docs, Development guide

## Структура 📁

```
backend/                 # FastAPI
├── app/
│   ├── core/           # Config, Security
│   ├── db/             # Database
│   ├── models/         # SQLAlchemy
│   ├── schemas/        # Pydantic
│   ├── routes/         # API routes
│   └── services/       # Business logic
├── main.py
├── requirements.txt
└── Dockerfile

frontend/               # React + Vite
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/       # API services
│   ├── store/          # Zustand
│   ├── hooks/
│   └── App.jsx
├── package.json
└── Dockerfile

docs/                   # Documentation
├── API.md
└── DEVELOPMENT.md
```

## Запуск 🚀

```bash
# Docker (найпростіше)
docker-compose up --build

# API: http://localhost:8000
# Swagger UI: http://localhost:8000/docs
# Frontend: http://localhost:3000
```

## Документація 📖

- [API Documentation](../docs/API.md)
- [Developer Guide](../docs/DEVELOPMENT.md)
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
