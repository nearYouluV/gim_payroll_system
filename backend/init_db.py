"""Sample data initialization script for development"""

import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.models.employee import Employee
from app.db.session import AsyncSessionLocal, engine
from app.db.base import Base
from app.core.security import get_password_hash


async def init_db():
    """Initialize database with sample data"""
    
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Create sample data
    async with AsyncSessionLocal() as db:
        # Check if data exists
        result = await db.execute(select(User))
        if result.scalars().first():
            print("Database already initialized")
            return
        
        # Create sample user
        admin_user = User(
            email="admin@example.com",
            full_name="Admin User",
            hashed_password=get_password_hash("admin123"),
            is_active=True,
        )
        db.add(admin_user)
        await db.flush()
        
        # Create sample employees
        employees = [
            Employee(
                employee_code="EMP001",
                full_name="Ivan Kozlov",
                email="ivan@example.com",
                position="Senior Developer",
                salary=5000.00,
                is_active=True,
            ),
            Employee(
                employee_code="EMP002",
                full_name="Maria Shevchenko",
                email="maria@example.com",
                position="Project Manager",
                salary=4500.00,
                is_active=True,
            ),
            Employee(
                employee_code="EMP003",
                full_name="Oleg Petrenko",
                email="oleg@example.com",
                position="Frontend Developer",
                salary=4200.00,
                is_active=True,
            ),
        ]
        
        for employee in employees:
            db.add(employee)
        
        await db.commit()
        print("Database initialized with sample data")


if __name__ == "__main__":
    asyncio.run(init_db())
