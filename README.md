# Payroll System

Сучасна система управління заробітною платою з FastAPI бекенду та React фронтенду.

## 🚀 Стек технологій

### Backend
- **FastAPI** - Асинхронний веб-фреймворк
- **SQLAlchemy 2.0** - ORM
- **PostgreSQL** - База даних
- **AsyncPG** - Асинхронний драйвер PostgreSQL
- **Pydantic** - Валідація даних
- **JWT** - Авторизація

### Frontend
- **React 18** - UI бібліотека
- **Vite** - Сборщик
- **React Router** - Маршрутизація
- **Zustand** - State management
- **Axios** - HTTP клієнт

### DevOps
- **Docker** - Контейнеризація
- **Docker Compose** - Оркестрація контейнерів

## 📋 Архітектура

```
┌─────────────────┐
│  React Frontend │
│   :3000         │
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│  FastAPI Backend│
│   :8000         │
└────────┬────────┘
         │
         │ asyncpg
         │
┌────────▼────────┐
│   PostgreSQL    │
│   :5432         │
└─────────────────┘
```

## ⚡ Швидкий старт

### З Docker Compose

```bash
# Скопіюйте .env файл
cp .env.example .env

# Запустіть всі сервіси
docker-compose up -d --build
docker exec payroll_backend python init_db.py
# API буде доступний на http://localhost:8000/api/v1
# Frontend буде доступний на http://localhost:3000
```

### Локально

#### Backend

```bash
cd backend

# Створіть віртуальне середовище
python -m venv venv
source venv/bin/activate

# Встановіть залежності
pip install -r requirements.txt

# Запустіть
uvicorn main:app --reload
```

#### Frontend

```bash
cd frontend

# Встановіть залежності
npm install

# Запустіть dev сервер
npm run dev
```

## 📚 Документація

### API
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- [API Docs](./docs/API.md)

### Розробка
- [Developer Guide](./docs/DEVELOPMENT.md)

### Папки
- `/backend` - FastAPI код
- `/frontend` - React код
- `/docs` - Документація проекту

## 🗂️ Структура проекту

```
payroll_system/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── core/              # Конфігурація, безпека
│   │   ├── db/                # БД, сесії
│   │   ├── models/            # SQLAlchemy моделі
│   │   ├── schemas/           # Pydantic схеми
│   │   ├── routes/            # API маршрути
│   │   └── services/          # Бізнес-логіка
│   ├── main.py               # Точка входу
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React компоненти
│   │   ├── pages/            # Сторінки
│   │   ├── services/         # API сервіси
│   │   ├── hooks/            # Custom хуки
│   │   ├── store/            # Zustand стори
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docs/                       # Документація
│   ├── API.md
│   └── DEVELOPMENT.md
│
└── docker-compose.yml
```

## 🔑 Ключові команди

```bash
# Docker
docker-compose up              # Запуск всіх сервісів
docker-compose down            # Зупинення
docker-compose logs backend    # Логи backend
docker-compose logs frontend   # Логи frontend

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
pytest                         # Тести

# Frontend
cd frontend
npm install
npm run dev
npm run build
npm run lint
```

## 💾 Структура Бази Даних

### Users
- id (PK)
- email (UNIQUE)
- full_name
- hashed_password
- is_active
- created_at
- updated_at

### Employees
- id (PK)
- employee_code (UNIQUE)
- full_name
- email (UNIQUE)
- position
- salary
- is_active
- created_at
- updated_at

### Payout Requests
- id (PK)
- employee_id (FK)
- amount
- status (ENUM: pending, approved, rejected, processed)
- reason
- created_at
- updated_at

## 🧪 Тестування

### Backend

```bash
cd backend
pytest                # Запуск всіх тестів
pytest --cov=app     # З покриттям
pytest -v            # Verbose
```

### Frontend

```bash
cd frontend
npm run lint         # ESLint
```

## 🌍 API Endpoints

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

[Докладна документація API](./docs/API.md)

