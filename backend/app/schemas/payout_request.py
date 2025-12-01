"""Payout request schemas"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.payout_request import PayoutStatus


class PayoutRequestBase(BaseModel):
    """Base payout request schema"""

    employee_id: int
    amount: float = Field(gt=0)
    reason: Optional[str] = None


class PayoutRequestCreate(PayoutRequestBase):
    """Create payout request schema"""

    pass


class PayoutRequestUpdate(BaseModel):
    """Update payout request schema"""

    status: Optional[PayoutStatus] = None
    reason: Optional[str] = None


class PayoutRequestResponse(PayoutRequestBase):
    """Payout request response schema"""

    id: int
    status: PayoutStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
