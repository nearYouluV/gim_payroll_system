# API Документація

## Базовий URL

```
http://localhost:8000/api/v1
```

## Авторизація

Всі запити (крім `/auth/login` та `/auth/register`) вимагають JWT токену в заголовку:

```
Authorization: Bearer {token}
```

## Auth API

### Реєстрація

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "full_name": "John Doe",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "created_at": "2024-01-01T12:00:00",
  "updated_at": "2024-01-01T12:00:00"
}
```

### Вхід

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (200):**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

## Employees API

### Список співробітників

```http
GET /employees?skip=0&limit=100
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "employee_code": "EMP001",
    "full_name": "Ivan Kozlov",
    "email": "ivan@example.com",
    "position": "Senior Developer",
    "salary": "5000.00",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00",
    "updated_at": "2024-01-01T10:00:00"
  }
]
```

### Отримати конкретного співробітника

```http
GET /employees/{id}
Authorization: Bearer {token}
```

### Створити співробітника

```http
POST /employees
Authorization: Bearer {token}
Content-Type: application/json

{
  "employee_code": "EMP002",
  "full_name": "Maria Shevchenko",
  "email": "maria@example.com",
  "position": "Project Manager",
  "salary": 4500.00
}
```

**Response (201):**
```json
{
  "id": 2,
  "employee_code": "EMP002",
  "full_name": "Maria Shevchenko",
  "email": "maria@example.com",
  "position": "Project Manager",
  "salary": "4500.00",
  "is_active": true,
  "created_at": "2024-01-02T14:30:00",
  "updated_at": "2024-01-02T14:30:00"
}
```

### Оновити співробітника

```http
PUT /employees/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "position": "Lead Developer",
  "salary": 5500.00
}
```

### Видалити співробітника

```http
DELETE /employees/{id}
Authorization: Bearer {token}
```

**Response (204): No Content**

## Коди помилок

| Код | Опис |
|-----|------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## Приклади запитів

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

# Вхід
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Список співробітників
curl -X GET "http://localhost:8000/employees?skip=0&limit=100" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Python

```python
import requests

BASE_URL = "http://localhost:8000"

# Реєстрація
response = requests.post(f"{BASE_URL}/auth/register", json={
    "email": "user@example.com",
    "full_name": "John Doe",
    "password": "password123"
})

# Вхід
response = requests.post(f"{BASE_URL}/auth/login", json={
    "email": "user@example.com",
    "password": "password123"
})
token = response.json()["access_token"]

# Запит з авторизацією
headers = {"Authorization": f"Bearer {token}"}
response = requests.get(f"{BASE_URL}/employees", headers=headers)
print(response.json())
```
