"""Payout request model"""

from datetime import datetime
from enum import Enum as PyEnum

from sqlalchemy import DateTime, Enum, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class PayoutStatus(PyEnum):
    """Payout request status"""

    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    PROCESSED = "processed"


class PayoutRequest(Base):
    """Payout request model"""

    __tablename__ = "payout_requests"

    id: Mapped[int] = mapped_column(primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey("employees.id"))
    employee: Mapped["Employee"] = relationship("Employee", lazy="joined")
    amount: Mapped[float] = mapped_column(Numeric(10, 2))
    status: Mapped[PayoutStatus] = mapped_column(
        Enum(PayoutStatus), default=PayoutStatus.PENDING
    )
    reason: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    def __repr__(self) -> str:
        return f"<PayoutRequest {self.id}>"

    @property
    def employee_name(self) -> str | None:
        # Convenience accessor for serialization
        return self.employee.full_name if getattr(self, "employee", None) else None
