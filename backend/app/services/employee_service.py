"""Employee service"""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeUpdate


class EmployeeService:
    """Employee business logic service"""

    @staticmethod
    async def create_employee(db: AsyncSession, employee: EmployeeCreate) -> Employee:
        """Create new employee"""
        db_employee = Employee(
            employee_code=employee.employee_code,
            full_name=employee.full_name,
            email=employee.email,
            position=employee.position,
            salary=employee.salary,
        )
        db.add(db_employee)
        await db.commit()
        await db.refresh(db_employee)
        return db_employee

    @staticmethod
    async def get_employee(db: AsyncSession, employee_id: int) -> Employee | None:
        """Get employee by ID"""
        return await db.get(Employee, employee_id)

    @staticmethod
    async def get_all_employees(db: AsyncSession, skip: int = 0, limit: int = 100):
        """Get all employees"""
        result = await db.execute(select(Employee).offset(skip).limit(limit))
        return result.scalars().all()

    @staticmethod
    async def update_employee(
        db: AsyncSession, employee_id: int, employee: EmployeeUpdate
    ) -> Employee | None:
        """Update employee"""
        db_employee = await db.get(Employee, employee_id)
        if not db_employee:
            return None

        update_data = employee.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_employee, key, value)

        db.add(db_employee)
        await db.commit()
        await db.refresh(db_employee)
        return db_employee

    @staticmethod
    async def delete_employee(db: AsyncSession, employee_id: int) -> bool:
        """Delete employee"""
        db_employee = await db.get(Employee, employee_id)
        if not db_employee:
            return False

        await db.delete(db_employee)
        await db.commit()
        return True
