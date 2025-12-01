"""Employee schemas"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class EmployeeBase(BaseModel):
    """Base employee schema"""

    employee_code: str
    full_name: str
    email: EmailStr
    position: str
    salary: float = Field(gt=0)


class EmployeeCreate(EmployeeBase):
    """Create employee schema"""

    pass


class EmployeeUpdate(BaseModel):
    """Update employee schema"""

    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    position: Optional[str] = None
    salary: Optional[float] = Field(None, gt=0)
    is_active: Optional[bool] = None


class EmployeeResponse(EmployeeBase):
    """Employee response schema"""

    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