## 📝 Приклади запитів

### cURL

```bash
# Реєстрація
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "full_name": "John Doe",
    "password": "password123"
  }'

# Список співробітників
curl -X GET "http://localhost:8000/employees?skip=0&limit=100" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🛠️ Розробка

### Додавання нового ендпоїнту

Дивіться [Developer Guide](./docs/DEVELOPMENT.md) для детальних інструкцій.

## 🚀 Розгортання

### Docker Build

```bash
# Backend
docker build -t payroll-backend:latest backend/

# Frontend
cd frontend && npm run build
```

## 📄 Ліцензія

MIT

## 👥 Контакти

Для питань та пропозицій відкрийте Issue на GitHub.

---

Створено з ❤️ для сучасної системи управління заробітною платою

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/nearYouluV/payroll_system.git
    ```

2. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Apply Migrations**:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```
4. **Create `.env` File**:
   In your project root, create a `.env` file to store environment variables, such as `DEBUG` and `DJANGO_SECRET_KEY`. Example:

   ```
   DEBUG=True
   DJANGO_SECRET_KEY=your_secret_key_here
   ```
5. **Create a Superuser**:
    ```bash
    python manage.py createsuperuser
    ```

6. **Populate users**:
    ```bash
    python manage.py populate
    ```

7. **Run the Development Server**:
    ```bash
    python manage.py runserver
    ```

---

## Usage

### Admin Panel
The Django admin panel allows you to manage employees. Accessible at `/admin`.

### Login 
I have created a `populate` command to populate users, they have the same password for all - "Password123". You can log in into the site using the username field at the "customuser" sheet.

### Employee Management
- Navigate to the "Employees" section in the site.
- Use filters and search to locate specific employees.
- Add, update, or delete employee records as needed.

### User Registration
You can create a user with a generated unique code using the `employees/` page when logged in as an accountant. Users must register via the custom registration form. Employees need to use their unique employee code to complete registration.

### Payout Requests
- Employees can submit payout requests via the application.
- Accountants can process these requests, ensuring proper balance deductions.

---

## Code Highlights

### `models.py`
Defines the core models:
- **`Employee`**: Represents employee records with fields like `position`, `salary_rate`, and `employee_code`.
- **`PayoutRequest`**: Handles employee payout requests with status tracking.

### `forms.py`
Custom forms for:
- **Payout Request**: Allows employees to request payouts.
- **User Registration**: Validates employee codes and ensures unique user accounts.

### `admin.py`
Custom admin configuration for managing employees:
- List filters and search capabilities.
- Custom actions like batch deletion.

### `management/commands/populate.py`
A custom Django management command that populates the database with fake users. This command creates users with a default password of `Password123`.

To use this command, run:
```bash
python manage.py populate
```

---

## Running with Docker

To run the project using Docker, follow these steps:

1. **Ensure Docker is Installed**:
   If you don't have Docker installed, you can download and install it from [Docker's official website](https://www.docker.com/get-started).


2. **Build and Run the Docker Container**:
    In the project root, run the following command to build the Docker image and start the container:

    ```bash
    docker-compose build
    docker-compose run web python manage.py makemigrations
    docker-compose run web python manage.py migrate
    docker-compose run web python manage.py populate
    docker-compose up 
    ```

    This command does the following:
    - Builds the Docker image from the `Dockerfile`.
    - Runs the `django_app` container.
    - Runs the Django migrations and starts the development server on port `8000`.

3. **Access the Application**:
   After the container is running, you can access the application at `http://localhost:8000`.

4. **Stopping the Docker Container**:
   To stop the container, use:

   ```bash
   docker-compose down
   ```

---

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For questions or support, reach out to:
- **Email**: v.pelishenko1999@gmail.com
- **GitHub**: [nearYouluV](https://github.com/nearYouluV)
- **LinkedIn**: [Vitaliy Pelishenko](https://www.linkedin.com/in/vitaliy-pelishenko-563431246/)