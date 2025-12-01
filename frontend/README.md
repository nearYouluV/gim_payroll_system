# Payroll System - Frontend

React + Vite frontend для Payroll System.

## Структура проекту

```
frontend/
├── src/
│   ├── components/       # React компоненти
│   ├── pages/           # Сторінки (маршрути)
│   ├── services/        # API сервіси
│   ├── hooks/           # Custom React хуки
│   ├── store/           # Zustand стори
│   ├── styles/          # Глобальні стилі
│   ├── App.jsx          # Коренева компонента
│   ├── main.jsx         # Точка входу
│   └── index.css        # Глобальні стилі
├── public/              # Статичні файли
├── package.json
├── vite.config.js
└── Dockerfile
```

## Установка

### Локально

1. Встановіть залежності:
```bash
npm install
```

2. Запустіть dev сервер:
```bash
npm run dev
```

3. Відкрийте http://localhost:5173

### Docker

```bash
docker build -t payroll-frontend .
docker run -p 3000:3000 payroll-frontend
```

## Скрипти

```bash
npm run dev     # Запуск dev сервера
npm run build   # Збірка для production
npm run lint    # Запуск ESLint
npm run preview # Перегляд build версії
```

## Environment

Встановіть в `.env.local`:
```
VITE_API_URL=http://localhost:8000
```

## Структура стану (Zustand)

- `useAuthStore` - Дані авторизації та користувача
- `useEmployeeStore` - Список та керування співробітниками

## Сервіси

- `api.js` - Axios інстанс з авто-авторизацією
- `auth.js` - Сервіс авторизації
- `employees.js` - Сервіс співробітників
